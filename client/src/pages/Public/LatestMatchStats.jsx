// src/pages/Public/LatestMatchStats.jsx

import React, { useEffect, useState } from "react";
import { getLatestMatchStats } from "../../api/matchApi";

import { Trophy, Dribbble, Calendar, Loader2 } from "lucide-react";

// --- Match Stats Display Component ---
const LatestMatchStats = () => {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await getLatestMatchStats();
        setMatch(res.data);
      } catch (err) {
        console.error("Failed to load latest match stats", err);
        setMatch(null); // Explicitly set null on error/404
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-10 text-orange-400">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
        Finding the latest match stats...
      </div>
    );
  }

  // Fallback if no completed matches are found
  if (!match) {
    return (
      <div className="text-center p-10 bg-gray-800 rounded-xl border border-gray-700 max-w-lg mx-auto">
        <h2 className="text-xl text-yellow-400 font-semibold mb-2">
          No Completed Matches Yet
        </h2>
        <p className="text-gray-400">
          Check back after the administrator has recorded the score for the
          first match!
        </p>
      </div>
    );
  }

  const homeTeamName = match.homeTeam?.name || "Home Team";
  const awayTeamName = match.awayTeam?.name || "Away Team";
  const matchDate = new Date(match.date).toLocaleDateString("en-US", {
    // <-- FIX: Changed from match.matchDate to match.date
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Process scorers to group by player name and count
  const scorersMap = match.scorers.reduce((acc, scorer) => {
    const playerName = scorer.player?.name || "Unknown Player";
    const teamName = scorer.player?.team?.name || "Unknown Team";

    if (!acc[playerName]) {
      acc[playerName] = { count: 0, team: teamName };
    }
    acc[playerName].count += 1; // Assuming each object in scorers array is one goal
    return acc;
  }, {});
  const sortedScorers = Object.entries(scorersMap).sort(
    ([, a], [, b]) => b.count - a.count
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 font-sans max-w-4xl mx-auto">
      {/* Main Header */}
      <h1 className="text-3xl sm:text-5xl text-center font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 tracking-tight">
        Latest Match Stats
      </h1>

      {/* Match Scoreline */}
      <div className="text-center mb-10 bg-gray-800/70 p-6 rounded-xl border border-gray-700 shadow-lg">
        <p className="text-2xl font-bold text-white">
          {homeTeamName}{" "}
          <span className="text-yellow-400 text-4xl mx-4">
            {match.homeScore}
          </span>
          VS
          <span className="text-yellow-400 text-4xl mx-4">
            {match.awayScore}
          </span>{" "}
          {awayTeamName}
        </p>
        <div className="flex items-center justify-center gap-2 text-gray-400 mt-2">
          <Calendar className="w-4 h-4" /> <span>{matchDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. Man of the Match Card */}
        <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700 shadow-xl shadow-yellow-500/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h2 className="text-2xl font-bold text-yellow-400">
              Man of the Match
            </h2>
          </div>

                    {match.manOfTheMatch ? ( 
                <div className="text-center">
                    <p className="text-4xl font-extrabold text-white my-3">
                        {match.manOfTheMatch.name} 
                    </p>
                    <p className="text-lg text-gray-400">
                        ({match.manOfTheMatch.team?.name || "Club"}) 
                    </p>
                </div>
            ) : (
                <p className="text-center text-gray-500 italic">
                    No MOTM recorded.
                </p>
            )}
        </div>

        {/* 2. Goal Scorers List */}
        <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700 shadow-xl shadow-orange-500/20">
          <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-2">
            <Dribbble className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold text-orange-400">Goal Scorers</h2>
          </div>

          {sortedScorers.length > 0 ? (
            <ul className="space-y-3">
              {sortedScorers.map(([name, data], index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-white border-b border-gray-700/50 pb-2 last:border-b-0"
                >
                  <div className="flex flex-col text-left">
                    <span className="font-semibold">{name}</span>
                    <span className="text-xs text-gray-400">{data.team}</span>
                  </div>
                  <span className="text-xl font-extrabold text-yellow-300">
                    {data.count} {data.count > 1 ? "Goals" : "Goal"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 italic">
              No goals were scored.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestMatchStats;
