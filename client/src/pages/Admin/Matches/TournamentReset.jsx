// src/components/Admin/TournamentReset.jsx

import React, { useState } from "react";
import { resetAllTournamentData } from "../../../api/matchApi";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";

const TournamentReset = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!isConfirming) {
      // First click: Ask for confirmation
      setMessage(
        "⚠️ Are you absolutely sure? This cannot be undone! Click again to confirm."
      );
      setIsConfirming(true);

      // Auto-cancel confirmation after a few seconds
      setTimeout(() => {
        setIsConfirming(false);
        setMessage("");
      }, 8000);
      return;
    }

    // Second click: Execute reset
    setLoading(true);
    setMessage("");
    setIsConfirming(false);

    try {
      const res = await resetAllTournamentData();

      setMessage(`✅ SUCCESS: ${res.data.message}`);
      // Force a page reload to clear all local state and reflect the reset everywhere
      window.location.reload();
    } catch (error) {
      console.error(
        "Tournament reset failed:",
        error.response?.data || error.message
      );
      setMessage(
        `❌ ERROR: Failed to reset tournament. ${
          error.response?.data?.message || "Server error."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-red-900/40 border border-red-700 rounded-xl shadow-lg">
      <div className="flex items-center gap-4 mb-4 border-b border-red-700/50 pb-3">
        <AlertTriangle className="w-8 h-8 text-red-400" />
        <h2 className="text-2xl font-bold text-red-300">
          Tournament Management Zone
        </h2>
      </div>

      <p className="text-red-200 mb-5 text-sm">
        This action will permanently delete all matches and reset all team and
        player statistics (goals, wins, points, etc.) to zero. This is used to
        start a new season.
      </p>

      <button
        onClick={handleReset}
        disabled={loading}
        className={`w-full px-6 py-3 font-semibold rounded-lg transition duration-200 flex items-center justify-center 
                    ${
                      isConfirming
                        ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900" // Warning color
                        : "bg-red-600 hover:bg-red-700 text-white" // Standard reset color
                    }
                    disabled:opacity-50`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Resetting Data...
          </>
        ) : (
          <>
            <Trash2 className="w-5 h-5 mr-2" />
            {isConfirming
              ? "CLICK TO CONFIRM RESET"
              : "Reset All Tournament Data"}
          </>
        )}
      </button>

      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            message.includes("SUCCESS") ? "text-green-400" : "text-yellow-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default TournamentReset;
