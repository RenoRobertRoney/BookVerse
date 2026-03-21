import axios from "axios";

const API = axios.create({
  baseURL: "https://bookverse-920u.onrender.com/api", // backend URL
  withCredentials: true, // important for auth later
});

// 🔐 Attach token automatically (if exists)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
