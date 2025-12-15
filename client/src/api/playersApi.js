import api from "./axios.js"

export const createPlayer = (data)=> api.post("/players",data);

export const getPlayerLeaderboards = ()=> api.get("/players/leaderboards");
