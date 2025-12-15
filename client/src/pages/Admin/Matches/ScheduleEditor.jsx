// src/components/Admin/ScheduleEditor.jsx

import React, { useEffect, useState } from "react";
import { getMatches,updateMatchSchedule } from "../../../api/matchApi";
import { CalendarCheck, Save, Loader2, Frown } from "lucide-react";

// Helper function to format date for input field
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  // Format to YYYY-MM-DDTHH:MM, required by datetime-local input
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

const ScheduleEditor = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  // State to hold the temporary date changes before saving
  const [scheduleChanges, setScheduleChanges] = useState({});

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const res = await getMatches();

      // Assuming  Match Model populates homeTeam and awayTeam names:
      const fetchedMatches = res.data.matches || res.data;
      setMatches(fetchedMatches);

      // Initialize scheduleChanges state with existing dates or null
      const initialChanges = {};
      fetchedMatches.forEach((match) => {
        initialChanges[match._id] = match.date
          ? formatDateForInput(match.date)
          : "";
      });
      setScheduleChanges(initialChanges);
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      setMessage("Error fetching matches. Check the server console.");
    } finally {
      setLoading(false);
    }
  };

  // Handler for changes in the date input field
  const handleDateChange = (matchId, newDateValue) => {
    setScheduleChanges((prev) => ({
      ...prev,
      [matchId]: newDateValue,
    }));
  };

  const handleSaveSchedule = async () => {
    setIsSaving(true);
    setMessage("");

    // 1. Build the payload required by the backend: [{ matchId, newDate }, ...]
    const updates = matches
      .map((match) => {
        const newDate = scheduleChanges[match._id];

        // Only send matches where the date has been set (non-empty string)
        if (newDate) {
          return {
            matchId: match._id,
            newDate: newDate, // Send the datetime-local string
          };
        }
        return null;
      })
      .filter(Boolean); // Remove null entries

    if (updates.length === 0) {
      setMessage("No valid dates set to save.");
      setIsSaving(false);
      return;
    }

    try {
      const res = await updateMatchSchedule(updates);
      setMessage(
        `✅ Schedule saved! ${res.data.updatedCount} matches were updated.`
      );
      // Re-fetch matches to ensure the component displays the saved data
      setTimeout(fetchMatches, 1000);
    } catch (error) {
      console.error(
        "Schedule save error:",
        error.response?.data || error.message
      );
      setMessage(
        `❌ Error saving schedule: ${
          error.response?.data?.message || "Server error."
        }`
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-10 text-blue-400">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
        Loading Matches...
      </div>
    );
  }

  // Filter matches that haven't been completed yet for scheduling
  const upcomingMatches = matches.filter(
    (match) => match.status !== "finished"
  );

  if (upcomingMatches.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-800 rounded-xl max-w-lg mx-auto">
        <Frown className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
        <h2 className="text-xl text-white font-semibold mb-2">
          All Matches are Finished
        </h2>
        <p className="text-gray-400">
          No upcoming matches to schedule. You may need to generate a new
          tournament.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 border-b border-gray-700 pb-3">
        <CalendarCheck className="w-7 h-7 text-yellow-400" /> Match Schedule
        Editor
      </h1>

      <p className="text-sm text-gray-400 mb-6">
        Set the date and time for each match below. Dates will be saved in
        UTC/GMT.
      </p>

      {/* Save Button & Message */}
      <div className="sticky top-0 bg-gray-900 py-3 z-10 border-b border-t border-gray-700 mb-6">
        <button
          onClick={handleSaveSchedule}
          disabled={isSaving || loading}
          className="w-full sm:w-auto px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50 flex items-center justify-center"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Saving Schedule...
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Save All Changes ({upcomingMatches.length} Matches)
            </>
          )}
        </button>
        {message && (
          <p
            className={`mt-2 text-sm font-medium ${
              message.startsWith("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Match List Table */}
      <div className="space-y-4">
        {upcomingMatches.map((match, index) => (
          <div
            key={match._id}
            className="p-4 bg-gray-800 rounded-md border border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
          >
            {/* Match Name */}
            <div className="flex-1 min-w-0">
              <span className="font-medium text-lg text-white">
                {match.homeTeam?.name || "Home Team"} vs{" "}
                {match.awayTeam?.name || "Away Team"}
              </span>
            </div>

            {/* Date/Time Input */}
            <div className="flex flex-col w-full sm:w-auto">
              <label
                htmlFor={`date-${match._id}`}
                className="text-xs text-gray-400 mb-1"
              >
                Scheduled Date & Time:
              </label>
              <input
                id={`date-${match._id}`}
                type="datetime-local"
                value={scheduleChanges[match._id] || ""}
                onChange={(e) => handleDateChange(match._id, e.target.value)}
                className="p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleEditor;
