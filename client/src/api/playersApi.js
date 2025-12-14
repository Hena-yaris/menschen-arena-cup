import api from "./axios.js"

export const createPlayer = (data)=> api.post("/players",data);
