// import api from "./axios";

// export const loginUser = async (data) => {
//     const response = await api.post("/api/v1/auth/login", data);
//     return response.data;
// };


// export const registerUser = async (data) => {
//     const response = await api.post("/api/v1/auth/register", data);
//     return response.data;
// };

// export const getProfile = async () => {
//     const response = await api.get("/api/v1/profile");
//     return response.data;
// };


import axios from "axios";

// 1. Create an Axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

// 2. Add a Request Interceptor 🛡️
// This automatically injects the JWT token into every outgoing request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Add a Response Interceptor 🚨
// If the token expires (401 error), we can handle global logouts here
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            // Optional: window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

/* ---------- API Endpoints ---------- */

export const loginUser = async (data) => {
    const response = await api.post("/api/v1/auth/login", data);
    return response.data;
};

export const registerUser = async (data) => {
    const response = await api.post("/api/v1/auth/register", data);
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get("/api/v1/profile");
    return response.data;
};

export default api;