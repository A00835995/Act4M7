import React, { useState } from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Users.css';

const usersData = [
  { id: 1, username: 'user1', password: '******' },
  { id: 2, username: 'user2', password: '******' },
  { id: 3, username: 'user3', password: '******' },
];

function Users() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = (userId) => {
    // Aquí se manejará la lógica para borrar el usuario
    console.log(`Usuario con ID ${userId} borrado`);
    handleClose();
  };

  return (
    <Container maxWidth="lg" className="users-container">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Usuarios
        </Typography>
        <Paper className="users-paper">
          <List>
            {usersData.map((user) => (
              <ListItem key={user.id} button onClick={() => handleClickOpen(user)}>
                <ListItemText primary={user.username} secondary={user.password} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aquí puedes editar la información del usuario.
          </DialogContentText>
          <Typography variant="body1">Nombre de usuario: {selectedUser?.username}</Typography>
          <Typography variant="body1">Contraseña: {selectedUser?.password}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleDelete(selectedUser?.id)} color="secondary">
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Users;