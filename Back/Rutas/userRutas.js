const express = require('express');
const router = express.Router();
const usersCont = require('../Controladores/users');
const verifyToken = require('../Controladores/tokenCheck');

router.post("/",usersCont.createUser);
router.get("/", verifyToken, usersCont.getAllUsers);
router.get("/:id", verifyToken, usersCont.getUserById);  
router.put('/:id', verifyToken, usersCont.updateUser);
router.delete('/:id', verifyToken, usersCont.deleteUser);

module.exports = router;
