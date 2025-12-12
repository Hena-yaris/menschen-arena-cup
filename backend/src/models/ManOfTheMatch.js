import mongoose from "mongoose";

const ManOfTheMatchSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

export default mongoose.model("ManOfTheMatch", ManOfTheMatchSchema);
