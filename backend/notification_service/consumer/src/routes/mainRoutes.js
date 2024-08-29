const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

router.get('/', mainController.hello);
router.get('/health', mainController.health);

module.exports = router;
