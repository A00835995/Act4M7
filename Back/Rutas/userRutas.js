const express = require('express');
const router = express.Router();
const usersCont = require('../Controladores/users');

router.post("/",usersCont.createUser);
router.get("/",usersCont.getAllUsers);
router.get("/:id", usersCont.getUserById);  
router.put('/:id', usersCont.updateUser);
router.delete('/:id', usersCont.deleteUser);

module.exports = router;
