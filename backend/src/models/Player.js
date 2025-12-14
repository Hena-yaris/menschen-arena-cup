
import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    // --- Stats fields for easy querying ---
    // These fields are updated by the backend whenever a match score is finalized
    goals: { type: Number, default: 0 },
    motmCount: { type: Number, default: 0 },
    // ... (other stats like assists, appearances)
  },
  { timestamps: true }
);

export default mongoose.model("Player", PlayerSchema);
