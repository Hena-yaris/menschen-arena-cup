

import React, { useEffect, useState } from "react";
import api from "../../../api/axios.js"; 
import TeamCard from "../../../components/TeamCard.jsx"; 
import { Users, PlusCircle, RefreshCw, Zap } from "lucide-react";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const MIN_TEAMS = 4; // Required for round-robin

  // --- API Functions ---
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/teams");
      setTeams(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setCreating(true);
      await api.post("/api/teams", { name: name.trim() });
      setName("");
      await fetchTeams();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create team");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this team? This cannot be undone.")) return;
    try {
      await api.delete(`/api/teams/${id}`);
      setTeams((prev) => prev.filter((t) => t._id !== id));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to delete team");
    }
  };

  const handleGenerateMatches = async () => {
    if (teams.length < MIN_TEAMS) {
      setError(
        `Tournament requires at least ${MIN_TEAMS} teams to generate a schedule.`
      );
      return;
    }
    if (!confirm("Are you sure you want to generate the Round Robin matches?"))
      return;

    try {
       await api.post("/api/matches/generate");
      alert(
        "Matches generated successfully (round-robin style)! Check the Match Control tab."
      );
      setError("");
    } catch (err) {
      setError("Failed to generate matches. Please check the API endpoint.");
      console.error(err);
    }
  };
  // --- END API Functions ---

  return (
    <div className="text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-orange-500/50 pb-4 mb-8">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <Users className="w-7 h-7 text-orange-400" /> Manage Teams & Setup
        </h1>
        <button
          onClick={fetchTeams}
          disabled={loading}
          className="p-2 bg-gray-700 rounded-full text-orange-400 hover:bg-gray-600 transition disabled:opacity-50"
          title="Refresh Teams"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Add Team Form */}
      <form
        onSubmit={handleCreate}
        className="mb-8 flex flex-col sm:flex-row gap-3 p-4 bg-gray-800 rounded-xl shadow-lg"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new team name (e.g., Menschen F)"
          className="p-3 rounded-lg bg-gray-900 text-white flex-1 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          disabled={creating || !name.trim()}
        >
          <PlusCircle className="w-5 h-5" />
          {creating ? "Adding..." : "Add Team"}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-400 mb-4">
          {error}
        </div>
      )}

      {/* Auto-Generate Matches Button (Step 2) */}
      <div className="my-8 py-6 border-y border-gray-700 text-center">
        <h2 className="text-xl font-bold text-orange-300 mb-4">
          Tournament Setup
        </h2>
        <button
          onClick={handleGenerateMatches}
          className={`
                px-8 py-3 text-lg font-bold rounded-full transition duration-300 
                ${
                  teams.length === MIN_TEAMS
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:from-yellow-300 hover:to-orange-600 shadow-lg shadow-orange-500/30"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }
            `}
          disabled={teams.length < MIN_TEAMS || teams.length>MIN_TEAMS}
        >
          <Zap className="inline w-5 h-5 mr-2" />
          Generate Round Robin Matches ({teams.length} / {MIN_TEAMS} minimum)
        </button>
      </div>

      {/* Team List */}
      <h2 className="text-2xl font-bold text-white mb-4">
        Current Teams ({teams.length})
      </h2>

      {loading ? (
        <div className="text-gray-400 p-4">Loading teams…</div>
      ) : teams.length === 0 ? (
        <div className="text-gray-500 p-4 bg-gray-800 rounded-lg">
          No teams registered. Add teams above to start the tournament setup!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teams.map((team) => (
            <TeamCard key={team._id} team={team} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
