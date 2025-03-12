import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Navbar.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#044b85',
    },
  },
});

function Navbar() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className="app-bar" color="primary">
        <Toolbar>
          <Typography variant="h6" className="title">
            Seminuevos de Lujo Monterrey
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" component={Link} to="/home">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contacto
          </Button>
          <Button color="inherit" component={Link} to="/">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;