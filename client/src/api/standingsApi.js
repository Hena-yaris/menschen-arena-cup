import api from "./axios.js";

 const getStandings = ()=> {
    return api.get("/standings");
}

export default getStandings;