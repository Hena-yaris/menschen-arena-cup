import mongoose from "mongoose";

const GoalScorerSchema = new mongoose.Schema(
  {
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },

    playerName: { type: String, required: true },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    goals: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("GoalScorer", GoalScorerSchema);
