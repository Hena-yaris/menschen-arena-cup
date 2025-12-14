import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import adminRoutes from "./src/routes/adminRoutes.js"
import teamRoutes from "./src/routes/teamRoutes.js"
import matchRoutes from "./src/routes/matchRoutes.js"
import motmRoutes from "./src/routes/motmRoutes.js"
import scorerRoutes from "./src/routes/scorerRoutes.js"
import standingsRoutes from "./src/routes/standingsRoutes.js";
import playerRoutes from "./src/routes/playerRoutes.js";



//
dotenv.config();


const app = express();


//Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/scorers", scorerRoutes);
app.use("/api/motm", motmRoutes);
app.use("/api/standings", standingsRoutes);
app.use("/api/players", playerRoutes);


// Base route
app.get("/", (req, res) => {
  res.send("Menschen Arena Cup API is running...");
});

// MongoDB Connect + Server Start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🔥 MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log("❌ MongoDB error:", err));

export default app;
