import express from "express";
import {
  generateMatches,
  getAllMatches,
  updateMatchScore,
  setManOfTheMatch,
  resetTournament,
} from "../controllers/matchController.js";

const router = express.Router();

// Generate double round-robin matches
router.post("/generate", generateMatches);
router.get("/",getAllMatches);

//Reset
router.delete("/reset", resetTournament)
// Update score
router.put("/:id/score", updateMatchScore);

// Set Man of the Match
router.put("/:id/motm", setManOfTheMatch);


export default router;