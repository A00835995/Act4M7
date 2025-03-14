import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import './Login.css';

const API_URL = "http://localhost:3000"; // Asegúrate de que la URL es correcta

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });

        console.log("Respuesta del backend:", response.data); 

        if (response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user)); 
            console.log("Login exitoso, redirigiendo...");
            navigate('/home'); 
        } else {
            console.error("Error: No se recibió un usuario válido");
            setError("Error en la autenticación");
        }
    } catch (error) {
        console.error("Error en login:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Error al iniciar sesión");
    }
};


  return (
    <Container maxWidth="sm" className="login-container">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
