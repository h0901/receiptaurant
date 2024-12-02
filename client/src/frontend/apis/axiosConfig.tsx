import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:8080/api", //"https://receiptaurant-server.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default backendApi;
