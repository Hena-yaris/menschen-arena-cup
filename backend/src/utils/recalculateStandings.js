import Team from "../models/Team.js";
import Match from "../models/Match.js";

const recalculateStandings = async () => {
  // 1️⃣ Reset teams
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

  // 2️⃣ Get finished matches
  const matches = await Match.find({ status: "finished" });

  

  // 3️⃣ Recalculate standings
  for (const match of matches) {
    const home = await Team.findById(match.homeTeam);
    const away = await Team.findById(match.awayTeam);

    if (!home || !away) continue;

    home.played += 1;
    away.played += 1;

    home.goalsFor += match.homeScore;
    home.goalsAgainst += match.awayScore;
    away.goalsFor += match.awayScore;
    away.goalsAgainst += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.wins += 1;
      home.points += 3;
      away.losses += 1;
    } else if (match.homeScore < match.awayScore) {
      away.wins += 1;
      away.points += 3;
      home.losses += 1;
    } else {
      home.draws += 1;
      away.draws += 1;
      home.points += 1;
      away.points += 1;
    }

    home.goalDifference = home.goalsFor - home.goalsAgainst;
    away.goalDifference = away.goalsFor - away.goalsAgainst;

    await home.save();
    await away.save();
  }

};

export default recalculateStandings;
