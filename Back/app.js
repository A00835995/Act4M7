const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectToHANA } = require('./confDB');

const userRoutes = require('./Rutas/userRutas');
const loginRoutes = require('./Rutas/loginRutas');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev'));
app.use(express.json());

// Rutas de la API
app.use('/users', userRoutes);
app.use('/login', loginRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectToHANA();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`swagger http://localhost:${PORT}/api-docs`);
});