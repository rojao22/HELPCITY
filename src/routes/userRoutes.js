const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rotas para /api/users
router.get('/', userController.getUsers);
router.post('/', userController.createUser);

module.exports = router;