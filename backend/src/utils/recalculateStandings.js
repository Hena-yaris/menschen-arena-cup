import Team from "../models/Team.js";
import Match from "../models/Match.js";

export const recalculateStandings = async () => {
  // 1. Reset all teams
  await Team.updateMany(
    {},
    {
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    }
  );

  // 2. Get all played matches
  const matches = await Match.find({
    homeScore: { $ne: null },
    awayScore: { $ne: null },
  });

  // 3. Process each match
  for (const match of matches) {
    const home = await Team.findById(match.homeTeam);
    const away = await Team.findById(match.awayTeam);

    if (!home || !away) continue;

    // played
    home.played += 1;
    away.played += 1;

    // goals
    home.goalsFor += match.homeGoals;
    home.goalsAgainst += match.awayGoals;

    away.goalsFor += match.awayGoals;
    away.goalsAgainst += match.homeGoals;

    // result
    if (match.homeGoals > match.awayGoals) {
      home.wins += 1;
      away.losses += 1;
      home.points += 3;
    } else if (match.homeGoals < match.awayGoals) {
      away.wins += 1;
      home.losses += 1;
      away.points += 3;
    } else {
      home.draws += 1;
      away.draws += 1;
      home.points += 1;
      away.points += 1;
    }

    // goal diff
    home.goalDifference = home.goalsFor - home.goalsAgainst;
    away.goalDifference = away.goalsFor - away.goalsAgainst;

    await home.save();
    await away.save();
  }
};
