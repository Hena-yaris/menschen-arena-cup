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
  const matches = await Match.find({ status: "finished" })
    .populate("homeTeam")
    .populate("awayTeam");

  // 3️⃣ Recalculate standings
  for (const match of matches) {
    const home = match.homeTeam;
    const away = match.awayTeam;

    const homeScore = match.homeScore;
    const awayScore = match.awayScore;

    // Played
    home.played += 1;
    away.played += 1;

    // Goals
    home.goalsFor += homeScore;
    home.goalsAgainst += awayScore;
    away.goalsFor += awayScore;
    away.goalsAgainst += homeScore;

    // Result
    if (homeScore > awayScore) {
      home.wins += 1;
      home.points += 3;
      away.losses += 1;
    } else if (homeScore === awayScore) {
      home.draws += 1;
      away.draws += 1;
      home.points += 1;
      away.points += 1;
    } else {
      away.wins += 1;
      away.points += 3;
      home.losses += 1;
    }

    // Goal difference
    home.goalDifference = home.goalsFor - home.goalsAgainst;
    away.goalDifference = away.goalsFor - away.goalsAgainst;

    await home.save();
    await away.save();
  }
};

export default recalculateStandings;
