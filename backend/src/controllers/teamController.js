import Team from "../models/Team.js";


//create a team
export const createTeam = async (req,res)=> {
    try {
        const {name}= req.body;
        const newTeam = new Team({name});
        await newTeam.save();

        res.status(201).json({msg: "Team created successfully",newTeam})

    }catch(err){
        res.status(500).json({msg: "Error creating team",err})
    }
}


// Get all teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ name: 1 });
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error });
  }
};

// Delete team
export const deleteTeam = async (req, res) => {
  try {
    const deleted = await Team.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Team not found" });

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting team", error });
  }
};