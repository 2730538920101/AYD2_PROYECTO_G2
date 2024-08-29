const express = require('express');
const { checkNotifications } = require('../controllers/notificationConsumer');

const router = express.Router();

router.get('/check', checkNotifications);

module.exports = router;
