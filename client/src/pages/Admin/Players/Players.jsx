import React from 'react'
import { createPlayer } from '../../../api/playersApi.js'
import api from '../../../api/axios.js';
import { useState } from 'react'
import { useEffect } from 'react';

const Players = () => {
    const [teams, setTeams] = useState([]);
    const [name,setName] =useState("");
    const [teamId, setTeamId] = useState("");
    const[loading, setLoading]= useState(false);

    useEffect(() => {
      const fetchTeams = async () => {
        try {
          const res = await api.get("/teams");
          setTeams(res.data);
        } catch (error) {
          console.error("Failed to fetch teams", error);
          setTeams([]); // safety fallback
        }
      };

      fetchTeams();
    }, []);


    //handle submit
    const handleSubmit = async (e)=> {
        e.preventDefault();
        if(!name || !teamId) return alert("Player name and team are required");

        try {
            setLoading(true);
            await createPlayer({name,team:teamId});
            alert("Create player successfully");
            setName("");
            setTeamId("");

        } catch (error) {
           console.error(error);
           alert("Failed to create player") 
        } finally{
            setLoading(false);
        }
    }
  return (
    <div className="text-white max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Create Player</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl space-y-4"
      >
        {/* Player Name */}
        <input
          type="text"
          placeholder="Player name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-gray-700 focus:border-orange-500"
        />

        {/* Team Select */}
        <select
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
            
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-orange-600 rounded font-bold hover:bg-orange-700"
        >
          {loading ? "Creating..." : "Create Player"}
        </button>
      </form>
    </div>
  );
}

export default Players