// routes/standingsRoutes.js
import express from "express";
import { getStandings } from "../controllers/standingsController.js";

const router = express.Router();

router.get("/", getStandings);

export default router;
