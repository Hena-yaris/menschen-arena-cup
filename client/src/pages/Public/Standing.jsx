

import { useEffect, useState } from "react";
import getStandings from "../../api/standingsApi.js";
import { retryRequest } from "../../utils/retryRequest.js";
import { Loader2 } from "lucide-react";
const Standings = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await retryRequest(
          () => getStandings(),
          1 // retry once
        );
        setTeams(res.data);
      } catch (err) {
        setError("Server is busy. Please try again shortly.");

      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-10 text-orange-400">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
        Loading standings...
      </div>
    );
  }


  if (error) {
    return (
      <div className="text-center p-10 bg-gray-800 rounded-xl border border-gray-700 max-w-lg mx-auto">
        <p className="text-red-400 font-semibold mb-2">⚠️ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-orange-500 rounded hover:bg-orange-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-25 bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 mt-10">
      <div className="rounded-xl border border-gray-700 bg-gray-800/70 shadow-2xl shadow-orange-900/40 overflow-hidden">
        {/* Column Headers */}
        <div className="grid grid-cols-8 md:grid-cols-10 gap-2 text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 bg-gray-900 py-3 px-4">
          <span className="col-span-2 text-left">Club</span>
          <span>P</span>
          <span>W</span>
          <span>D</span>
          <span>L</span>
          <span className="hidden md:block">GF</span>
          <span className="hidden md:block">GA</span>
          <span>GD</span>
          <span className="text-amber-400">PTS</span>
        </div>

        {/* Rows */}
        {teams
          .sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goalDifference !== a.goalDifference)
              return b.goalDifference - a.goalDifference;
            return b.goalsFor - a.goalsFor;
          })
          .map((team, index) => {
            const isFirst = index === 0;
            const isSecond = index === 1;

            const gd =
              team.goalDifference > 0
                ? `+${team.goalDifference}`
                : team.goalDifference;

            return (
              <div
                key={team._id}
                className={`
                  grid grid-cols-8 md:grid-cols-10 gap-2 items-center text-center py-3 px-4
                  border-b border-gray-800 last:border-0
                  transition-all duration-300
                  ${
                    isFirst &&
                    "bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border-l-4 border-yellow-400 shadow-lg shadow-yellow-500/20 hover:scale-[1.01]"
                  }
                  ${
                    isSecond &&
                    "bg-gradient-to-r from-gray-300/20 to-gray-500/10 border-l-4 border-gray-300 shadow-md shadow-gray-400/20 hover:scale-[1.01]"
                  }
                  ${!isFirst && !isSecond && "hover:bg-gray-700/50"}
                `}
              >
                {/* Team */}
                <div className="flex items-center gap-3 col-span-2 text-left min-w-0">
                  {/* Rank / Medal */}
                  <span className="w-6 text-center font-bold">
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index > 1 && index + 1}
                  </span>

                  {/* Team Badge (perfect circle on mobile) */}
                  <div className="w-8 h-8 aspect-square rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold border-2 border-amber-400/50 flex-shrink-0">
                    {team.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>

                  {/* Team Name */}
                  <span className="font-semibold truncate">{team.name}</span>
                </div>

                {/* Stats */}
                <span>{team.played}</span>
                <span>{team.wins}</span>
                <span>{team.draws}</span>
                <span>{team.losses}</span>
                <span className="hidden md:block">{team.goalsFor}</span>
                <span className="hidden md:block">{team.goalsAgainst}</span>

                <span
                  className={
                    team.goalDifference > 0
                      ? "text-lime-400 font-semibold"
                      : team.goalDifference < 0
                      ? "text-rose-500 font-semibold"
                      : "text-gray-300 font-semibold"
                  }
                >
                  {gd}
                </span>

                <span className="font-extrabold text-lg text-amber-300">
                  {team.points}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Standings;
