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

    date: { type: Date, default: Date.now },

    manOfTheMatch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ManOfTheMatch",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Match", MatchSchema);
