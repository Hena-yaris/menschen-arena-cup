import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout:10000,
});

export const getMatches = () => API.get("/matches");

export const updateMatchScore = (id, scoreData) =>
  API.put(`/matches/${id}/score`, scoreData);

export const updateMatchSchedule = (scheduleUpdates)=> {
  return API.put("/matches/schedule",scheduleUpdates)
}

export const getLatestMatchStats = () => API.get("/matches/latest/stats");

export const resetAllTournamentData =()=> API.delete("/matches/reset")
