// src/controllers/matchController.js (COMPLETE CODE)

import Team from "../models/Team.js";
import Match from "../models/Match.js";
import Player from "../models/Player.js"; 
import recalculateStandings from "../utils/recalculateStandings.js";
import updatePlayerStats from "../utils/updatePlayerStats.js"; // NEW IMPORT

// ------------------------
// 1. Generate matches
// ------------------------
export const generateMatches = async (req, res) => {
  try {
    const matchCount = await Match.countDocuments();
    if (matchCount > 0) {
      return res.status(400).json({
        message: "Matches already exist. Reset tournament first.",
      });
    }

    const teams = await Team.find();

    if (teams.length !== 4) {
      return res.status(400).json({
        message: "You must have exactly 4 teams to generate matches.",
      });
    }

    const matches = []; // Double round robin: each pair plays twice

    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({
          homeTeam: teams[i]._id,
          awayTeam: teams[j]._id,
        });
        matches.push({
          homeTeam: teams[j]._id,
          awayTeam: teams[i]._id,
        });
      }
    }

    const saved = await Match.insertMany(matches);

    res.status(201).json({
      message: "Matches generated successfully.",
      total: saved.length,
      matches: saved,
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating matches", error });
  }
};

// ------------------------
// 2. Get all matches
// ------------------------
export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("homeTeam")
      .populate("awayTeam")
      // NEW: Populate player references for displaying stats
      .populate("manOfTheMatch", "name")
      .populate("scorers.player", "name team");

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matches", error });
  }
};


// ------------------------
// 3. Get Latest Match Stats (for "Match of the Day" public view)
// ------------------------
export const getLatestMatchStats = async (req, res) => {
  try {
    const latestMatch = await Match.findOne({
      // Only select matches where scores have been entered (i.e., completed)
      homeScore: { $ne: null },
      awayScore: { $ne: null },
    }) // Sort by the scheduled date descending, with creation time as a tie-breaker
      .sort({ date: -1, createdAt: -1 })
      .limit(1) // --- ROBUST POPULATION CHAIN (Using Mongoose Nested Population) ---
      .populate([
        // 1. Populate basic Team names
        { path: "homeTeam", select: "name" },
        { path: "awayTeam", select: "name" }, // 2. Populate Man of the Match (Player) and the Player's Team (Nested)
        {
          path: "manOfTheMatch",
          select: "name team",
          populate: {
            path: "team",
            select: "name",
          },
        }, // 3. Populate Scorers (Player) and the Player's Team (Nested)
        {
          path: "scorers.player",
          select: "name team",
          populate: {
            path: "team",
            select: "name",
          },
        },
      ]); // Check if a match was found

    if (!latestMatch) {
      return res.status(404).json({ message: "No completed matches found" });
    } // Send the fully populated match data

    res.status(200).json(latestMatch);
  } catch (error) {
    // Log the exact error to the terminal for diagnosis
    console.error("Mongoose Population/Server Error:", error); // Send a generic 500 response to the client
    res
      .status(500)
      .json({ message: "Server error occurred while fetching match data." });
  }
};




// ------------------------
// 4. Update Match Schedule (Bulk Update)
// ------------------------
export const updateMatchSchedule = async (req, res) => {
    // req.body should be an array of { matchId: string, newDate: string }
    const scheduleUpdates = req.body;

    if (!Array.isArray(scheduleUpdates) || scheduleUpdates.length === 0) {
        return res.status(400).json({ message: "Invalid or empty list of schedule updates." });
    }

    try {
        const updatePromises = scheduleUpdates.map(update => {
            // Validate the required fields
            if (!update.matchId || !update.newDate) {
                console.warn(`Skipping invalid update object: ${JSON.stringify(update)}`);
                return Promise.resolve(null); // Skip invalid entries
            }

            // Update the match date using Mongoose
            return Match.findByIdAndUpdate(
                update.matchId,
                { date: new Date(update.newDate) }, // Convert string to Date object
                { new: true, runValidators: true } // Return the updated doc, run schema validation
            );
        });

        // Run all updates concurrently
        const results = await Promise.all(updatePromises);
        
        // Filter out any null results from invalid entries
        const updatedMatches = results.filter(result => result !== null);

        res.status(200).json({
            message: "Match schedule updated successfully.",
            updatedCount: updatedMatches.length,
            // Optionally, you might return only the IDs and dates instead of full match objects
        });

    } catch (error) {
        console.error("Error updating match schedule:", error);
        res.status(500).json({ message: "Error updating match schedule", error });
    }
};



// ------------------------
// 5. Update match score
// ------------------------
export const updateMatchScore = async (req, res) => {
  try {
    const { homeScore, awayScore } = req.body;

    const match = await Match.findByIdAndUpdate(
      req.params.id,
      {
        homeScore,
        awayScore,
        status: "finished",
      },
      { new: true }
    );

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    } // 🔥 Re-run ALL stat updates after a score change

    await recalculateStandings(); // Updates Team stats
    await updatePlayerStats(); // Updates Player stats (goals/MOTM counts)

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error updating match score", error });
  }
};

// ------------------------
// 4. Save Match Stats (NEW FUNCTION)
// ------------------------
export const saveMatchStats = async (req, res) => {
  const { matchId, manOfTheMatch, scorers } = req.body;

  try {
    // 1. Validate status before saving stats
    const match = await Match.findById(matchId);
    if (!match || match.status !== "finished") {
      return res
        .status(404)
        .json({ message: "Match not found or score not finalized." });
    }

    // 2. Prepare the update data for the Match model
    const updateData = {
      manOfTheMatch: manOfTheMatch || null, // Player ID or null
      scorers: scorers || [], // Array of { player: playerId, goals: X }
    };

    // 3. Update the Match document
    const updatedMatch = await Match.findByIdAndUpdate(
      matchId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedMatch) {
      return res
        .status(404)
        .json({ message: "Match not found during update." });
    }

    // 🔥 Re-run ALL stat updates after saving MOTM/Scorers
    await recalculateStandings();
    await updatePlayerStats();

    res.status(200).json({
      message: "Match stats successfully saved and updated.",
      match: updatedMatch,
    });
  } catch (error) {
    console.error("Error saving match stats:", error);
    res.status(500).json({ message: "Error saving match stats" });
  }
};

// ------------------------
// 5. Reset tournament
// ------------------------
export const resetTournament = async (req, res) => {
  try {
    // 1️⃣ Delete all matches
    await Match.deleteMany({}); // 2️⃣ Reset all team stats

    await Team.updateMany(
      {},
      {
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      }
    );

    // 3️⃣ Reset all Player stats (Crucial for the new model)
    await Player.updateMany(
      {},
      {
        goals: 0,
        motmCount: 0,
      }
    );

    res.status(200).json({
      message: "Tournament reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error resetting tournament",
      error,
    });
  }
};
