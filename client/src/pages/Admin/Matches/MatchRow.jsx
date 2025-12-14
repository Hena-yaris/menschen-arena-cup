
// src/pages/Admin/MatchRow.jsx

import { useState } from "react";
import { Save, CheckCircle, Clock, Loader2, Trophy } from "lucide-react"; 

// Receive the new onRecordStats prop
const MatchRow = ({ match, onSave, onRecordStats }) => { 
    // Local state for the score inputs
    const [homeScore, setHomeScore] = useState(match.homeScore ?? "");
    const [awayScore, setAwayScore] = useState(match.awayScore ?? "");
    const [isSaving, setIsSaving] = useState(false);

    
    const isFinished = match.status === "finished";
    const isScheduled = match.status === "upcoming" || match.status === "pending"; 
    
    // Check if player stats are present (MOTM or Scorers)
    const hasStats = match.manOfTheMatch || (match.scorers && match.scorers.length > 0);


    const handleSave = async (e) => {
        if (e) e.preventDefault(); 
        
        if (homeScore === "" || awayScore === "" || homeScore < 0 || awayScore < 0) {
            alert("Please enter valid scores (non-negative numbers).");
            return;
        }
        
        setIsSaving(true);
        // Call the parent component's save handler
        await onSave(match._id, Number(homeScore), Number(awayScore));
        setIsSaving(false);
    };

    // Use the match score for color logic, not local state (which might be empty)
    const h = Number(match.homeScore); 
    const a = Number(match.awayScore);

    // Color logic for the left border of the row
    let rowColor = "border-gray-700/50"; 
    if (isFinished) {
        if (h > a) {
            rowColor = "border-green-500/50"; 
        } else if (a > h) {
            rowColor = "border-orange-500/50"; 
        } else {
            rowColor = "border-yellow-500/50"; 
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
                        name="homeScore"
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
                        name="awayScore"
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
                
                {/* Save Score Button */}
                {!isFinished && (
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

                {/* Status and Record Stats Button (When finished) */}
                {isFinished && (
                    <div className="flex flex-col gap-2">
                        {/* Status Indicator */}
                        <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center justify-center gap-2 ${hasStats ? 'bg-orange-900/50 text-orange-400 border border-orange-500/50' : 'bg-green-900/50 text-green-400 border border-green-500/50'}`}>
                            <CheckCircle className="w-4 h-4" /> 
                            {hasStats ? 'Stats Recorded' : 'Score Finalized'}
                        </span>
                        
                        {/* Record Stats Button */}
                        <button
                            type="button"
                            onClick={() => onRecordStats(match)} // Calls parent handler to open modal
                            className="w-full px-4 py-2 text-xs font-bold rounded-lg text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition shadow-md shadow-yellow-500/30 flex items-center justify-center gap-1"
                        >
                            <Trophy className="w-4 h-4" /> {hasStats ? 'Edit Stats' : 'Record Stats'}
                        </button>
                    </div>
                )}
                
                {/* Scheduled Status */}
                {isScheduled && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-900/50 text-blue-400 border border-blue-500/50 flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" /> Scheduled
                    </span>
                )}

            </div>
        </form>
    );
};

export default MatchRow;