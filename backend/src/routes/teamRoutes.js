import express from "express";
const router = express.Router();
import {
    createTeam,
    deleteTeam,
    getAllTeams
} from "../controllers/teamController.js"


router.post("/", createTeam);
router.get("/", getAllTeams);
router.delete("/:id", deleteTeam);


export default router;