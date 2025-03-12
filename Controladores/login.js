const { connection } = require('../confDB');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM User WHERE Email = ?`;

    connection.exec(query, [email], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error al buscar correo', error: err.message });

        if (result.length === 0) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        const user = result[0];

        console.log("Datos del usuario encontrado:", user);

        if (!user.PASSWORDHASH) {
            return res.status(500).send({ message: "Error en la base de datos: PASSWORDHASH no encontrado" });
        }

        const passwordMatch = bcrypt.compareSync(password, user.PASSWORDHASH);

        if (!passwordMatch) {
            return res.status(401).send({ message: 'Contraseña incorrecta' });
        }
        
        const updateQuery = `UPDATE User SET LastLogin = CURRENT_TIMESTAMP WHERE ID = ?`;

        connection.exec(updateQuery, [user.ID], (updateErr) => {
            if (updateErr) return res.status(500).send({ message: 'Error actualizando LastLogin', error: updateErr.message });


            const token = jwt.sign({ id: user.ID, name: user.NAME }, 'secretkey', { expiresIn: '1h' });

            res.status(200).json({ message: 'Login exitoso', token });
        });
        
    });
};
