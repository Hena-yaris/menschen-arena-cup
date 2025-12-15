

import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Calendar, Zap, Users, Goal, TrendingUp } from "lucide-react"; // Added TrendingUp icon

// --- CHANGE 1: CurrentLeaderboardWidget now shows TOP TEAM ---
const CurrentLeaderboardWidget = () => (
  <div className="p-4 bg-gray-900/60 rounded-xl border border-blue-600/50">
    <h3 className="text-lg font-bold text-yellow-400 mb-2 flex items-center">
      <TrendingUp className="w-5 h-5 mr-2" /> Top Team Standings
    </h3>
    <p className="text-2xl font-extrabold text-white">Team 2^nd united</p>
    <p className="text-sm text-gray-400">12 Points, +8 Goal Difference</p>
  </div>
);
// --- END CHANGE 1 ---

const LatestMatchStatsWidget = () => (
  <div className="p-4 bg-gray-900/60 rounded-xl border border-blue-600/50">
    <h3 className="text-lg font-bold text-yellow-400 mb-2 flex items-center">
      <Trophy className="w-5 h-5 mr-2" /> Latest Result
    </h3>
    <p className="text-2xl font-extrabold text-white">
      Second-year 3 - 2 Fresh-Man
    </p>
    <p className="text-sm text-gray-400">MOTM: Matios</p>
  </div>
);

export default function PublicHome() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-screen bg-black text-white">
            {/* Background Video Placeholder */}     {" "}
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://source.unsplash.com/random/1920x1080/?soccer,stadium')] bg-cover bg-center"></div>
            {/* Blue Spotlight Overlay */}     {" "}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-blue-900/40 to-black/90 z-10"></div>
            {/* HERO */}     {" "}
      <div className="relative flex flex-col items-center justify-center h-screen text-center px-6 z-20">
               {" "}
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-wide drop-shadow-2xl">
                    Menschen Arena Cup 2025/26        {" "}
        </h1>
               {" "}
        <div className="mt-4 w-40 h-1 bg-blue-400 rounded-full shadow-[0_0_20px_#60a5fa]"></div>
               {" "}
        <p className="mt-6 text-xl md:text-2xl font-medium text-gray-100 max-w-3xl drop-shadow-lg">
                    Tracking every score, every player, and every champion live.
                 {" "}
        </p>
               {" "}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
                 {" "}
          <button
            onClick={() => navigate("playersLeader")}
            className="px-10 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-xl text-lg font-bold tracking-wide shadow-2xl shadow-yellow-500/50 transition-all backdrop-blur-sm text-gray-900"
          >
                      View Live Leaderboard        {" "}
          </button>
          <button
            onClick={() => navigate("fixtures")}
            className="px-10 py-3 border border-gray-400 hover:bg-gray-700/50 rounded-xl text-lg font-semibold tracking-wide transition-all backdrop-blur-sm"
          >
                      All Match Schedules        {" "}
          </button>
        </div>
             {" "}
      </div>
            {/* INTRO & WIDGETS SECTION */}     {" "}
      <section className="relative py-20 bg-black/80 z-20 text-center px-6 border-t border-gray-800">
               {" "}
        <h2 className="text-3xl font-bold mb-4 text-blue-300">
          Welcome to the Arena
        </h2>
               {" "}
        <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed mb-10">
                    This isn’t just football — it’s where campus legends spawn.
          Track every score, every result, and every champion right here.      
           {" "}
        </p>
        {/* FEATURE WIDGETS (Showcase live data/features) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <LatestMatchStatsWidget />
          <CurrentLeaderboardWidget />
        </div>
             {" "}
      </section>
            {/* CARDS - Highlighting Application Features */}     {" "}
      <section className="relative py-20 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto z-20">
               {" "}
        {[
          {
            title: "Fixtures & Schedules",
            icon: Calendar,
            desc: "View every match date and time, and instantly see scores and statuses for completed games.",
            navigateTo: "fixtures",
          },
          {
            title: "Player Statistics",
            icon: Goal,
            desc: "Drill down into match details to find the Man of the Match and every goal scorer for individual games.",
            navigateTo: "playersLeader",
          },
          {
            title: "ትንበያ (Prediction)",
            icon: Zap, // --- CHANGE 2: Updated Prediction Card Content ---
            desc: "ይተንበዩ, ነጥብ ያግኙ, አሸናፊው 200 ብር ይወስዳል! Predict the scores, earn points, and win 200 Birr!",
            special: true,
            navigateTo: "matchstatus",
          },

          {
            title: "League Standings",
            icon: Trophy,
            desc: "Track up-to-the-minute points, goal differences, and rankings for every team in the tournament.",
            navigateTo: "standing",
          },
        ].map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.navigateTo)}
            role="button"
            aria-label={`Go to ${card.title}`}
            className={`rounded-xl p-6 backdrop-blur-md transition-all hover:-translate-y-2 cursor-pointer
    ${
              card.special
                ? "bg-gradient-to-br from-yellow-500/30 to-orange-600/20 border border-yellow-400/40 shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:shadow-[0_0_45px_rgba(251,191,36,0.6)]"
                : "bg-gradient-to-br from-blue-900/40 to-black/40 border border-blue-500/20 shadow-[0_0_20px_rgba(96,165,250,0.2)] hover:shadow-[0_0_35px_rgba(96,165,250,0.35)]"
            }`}
          >
            <card.icon
              className={`w-8 h-8 mb-3 ${
                card.special ? "text-yellow-400" : "text-blue-400"
              }`}
            />
                        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                        <p className="text-gray-300 text-sm">{card.desc}</p>   
                 {" "}
          </div>
        ))}
             {" "}
      </section>
      {/* FINAL CTA: Go to the main action */}
      <section className="relative py-16 bg-blue-900/30 border-t border-blue-700/50 z-20 text-center px-6">
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Don't Miss a Second of the Action!
        </h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
          Jump straight to the current rankings or the latest match results.
        </p>
        <button
          onClick={() => navigate("playersLeader")}
          className="px-12 py-4 bg-yellow-500 hover:bg-yellow-600 rounded-full text-xl font-bold tracking-wider text-gray-900 shadow-xl shadow-yellow-500/50 transition-all transform hover:scale-105"
        >
          View Full Standings
        </button>
      </section>
         {" "}
    </div>
  );
}