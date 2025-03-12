const { connection } = require('../confDB');
const bcrypt = require('bcryptjs');

exports.createUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: "Todos los campos son obligatorios: name, email, password" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); 

    const query = `INSERT INTO User (Name, Email, PasswordHash) VALUES (?, ?, ?)`;

    connection.exec(query, [name, email, hashedPassword], (err) => {
        if (err) return res.status(500).send({ message: 'Error creando usuario', error: err.message });
        res.status(201).send({ message: 'Usuario creado exitosamente' });
    });
};

exports.getAllUsers = (req, res) => {
    const query = `SELECT * FROM USER`;

    connection.exec(query, [], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error al obtener usuarios', error: err.message });
        res.status(200).json(result);
    });
};

exports.getUserById = (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM USER WHERE ID = ?`;

    connection.exec(query, [id], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error al obtener usuario', error: err.message });
        if (result.length === 0) return res.status(404).send({ message: 'Usuario no encontrado' });
        res.status(200).json(result[0]);
    });
};

exports.updateUser = (req, res) => {
    const { id } = req.params; 
    const { name, email, password } = req.body; 

    if (!name || !email || !password) {
        return res.status(400).send({ message: "Todos los campos son obligatorios: name, email, password" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); 

    const query = `UPDATE User SET Name = ?, Email = ?, PasswordHash = ? WHERE ID = ?`;

    connection.exec(query, [name, email, hashedPassword, id], (err) => {
        if (err) return res.status(500).send({ message: 'Error actualizando usuario', error: err.message });
        res.status(200).send({ message: 'Usuario actualizado' });
    });
};


exports.deleteUser = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM USER WHERE ID = ?`;

    connection.exec(query, [id], (err) => {
        if (err) return res.status(500).send({ message: 'Error eliminando usuario', error: err.message });
        res.status(200).send({ message: 'Usuario eliminado' });
    });
};
