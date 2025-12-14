import express, { Router } from "express";
import { getStandings } from "../controllers/standingsController";
const router = express.Router();

router.get("/",getStandings)


export default router;