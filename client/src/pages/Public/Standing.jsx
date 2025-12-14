// src/pages/Admin/Standings.jsx
import { useEffect, useState } from "react";
import getStandings from "../../api/standingsApi.js"
import { Trophy, Loader2 } from "lucide-react";

const Standings = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStandings = async () => {
    try {
      setLoading(true);
      const res = await getStandings();
      setTeams(res.data);
    } catch (err) {
      console.error("Failed to load standings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  return (
    <div className="text-white">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-7 h-7 text-yellow-400" />
        <h1 className="text-3xl font-extrabold">Standings</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-800 rounded-xl overflow-hidden">
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <th>#</th>
              <th className="text-left p-3">Team</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th className="text-yellow-400">Pts</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr
                key={team._id}
                className="border-t border-gray-700 text-center hover:bg-gray-700/40"
              >
                <td>{index + 1}</td>
                <td className="text-left p-3 font-semibold">{team.name}</td>
                <td>{team.played}</td>
                <td>{team.wins}</td>
                <td>{team.draws}</td>
                <td>{team.losses}</td>
                <td>{team.goalsFor}</td>
                <td>{team.goalsAgainst}</td>
                <td>{team.goalDifference}</td>
                <td className="font-bold text-yellow-400">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Standings;
