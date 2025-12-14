// src/models/Match.js

import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    homeScore: { type: Number, default: null },
    awayScore: { type: Number, default: null },

    status: {
      type: String,
      enum: ["upcoming", "finished"],
      default: "upcoming",
    },

    // --- NEW FIELDS START HERE ---

    // 1. Man of the Match (Referencing Player ID)
    manOfTheMatch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      default: null,
    },

    // 2. Goal Scorers Array (Embedded data structure)
    scorers: [
      {
        player: {
          // Player who scored
          type: mongoose.Schema.Types.ObjectId,
          ref: "Player",
          required: true,
        },
        goals: {
          // Number of goals they scored in this match
          type: Number,
          required: true,
        },
      },
    ],
    // --- NEW FIELDS END HERE ---

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Match", MatchSchema);
