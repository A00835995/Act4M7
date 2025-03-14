import React from 'react';
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/"); 
    };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className="app-bar" color="primary">
        <Toolbar>
          <Typography variant="h6" className="title">
            Hana
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" component={Link} to="/dash">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contacto
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;