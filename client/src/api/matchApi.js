import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
})

export const getMatches = ()=>  API.get("/matches");

export const updateMatchScore = (id,scoreData)=> API.put(`/matches/${id}/score`,scoreData)