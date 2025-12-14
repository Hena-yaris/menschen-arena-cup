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