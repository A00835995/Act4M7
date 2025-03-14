import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './Navbar';
import './Contact.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function Contact() {
    const user = JSON.parse(localStorage.getItem("user"));
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Box
        className="contact-container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 64px)',
          marginTop: '64px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box className="contact-card">
          <Typography variant="h4" component="h1" gutterBottom>
          Datos de Usuario
          </Typography>
          {user ? (
                <Box>
                    <Typography><strong>Nombre:</strong> {user.name}</Typography>
                    <Typography><strong>Email:</strong> {user.email}</Typography>
                </Box>
            ) : (
                <Typography color="error">No se encontró información del usuario.</Typography>
            )}
        
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Contact;