import Team from "../models/Team.js";


//create a team
export const createTeam = async (req,res)=> {
    try {
        const {name}= req.body;
        const newTeam = new Team({name});
        await newTeam.save();

        res.status(200).json({msg: "Team created successfully",newTeam})

    }catch(err){
        res.status(500).json({msg: "Error creating team",err})
    }
}


//get all teams
export const getAllTeams = async (req,res)=> {

}

//Delete teams
export const deleteTeam = async (req,res)=> {

}