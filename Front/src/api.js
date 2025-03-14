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

// 🔹 LOGIN (Devuelve el JWT)
export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Error en login:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 OBTENER TODOS LOS USUARIOS (Requiere token)
export const getUsers = async (token) => {
    try {
        const response = await api.get("/users", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 OBTENER USUARIO POR ID (Requiere token)
export const getUserById = async (id, token) => {
    try {
        const response = await api.get(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo usuario:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 CREAR USUARIO (Requiere token)
export const createUser = async (name, email, password, token) => {
    try {
        const response = await api.post("/users", { name, email, password }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error creando usuario:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 ACTUALIZAR USUARIO (Requiere token)
export const updateUser = async (id, name, email, password, token) => {
    try {
        const response = await api.put(`/users/${id}`, { name, email, password }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error actualizando usuario:", error.response?.data || error.message);
        throw error;
    }
};

// 🔹 ELIMINAR USUARIO (Requiere token)
export const deleteUser = async (id, token) => {
    try {
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
