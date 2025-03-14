import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './Navbar';

const API_URL = "http://localhost:3000";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    }
  },
});

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [editingUser, setEditingUser] = useState(null); // Estado para usuario en edición
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No estás autenticado.");
        return;
      }

      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(response.data);
    } catch (error) {
      console.error("Error obteniendo usuarios:", error.response?.data || error.message);
      setError("Error al obtener usuarios.");
    }
  };

  const createUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No estás autenticado.");
        return;
      }

      await axios.post(`${API_URL}/users`, newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNewUser({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error creando usuario:", error.response?.data || error.message);
      setError("Error al crear usuario.");
    }
  };

  const updateUser = async () => {
    if (!editingUser) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No estás autenticado.");
        return;
      }

      await axios.put(`${API_URL}/users/${editingUser.ID}`, {
        name: editingUser.NAME,
        email: editingUser.EMAIL,
        password: editingUser.PASSWORD || "defaultpassword"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error actualizando usuario:", error.response?.data || error.message);
      setError("Error al actualizar usuario.");
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No estás autenticado.");
        return;
      }

      await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchUsers();
    } catch (error) {
      console.error("Error eliminando usuario:", error.response?.data || error.message);
      setError("Error al eliminar usuario.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Dashboard - Gestión de Usuarios</Typography>

        <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
          <TextField label="Nombre" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <TextField label="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <TextField label="Contraseña" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          <Button variant="contained" color="primary" onClick={createUser}>Agregar</Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.ID}>
                  <TableCell>{user.ID}</TableCell>
                  <TableCell>
                    {editingUser && editingUser.ID === user.ID ? (
                      <TextField 
                        value={editingUser.NAME} 
                        onChange={(e) => setEditingUser({ ...editingUser, NAME: e.target.value })} 
                      />
                    ) : (
                      user.NAME
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser && editingUser.ID === user.ID ? (
                      <TextField 
                        value={editingUser.EMAIL} 
                        onChange={(e) => setEditingUser({ ...editingUser, EMAIL: e.target.value })} 
                      />
                    ) : (
                      user.EMAIL
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser && editingUser.ID === user.ID ? (
                      <Button variant="contained" color="success" onClick={updateUser}>Guardar</Button>
                    ) : (
                      <Button variant="contained" color="warning" onClick={() => setEditingUser({ ...user, PASSWORD: "" })}>Editar</Button>
                    )}
                    <Button variant="contained" color="error" onClick={() => deleteUser(user.ID)}>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
