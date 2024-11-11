import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://cs484-final-project.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default backendApi;
