// src/pages/Public/Fixtures.jsx

import React, { useEffect, useState } from "react";
import { getMatches } from "../../api/matchApi";
import { retryRequest } from "../../utils/retryRequest";
import { Calendar, CheckCircle, Clock, Frown } from "lucide-react";

// Helper function to format date for public display (local timezone)
const formatMatchDate = (dateString) => {
  if (!dateString) return "TBD";
  const date = new Date(dateString);

  // Options for a clear, readable display
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // Display the time in the user's local timezone
  return date.toLocaleTimeString(navigator.language, options);
};

const Fixtures = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null); // ✅ reset error
      // ✅ retry once for Render cold start
      const res = await retryRequest(() => getMatches(), 1);

      // Your API might return data directly or nested (e.g., res.data.matches)
      const fetchedMatches = res.data.matches || res.data;

      // Sort matches to show Upcoming matches first, then Finished matches
      const sortedMatches = fetchedMatches.sort((a, b) => {
        // Priority 1: Upcoming vs Finished
        if (a.status === "upcoming" && b.status !== "upcoming") return -1;
        if (a.status !== "upcoming" && b.status === "upcoming") return 1;

        // Priority 2: Sort by date (oldest upcoming match first)
        if (a.date && b.date) {
          return new Date(a.date) - new Date(b.date);
        }
        // Fallback to sort by creation time if dates are missing
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      setMatches(sortedMatches);
    } catch (err) {
      setError("Server is busy. Please try again shortly.");
      setMatches([]); // ✅ avoid stale data
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-10 text-yellow-400">
        <Clock className="w-8 h-8 animate-spin mx-auto mb-3" />
        Loading Match Fixtures...
      </div>
    );
  }

 if (error) {
   return (
     <div className="text-center p-10 bg-gray-800 rounded-xl border border-gray-700 max-w-lg mx-auto">
       <p className="text-red-400 font-semibold mb-3">⚠️ {error}</p>
       <button
         onClick={fetchData} // ✅ retry without reload
         className="px-4 py-2 bg-orange-500 rounded hover:bg-orange-600"
       >
         Retry
       </button>
     </div>
   );
 }

  if (matches.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-800 rounded-xl max-w-lg mx-auto">
        <Frown className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
        <h2 className="text-xl text-white font-semibold mb-2">
          No Matches Scheduled Yet
        </h2>
        <p className="text-gray-400">
          Check back after the administrator has generated and scheduled
          matches.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 font-sans max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
        Tournament Fixtures & Results
      </h1>

      <div className="space-y-6">
        {matches.map((match) => {
          const isFinished = match.status === "finished";
          const homeName = match.homeTeam?.name || "Home Team";
          const awayName = match.awayTeam?.name || "Away Team";
          const scheduledDate = match.date
            ? formatMatchDate(match.date)
            : "TBD";

          return (
            <div
              key={match._id}
              className={`p-5 rounded-xl shadow-lg transition duration-300 ease-in-out 
                                ${
                                  isFinished
                                    ? "bg-gray-800 border-l-4 border-green-500 hover:bg-gray-700"
                                    : "bg-gray-800 border-l-4 border-blue-500 hover:bg-gray-700"
                                }
                            `}
            >
              <div className="flex justify-between items-start">
                {/* Match Info: Teams and Date */}
                <div className="flex-1 min-w-0">
                  <p className="text-xl font-bold text-white mb-1">
                    {homeName} vs {awayName}
                  </p>

                  {/* Date/Time Display */}
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span
                      className={`font-semibold ${
                        scheduledDate === "TBD"
                          ? "text-red-400"
                          : "text-yellow-300"
                      }`}
                    >
                      {scheduledDate}
                    </span>
                  </div>
                </div>

                {/* Status and Score */}
                <div className="text-right">
                  {isFinished ? (
                    <>
                      <span className="text-4xl font-extrabold text-green-400">
                        {match.homeScore} - {match.awayScore}
                      </span>
                      <div className="flex items-center justify-end mt-1 text-sm text-green-400">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span>Finished</span>
                      </div>
                    </>
                  ) : (
                    <span className="px-3 py-1 text-sm rounded-full font-semibold bg-blue-600 text-white">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>

              {/* Optional: Link to Latest Match Stats for Finished matches */}
              {isFinished && (
                <p className="mt-3 text-sm text-yellow-400 hover:text-yellow-300 cursor-pointer">
                  View Match Stats & MOTM →
                </p>
                // You would wrap the text above in a <Link to={`/matches/${match._id}/stats`}>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fixtures;
