import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://receiptaurant-server.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default backendApi;
