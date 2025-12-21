import api from "./axios";

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
