import express from "express";
import { createPlayer, getPlayerLeaderboards, getPlayersByTeamIds } from "../controllers/playerController.js";
const router = express.Router();


router.post("/",createPlayer);
router.get("/by-teams",getPlayersByTeamIds)
router.get("/leaderboards",getPlayerLeaderboards)

export default router;