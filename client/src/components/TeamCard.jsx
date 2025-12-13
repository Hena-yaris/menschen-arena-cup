import React from "react";
import { Trash2, TrendingUp } from "lucide-react";

export default function TeamCard({ team, onDelete }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700 hover:border-orange-500 transition duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-orange-400">{team.name}</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mt-2">
          <span>
            <TrendingUp className="inline w-4 h-4 mr-1" /> Pts:{" "}
            {team.points ?? 0}
          </span>
          <span>GF: {team.goalsFor ?? 0}</span>
          <span>GA: {team.goalsAgainst ?? 0}</span>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => onDelete(team._id)}
          className="p-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition flex items-center gap-1 text-sm"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
