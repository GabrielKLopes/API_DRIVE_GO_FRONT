import axios from "axios";


axios.defaults.withCredentials = true;
export const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})