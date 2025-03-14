const { connection } = require('../confDB');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || "seguridad";

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        const query = `SELECT ID, NAME, EMAIL, PASSWORDHASH FROM User WHERE Email = ?`;

        connection.exec(query, [email], async (err, result) => {
            if (err) {
                console.error("Error en la consulta de usuario:", err.message);
                return res.status(500).json({ message: 'Error al buscar correo', error: err.message });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const user = result[0];

            if (!user.PASSWORDHASH) {
                return res.status(500).json({ message: "Error en la base de datos: PASSWORDHASH no encontrado" });
            }

            const passwordMatch = await bcrypt.compare(password, user.PASSWORDHASH);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign(
                { id: user.ID, name: user.NAME, email: user.EMAIL },
                SECRET_KEY,
                { expiresIn: '1h' } 
            );

            return res.status(200).json({
                message: 'Login exitoso',
                token,
                user: {
                    id: user.ID,
                    name: user.NAME,
                    email: user.EMAIL
                }
            });
        });

    } catch (error) {
        console.error("Error en el login:", error.message);
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};
