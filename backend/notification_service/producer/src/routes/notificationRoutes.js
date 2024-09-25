const express = require('express');
const multer = require('multer');
const notificationController = require('../controllers/notificationProducer');

const router = express.Router();

// Configurar multer
const storage = multer.memoryStorage(); // Usar memoria para la carga de archivos
const upload = multer({ storage });

router.post('/send', upload.single('adjunto'), notificationController.sendNotification);

module.exports = router;
