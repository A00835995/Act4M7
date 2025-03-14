//api.js
import axios from "axios";

const API_URL = "http://localhost:3000"; // URL del backend

// Configuración de Axios
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Error en login:", error.response?.data || error.message);
        throw error;
    }
};

export const getUsers = async (token) => {
    try {
        
        const token = localStorage.getItem("token"); 
        if (!token) throw new Error("Usuario no autenticado");
        
        const response = await api.get("/users", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error.response?.data || error.message);
        throw error;
    }
};

export const getUserById = async (id, token) => {
    try {
        const token = localStorage.getItem("token"); 
        if (!token) throw new Error("Usuario no autenticado");

        const response = await api.get(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo usuario:", error.response?.data || error.message);
        throw error;
    }
};

export const createUser = async (name, email, password, token) => {
    try {
        const token = localStorage.getItem("token"); 
        if (!token) throw new Error("Usuario no autenticado");

        const response = await api.post("/users", { name, email, password }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error creando usuario:", error.response?.data || error.message);
        throw error;
    }
};

export const updateUser = async (id, name, email, password, token) => {
    try {
        const token = localStorage.getItem("token"); 
        if (!token) throw new Error("Usuario no autenticado");

        const response = await api.put(`/users/${id}`, { name, email, password }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error actualizando usuario:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteUser = async (id, token) => {
    try {
        const token = localStorage.getItem("token"); 
        if (!token) throw new Error("Usuario no autenticado");
        const response = await api.delete(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error eliminando usuario:", error.response?.data || error.message);
        throw error;
    }
};

export default api;
