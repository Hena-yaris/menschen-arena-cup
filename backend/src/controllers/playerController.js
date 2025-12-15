import Player from "../models/Player.js";


export const createPlayer = async (req,res)=> {

    try {
        const {name,team}= req.body;
        const newPlayer = new Player({name,team});
        await newPlayer.save()

        res.status(201).json({message:"new player created successfully",newPlayer})
    } catch (error) {
       res.status(500).json({message: "Error creating new player",error}) 
    }
}



export const getPlayersByTeamIds = async (req, res) => {
  try {
    // Expecting a query parameter like: ?teamIds=id1,id2,id3
    const teamIds = req.query.teamIds;

    if (!teamIds) {
      return res.status(400).json({ message: "Team IDs are required" });
    }

    // Split the comma-separated string into an array of IDs
    const teamIdArray = teamIds.split(",");

    // Find all players whose 'team' field is in the provided array
    const players = await Player.find({
      team: { $in: teamIdArray },
    })
      .select("_id name team") // Select only the necessary fields
      .populate("team", "name"); // Populate the team name for UI

    res.status(200).json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ message: "Error fetching players" });
  }
};


// src/controllers/PlayerController.js (ADD THIS NEW FUNCTION)

// ... (existing imports and functions like createPlayer, getPlayersByTeamIds) ...

// ------------------------
// 3. Get Player Leaderboards (Public View)
// ------------------------
export const getPlayerLeaderboards = async (req, res) => {
    try {
        // Fetch all players
        const players = await Player.find({
            // Only fetch players who have scored or been MOTM (optional, but cleaner)
            $or: [
                { goals: { $gt: 0 } }, 
                { motmCount: { $gt: 0 } }
            ]
        })
        .select('name goals motmCount team') // Only send essential data
        // Populate team name so the frontend can display which club they play for
        .populate('team', 'name') 
        .sort({ 
            goals: -1,        // Primary sort: Most goals first (Highest to Lowest)
            motmCount: -1,    // Secondary sort: Most MOTM first (Tie-breaker)
            name: 1           // Tertiary sort: Alphabetical by name (A-Z)
        });

        res.status(200).json(players);

    } catch (error) {
        console.error("Error fetching player leaderboards:", error);
        res.status(500).json({ message: "Error fetching player leaderboards", error });
    }
};