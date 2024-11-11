import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://receiptaurant.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default backendApi;
