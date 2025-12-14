
// src/pages/Admin/Matches.jsx

import { useEffect, useState } from "react";
import { getMatches, updateMatchScore } from "../../../api/MatchApi.js";
import MatchRow from "./MatchRow.jsx";
import MatchStatEditor from "./MatchStatEditor.jsx"; // <-- NEW IMPORT
import { ClipboardList, Loader2 } from "lucide-react"; 

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    // State to hold the match object for the editor modal
    const [matchToEdit, setMatchToEdit] = useState(null); 

    const fetchMatches = async () => {
        try {
            setLoading(true);
            const res = await getMatches();
            setMatches(res.data);
        } catch (error) {
            console.error("Failed to fetch matches:", error);
            // Optional: set error state
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    const handleSaveScore = async (matchId, homeScore, awayScore) => {
        // Basic validation
        if (
            homeScore === "" ||
            awayScore === "" ||
            homeScore < 0 ||
            awayScore < 0
        ) {
            alert("Please enter valid scores (non-negative numbers).");
            return;
        }

        try {
            await updateMatchScore(matchId, { homeScore, awayScore });
            alert(`Score saved for match ${matchId}! Standings and Player Stats updated.`);
            fetchMatches(); // 🔁 re-sync UI with backend truth
        } catch (error) {
            console.error("Failed to save score:", error);
            alert("Failed to save score.");
        }
    };
    
    // NEW HANDLER: Opens the Stat Editor Modal
    const handleRecordStats = (match) => {
        // Set the match object, which triggers the modal to render
        setMatchToEdit(match);
    };
    
    // NEW HANDLER: Closes the modal AND refreshes data (used after a successful save)
    const handleStatsSaved = () => {
        setMatchToEdit(null); // Close modal
        fetchMatches(); // Refresh match list to show updated MOTM/Scorers
    };


    return (
        <div className="text-white">
            {/* Page Header */}
            <div className="flex items-center gap-3 border-b border-orange-500/50 pb-4 mb-8">
                <ClipboardList className="w-7 h-7 text-orange-400" />
                <h1 className="text-3xl font-extrabold">Match Control (Scoring & Stats)</h1>
            </div>

            {loading ? (
                <div className="text-center p-10 text-orange-400">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
                    <p>Loading the match schedule...</p>
                </div>
            ) : matches.length === 0 ? (
                <div className="text-center p-10 bg-gray-800 rounded-xl border border-gray-700">
                    <p className="text-xl text-yellow-400 font-semibold">
                        No Fixtures Available
                    </p>
                    <p className="text-gray-400 mt-2">
                        Please go to "Manage Teams & Setup" to generate the round-robin schedule.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-300 mb-4">
                        Upcoming & Completed Matches
                    </h2>
                    {matches.map((match) => (
                        <MatchRow 
                            key={match._id} 
                            match={match} 
                            onSave={handleSaveScore} 
                            onRecordStats={handleRecordStats} // <-- PASSING DOWN HANDLER
                        />
                    ))}
                </div>
            )}
            
            {/* CONDITIONAL MODAL RENDERING */}
            {matchToEdit && (
                <MatchStatEditor
                    match={matchToEdit}
                    onClose={() => setMatchToEdit(null)} // Close button handler
                    onStatsSaved={handleStatsSaved}      // Save button handler
                />
            )}
        </div>
    );
};

export default Matches;
