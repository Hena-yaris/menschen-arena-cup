// src/pages/Public/PlayerStats.jsx

import React, { useEffect, useState } from "react";
// Assuming you have this API call based on our previous step
import { getPlayerLeaderboards } from "../../api/playersApi.js";
import { Shirt, Trophy, Loader2 } from "lucide-react";

// --- Reusable Leaderboard Card/Table Component ---
const LeaderboardCard = ({
  title,
  icon: Icon,
  data,
  statKey,
  statLabel,
  rankLimit = 10,
}) => {
  // Filter data to only include players with stats for this board (and limit the list)
  // NOTE: statKey is either 'goals' or 'motmCount'
  const rankedData = data.filter((p) => p[statKey] > 0).slice(0, rankLimit);

  if (rankedData.length === 0) {
    return (
      <div className="rounded-xl border border-gray-700 bg-gray-800/70 p-6 shadow-2xl shadow-orange-900/40 text-center">
        <Icon className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
        <p className="text-xl text-yellow-400 font-semibold">
          No {title} Recorded
        </p>
        <p className="text-gray-400 mt-2">
          Player stats will appear here once finalized by the admin.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800/70 shadow-2xl shadow-orange-900/40 overflow-hidden">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-bold bg-gray-900/90 px-4 py-4 border-b-4 border-amber-500/50 text-amber-400 tracking-tight flex items-center gap-3">
        <Icon className="w-6 h-6 text-yellow-500" /> {title}
      </h2>

      {/* Column Headers (Mobile: 3 columns, Desktop: 3 columns) */}
      <div className="grid grid-cols-4 sm:grid-cols-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 bg-gray-800/90 py-3 px-4">
        <span className="w-4">#</span>
        <span className="text-left col-span-2">Player / Club</span>
        <span className="text-amber-400 font-extrabold">{statLabel}</span>
      </div>

      {/* Player Rows */}
      {rankedData.map((player, index) => {
        const isFirst = index === 0;

        // Use the same leader styling as the Standings component
        const rowClass = isFirst
          ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border-l-4 border-yellow-400 shadow-lg shadow-yellow-500/20 hover:scale-[1.01]"
          : "hover:bg-gray-700/50";

        // Get player initials for the badge
        const playerInitials = player.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase();

        return (
          <div
            key={player._id}
            className={`grid grid-cols-4 sm:grid-cols-4 gap-2 items-center text-center py-3 px-4 border-b border-gray-800 last:border-0 transition-all duration-300 ${rowClass}`}
          >
            {/* 1. Rank & Medal */}
            <span className="w-6 text-center font-bold">
              {index === 0 && "🥇"}
              {index === 1 && "🥈"}
              {index === 2 && "🥉"}
              {index > 2 && index + 1}
            </span>

            {/* 2. Player and Team (col-span-2) */}
            <div className="flex items-center gap-3 col-span-2 text-left min-w-0">
              {/* Player Badge */}
              <div className="w-8 h-8 aspect-square rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold border-2 border-amber-400/50 flex-shrink-0">
                {playerInitials}
              </div>

              <div className="flex flex-col truncate">
                {/* Player Name */}
                <span className="font-semibold text-white truncate text-sm">
                  {player.name}
                </span>
                {/* Team Name (Assuming 'team' is populated and has a 'name' field) */}
                <span className="text-xs text-gray-400 truncate">
                  {player.team?.name || "Unknown Team"}
                </span>
              </div>
            </div>

            {/* 3. Stat Count (Goals or MOTM) */}
            <span
              className={`font-extrabold text-lg ${
                isFirst ? "text-yellow-400" : "text-amber-300"
              }`}
            >
              {player[statKey]}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// --- Main PlayerStats Component ---
const PlayerStats = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboards = async () => {
    try {
      setLoading(true);
      const res = await getPlayerLeaderboards();
      // The API returns all players sorted by Goals DESC then MOTM DESC
      setAllPlayers(res.data);
    } catch (err) {
      console.error("Failed to load player stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  // Since the API returns players sorted by goals, we use a separate sort
  // for MOTM leaders just to be explicit that MOTM is the primary key here.
  const motmLeaders = [...allPlayers].sort((a, b) => {
    if (b.motmCount !== a.motmCount) return b.motmCount - a.motmCount;
    return b.goals - a.goals; // Tie-breaker
  });

  // Top Scorers is already sorted by the API (allPlayers)
  const topScorers = allPlayers;

  if (loading) {
    return (
      <div className="text-center p-10 text-orange-400">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
        Loading Player Leaderboards...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 font-sans">
      {/* Page Header */}
      <h1 className="text-3xl sm:text-5xl text-center font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 tracking-tight drop-shadow-lg border-orange-500/70 border-b-4 py-3 w-fit mx-auto">
        Player Leaderboards
      </h1>

      {/* Leaderboard Cards Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* 1. Top Goal Scorers */}
        <LeaderboardCard
          title="Top Goal Scorers"
          icon={Shirt}
          data={topScorers}
          statKey="goals"
          statLabel="Goals"
          rankLimit={10}
        />

        {/* 2. Man of the Match Leaders */}
        <LeaderboardCard
          title="Man of the Match Leaders"
          icon={Trophy}
          data={motmLeaders}
          statKey="motmCount"
          statLabel="MOTM"
          rankLimit={10}
        />
      </div>
    </div>
  );
};

export default PlayerStats;
