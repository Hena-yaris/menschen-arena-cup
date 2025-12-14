import express from "express";
import { createPlayer, getPlayersByTeamIds } from "../controllers/playerController.js";
const router = express.Router();


router.post("/",createPlayer);
router.get("/by-teams",getPlayersByTeamIds)

export default router;