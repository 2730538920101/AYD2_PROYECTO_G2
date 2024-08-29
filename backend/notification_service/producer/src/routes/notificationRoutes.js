const express = require('express');
const { sendNotification } = require('../controllers/notificationProducer');

const router = express.Router();

router.post('/send', sendNotification);

module.exports = router;
