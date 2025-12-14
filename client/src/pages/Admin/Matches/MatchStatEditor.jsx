// src/pages/Admin/MatchStatEditor.jsx

import React, { useState, useEffect } from "react";
import { X, Trophy, Shirt, Loader2 } from "lucide-react";
import api from "../../../api/axios";// Import axios for API calls

// --- API Endpoints (Adjust these constants as needed) ---
const MATCH_API_URL = "/matches";
const PLAYER_API_URL = "/players";

/**
 * @param {object} match - The Match object being edited, including populated homeTeam/awayTeam
 * @param {function} onClose - Function to close the modal without refreshing data
 * @param {function} onStatsSaved - Function to close the modal AND refresh data (after successful save)
 */
const MatchStatEditor = ({ match, onClose, onStatsSaved }) => {
  // --- STATE MANAGEMENT ---
  const [players, setPlayers] = useState([]);
  const [motmId, setMotmId] = useState(match.manOfTheMatch?._id || "");
  const [goalScorers, setGoalScorers] = useState(match.scorers || []);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // --- UTILITIES ---
  // Helper function to display player name and team name
  const getPlayerName = (playerId) => {
    const player = players.find((p) => p._id === playerId);
    // We assume the player object fetched has been populated with the team name
    return player ? `${player.name} (${player.team.name})` : "Player Not Found";
  };

  // --- PHASE 1: FETCHING PLAYERS (When component loads) ---
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);

        const homeId = match.homeTeam._id;
        const awayId = match.awayTeam._id;
        const teamIdsString = `${homeId},${awayId}`;

        // Call the backend API: GET /api/players/by-teams?teamIds=...
        const res = await api.get(
          `${PLAYER_API_URL}/by-teams?teamIds=${teamIdsString}`
        );

        setPlayers(res.data);
        
      } catch (error) {
        console.error("Failed to fetch players for match:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [match]);

  // --- PHASE 2: HANDLERS FOR GOAL SCORERS ---

  const handleAddScorer = (e) => {
    const selectedPlayerId = e.target.value;

    // Prevent adding the same player twice
    if (goalScorers.some((s) => s.player === selectedPlayerId)) {
      e.target.value = "";
      return;
    }

    // Add the new scorer to the state with default goals: 1
    setGoalScorers((prevScorers) => [
      ...prevScorers,
      { player: selectedPlayerId, goals: 1 },
    ]);
    e.target.value = "";
  };

  const handleGoalCountChange = (playerId, change) => {
    setGoalScorers((prevScorers) =>
      prevScorers.map((scorer) =>
        scorer.player === playerId
          ? { ...scorer, goals: Math.max(0, scorer.goals + change) }
          : scorer
      )
    );
  };

  const handleRemoveScorer = (playerId) => {
    setGoalScorers((prevScorers) =>
      prevScorers.filter((scorer) => scorer.player !== playerId)
    );
  };

  // --- PHASE 3: FINAL SUBMISSION ---
  const handleSubmit = async () => {
    setIsSaving(true);

    // Check for goal consistency (Optional UX check)
    const totalGoals = goalScorers.reduce((sum, s) => sum + s.goals, 0);
    const matchGoals = match.homeScore + match.awayScore;

    if (totalGoals !== matchGoals) {
      const confirm = window.confirm(
        `Warning: Total recorded goals (${totalGoals}) does not match the match score (${matchGoals}). Do you wish to continue?`
      );
      if (!confirm) {
        setIsSaving(false);
        return;
      }
    }

    // Prepare the payload (Uses Player IDs)
    const payload = {
      matchId: match._id,
      manOfTheMatch: motmId || null,
      scorers: goalScorers.filter((s) => s.goals > 0),
    };

    try {
      // Call the backend API: POST /api/matches/stats
      await api.post(`${MATCH_API_URL}/stats`, payload);

      // Success handler: Close modal and refresh parent data
      onStatsSaved();
    } catch (error) {
      console.error("Failed to save match stats:", error);
      alert("Failed to save match stats. Check server logs.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- RENDERING ---

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 p-10 rounded-xl shadow-2xl text-center text-orange-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
          <p>Loading the player rosters...</p>
        </div>
      </div>
    );
  }

  // Main Modal Content
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-4xl p-6 md:p-8 rounded-xl shadow-2xl border border-orange-500/50 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Record Stats: {match.homeTeam.name} vs {match.awayTeam.name} (Score:{" "}
            {match.homeScore} - {match.awayScore})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* A. MAN OF THE MATCH SELECTOR */}
          <div>
            <h3 className="text-xl font-semibold text-orange-400 mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5" /> Man of the Match
            </h3>
            <select
              value={motmId}
              onChange={(e) => setMotmId(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition"
              disabled={isSaving}
            >
              <option value="">-- Select Player --</option>
              {players.map((p) => (
                <option key={p._id} value={p._id}>
                  {getPlayerName(p._id)}
                </option>
              ))}
            </select>
          </div>

          {/* B. GOAL SCORERS LIST */}
          <div>
            <h3 className="text-xl font-semibold text-orange-400 mb-3 flex items-center gap-2">
              <Shirt className="w-5 h-5" /> Goal Scorers
            </h3>

            {/* 1. Add Scorer Dropdown */}
            <select
              onChange={handleAddScorer}
              value=""
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 mb-4 transition"
              disabled={isSaving}
            >
              <option value="" disabled>
                + Add a Scorer
              </option>
              {/* Filter out players already added to the list */}
              {players
                .filter((p) => !goalScorers.some((s) => s.player === p._id))
                .map((p) => (
                  <option key={p._id} value={p._id}>
                    {getPlayerName(p._id)}
                  </option>
                ))}
            </select>

            {/* 2. Scorer List and Goal Counters */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {goalScorers.length === 0 && (
                <p className="text-gray-500 text-sm">No goals recorded yet.</p>
              )}

              {goalScorers.map((scorer) => (
                <div
                  key={scorer.player}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <span className="font-semibold text-white">
                    {getPlayerName(scorer.player)}
                  </span>

                  {/* Goal Counter Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleGoalCountChange(scorer.player, -1)}
                      className="p-1 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition disabled:opacity-50"
                      disabled={scorer.goals <= 0 || isSaving}
                    >
                      -
                    </button>
                    <span className="text-lg font-extrabold text-orange-400 w-6 text-center">
                      {scorer.goals}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleGoalCountChange(scorer.player, 1)}
                      className="p-1 w-6 h-6 flex items-center justify-center bg-green-600 text-white rounded-full hover:bg-green-700 transition disabled:opacity-50"
                      disabled={isSaving}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveScorer(scorer.player)}
                      className="text-red-400 hover:text-red-500 ml-3"
                      disabled={isSaving}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer and Save Button */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <button
            onClick={handleSubmit}
            disabled={isSaving || loading}
            className="px-10 py-3 text-lg font-bold rounded-full text-gray-900 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-600 transition duration-300 shadow-xl shadow-orange-500/40 disabled:opacity-50 disabled:shadow-none"
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Finalizing Stats...
              </div>
            ) : (
              "Finalize Match Stats"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchStatEditor;
