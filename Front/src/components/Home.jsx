import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './Navbar';
import ImageCarousel from './ImageCarousel';
import './Home.css';

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

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 64px)',
          marginTop: '64px',
          backgroundColor: '#f5f5f5',
          padding: '20px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido a nuestra Agencia de Autos Seminuevos
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ofrecemos una amplia variedad de vehículos de alta calidad a precios competitivos.
        </Typography>
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            margin: '20px 0',
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Catálogo de Nuestros Autos
          </Typography>
          <ImageCarousel />
        </Box>
        <Typography variant="body1">
          Visítanos y encuentra el auto de tus sueños.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default Home;