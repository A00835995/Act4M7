const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || "seguridad";

const tokenCheck = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "Acceso denegado. Se requiere token." });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }

};

module.exports = tokenCheck;
