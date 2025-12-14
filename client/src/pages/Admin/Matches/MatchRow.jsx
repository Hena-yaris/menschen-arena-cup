

import { useState } from "react";
import { Save, CheckCircle, Clock, Loader2 } from "lucide-react"; 

const MatchRow = ({ match, onSave }) => {
  const [homeScore, setHomeScore] = useState(match.homeScore ?? "");
  const [awayScore, setAwayScore] = useState(match.awayScore ?? "");
  const [isSaving, setIsSaving] = useState(false);

  
  const isFinished = match.status === "finished"
//   const isScheduled = match.status === "scheduled" || match.status === "pending"; 

  const handleSave = async (e) => {
    // *** FIX: PREVENT DEFAULT FORM SUBMISSION ***
    if (e) e.preventDefault(); 
    
    // Basic validation is handled in the parent, but we do one last check here
    if (homeScore === "" || awayScore === "" || homeScore < 0 || awayScore < 0) {
        alert("Please enter valid scores (non-negative numbers).");
        return;
    }
    
    setIsSaving(true);
    await onSave(match._id, Number(homeScore), Number(awayScore));
    setIsSaving(false);
  };

  // Color logic for the left border of the row
  let rowColor = "border-gray-700/50"; // Default (Scheduled)
  if (isFinished) {
    if (homeScore > awayScore) {
        rowColor = "border-green-500/50"; // Home win
    } else if (awayScore > homeScore) {
        rowColor = "border-orange-500/50"; // Away win
    } else {
        rowColor = "border-yellow-500/50"; // Draw
    }
  }

  return (
    // Wrap the content in a form and use onSubmit to call handleSave
    <form onSubmit={handleSave} 
      className={`
        bg-gray-800 p-4 rounded-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border-l-4
        ${rowColor} 
      `}
    >
      
      {/* Match Details and Teams */}
      <div className="flex items-center justify-between w-full md:w-auto md:flex-grow text-lg font-bold">
        <span className="text-white text-left flex-1 min-w-[100px] md:text-right">{match.homeTeam.name}</span>
        
        {/* Score Inputs (The Scoreboard) */}
        <div className="flex items-center mx-4 gap-2">
            <input
                type="number"
                name="homeScore" // Add name attribute (good practice for forms)
                value={homeScore}
                disabled={isFinished || isSaving}
                onChange={(e) => setHomeScore(e.target.value)}
                className={`
                    w-12 p-1 text-center rounded-md text-xl font-extrabold 
                    ${isFinished ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-yellow-400 border border-orange-500 focus:ring-2 focus:ring-yellow-400'}
                `}
                min="0"
            />

            <span className="text-gray-400 font-normal text-sm">vs</span>

            <input
                type="number"
                name="awayScore" // Add name attribute
                value={awayScore}
                disabled={isFinished || isSaving}
                onChange={(e) => setAwayScore(e.target.value)}
                className={`
                    w-12 p-1 text-center rounded-md text-xl font-extrabold 
                    ${isFinished ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-yellow-400 border border-orange-500 focus:ring-2 focus:ring-yellow-400'}
                `}
                min="0"
            />
        </div>

        <span className="text-white text-right flex-1 min-w-[100px] md:text-left">{match.awayTeam.name}</span>
      </div>

      {/* Action/Status Button */}
      <div className="w-full md:w-auto md:min-w-[150px] text-center">
        {!isFinished && (
          // Use type="submit" now that the form has an onSubmit handler with e.preventDefault()
          <button
            type="submit" 
            disabled={isSaving}
            className={`
              w-full md:w-auto px-6 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2
              ${isSaving 
                ? 'bg-gray-600 text-gray-300 cursor-wait' 
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:from-yellow-300 hover:to-orange-600 shadow-md shadow-orange-500/30'
              }
            `}
          >
            {isSaving ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
            ) : (
                <>
                    <Save className="w-4 h-4" /> Save Score
                </>
            )}
          </button>
        )}

        {isFinished && (
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-900/50 text-green-400 border border-green-500/50 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" /> Final Score
          </span>
        )}

      </div>
    </form>
  );
};

export default MatchRow;