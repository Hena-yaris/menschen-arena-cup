import Team from "../models/Team.js";
import Match from "../models/Match.js"
import { recalculateStandings } from "../utils/recalculateStandings.js";


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
        message: "You must have exactly 4 teams to generate matches."
      });
    }

    const matches = [];

    // Double round robin: each pair plays twice
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
    const matches = await Match
      .find()
      .populate("homeTeam")
      .populate("awayTeam");
    //   .populate("manOfTheMatch");

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matches", error });
  }
};

// ------------------------
// 3. Update match score
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
    }

    // 🔥 auto-update standings
    await recalculateStandings();

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error updating match score", error });
  }
};


// ------------------------
// 4. Set Man of the Match
// ------------------------
export const setManOfTheMatch = async (req, res) => {
  try {
    const { playerId } = req.body;

    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { manOfTheMatch: playerId },
      { new: true }
    );

    if (!match) return res.status(404).json({ message: "Match not found" });

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: "Error setting MOTM", error });
  }
};


//Reset tournament
export const resetTournament = async (req, res) => {
  try {
    // 1️⃣ Delete all matches
    await Match.deleteMany({});

    // 2️⃣ Reset all team stats
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