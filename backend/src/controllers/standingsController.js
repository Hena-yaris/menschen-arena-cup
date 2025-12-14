// controllers/standingsController.js
import Team from "../models/Team.js";

export const getStandings = async (req, res) => {
  try {
    const standings = await Team.find().sort({
      points: -1,
      goalDifference: -1,
      goalsFor: -1,
      name: 1, // tie-breaker (alphabetical)
    });

    res.status(200).json(standings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching standings",
      error,
    });
  }
};
