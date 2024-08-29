const express = require('express');
const authController = require('../controllers/authController');
const auth_router = express.Router();

auth_router.post('/login', authController.login);
auth_router.get('/verify', authController.verify);

module.exports = auth_router;
