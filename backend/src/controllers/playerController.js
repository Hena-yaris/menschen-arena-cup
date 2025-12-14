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