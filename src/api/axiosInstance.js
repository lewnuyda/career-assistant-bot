import axios from "axios";

const token = import.meta.env.VITE_N8N_AUTH_KEY; // Store in .env

const axiosInstance = axios.create({
  baseURL: "https://n8n.lewjason.dpdns.org",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  timeout: 30000, // Increased from 10000
});

export default axiosInstance;
