// src/utils/updatePlayerStats.js

import Player from "../models/Player.js";
import Match from "../models/Match.js";

const updatePlayerStats = async () => {
  // 1️⃣ Reset all Player statistics
  await Player.updateMany(
    {},
    {
      goals: 0,
      motmCount: 0,
      // ... (any other player stats you add later)
    }
  );

  // 2️⃣ Get all finished matches, populating player data
  // We need the 'scorers' array and 'manOfTheMatch' fields.
  const matches = await Match.find({ status: "finished" })
    .populate("scorers.player")
    .populate("manOfTheMatch");

  // A map to store aggregated stats before saving to the DB (more efficient)
  const playerStatsMap = new Map(); // Key: playerId, Value: { goals: N, motmCount: Y }

  // 3️⃣ Aggregate stats from all finished matches
  for (const match of matches) {
    // --- A. Handle Goal Scorers ---
    if (match.scorers && match.scorers.length > 0) {
      for (const scorer of match.scorers) {
        const playerId = scorer.player._id.toString();
        const goals = scorer.goals;

        if (!playerStatsMap.has(playerId)) {
          playerStatsMap.set(playerId, { goals: 0, motmCount: 0 });
        }
        playerStatsMap.get(playerId).goals += goals;
      }
    }

    // --- B. Handle Man of the Match ---
    if (match.manOfTheMatch) {
      const playerId = match.manOfTheMatch._id.toString();

      if (!playerStatsMap.has(playerId)) {
        playerStatsMap.set(playerId, { goals: 0, motmCount: 0 });
      }
      playerStatsMap.get(playerId).motmCount += 1;
    }
  }

  // 4️⃣ Update all Player documents in the database
  const updates = [];
  for (const [playerId, stats] of playerStatsMap.entries()) {
    updates.push(
      Player.updateOne(
        { _id: playerId },
        {
          $set: {
            goals: stats.goals,
            motmCount: stats.motmCount,
          },
        }
      )
    );
  }

  await Promise.all(updates);

  console.log(`Player stats updated for ${playerStatsMap.size} players.`);
};

export default updatePlayerStats;
