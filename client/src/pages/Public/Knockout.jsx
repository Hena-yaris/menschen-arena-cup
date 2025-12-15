// src/pages/Public/KnockoutPlaceholder.jsx

import React from "react";
import { ShieldAlert, Zap } from "lucide-react";

const Knockout = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 font-sans max-w-4xl mx-auto">
      <div className="text-center p-12 bg-gray-800 rounded-xl shadow-2xl border-2 border-yellow-600/50">
        <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse" />

        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Knockout Stage
        </h1>

        <p className="text-xl text-gray-300 mb-6">
          Tournament Action Coming Soon!
        </p>

        <div className="flex items-center justify-center text-lg text-yellow-300 bg-gray-900 p-4 rounded-lg">
          <ShieldAlert className="w-6 h-6 mr-3" />
          <p className="font-medium">
            The single-elimination stage bracket will be updated here once the
            group fixtures are complete.
          </p>
        </div>

        <p className="mt-6 text-gray-400 text-sm">
          Please check back after the final group stage match is played!
        </p>
      </div>
    </div>
  );
};

export default Knockout;
