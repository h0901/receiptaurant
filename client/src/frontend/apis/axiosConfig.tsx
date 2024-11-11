import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://cs484-final-project-server.vercel.app/api", //'http://localhost:8080/api',
  headers: {
    "Content-Type": "application/json",
  },
});

export default backendApi;
