// src/routes/matchRoutes.js (FINALIZED)

import express from "express";
import {
  generateMatches,
  getAllMatches,
  updateMatchScore,
  resetTournament,
  saveMatchStats, // <-- NEW IMPORT
} from "../controllers/matchController.js";

const router = express.Router();

// Generate double round-robin matches
router.post("/generate", generateMatches);

// Get all matches
router.get("/", getAllMatches);

// Reset tournament
router.delete("/reset", resetTournament);

// Update score (PUT request on specific match ID)
router.put("/:id/score", updateMatchScore);

// NEW ROUTE: Save Man of the Match and Goal Scorers (POST request to a dedicated endpoint)
router.post("/stats", saveMatchStats);

export default router;
