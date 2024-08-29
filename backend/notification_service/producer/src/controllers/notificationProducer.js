const SQSClient = require('../services/sqsClient');
const Notification = require('../models/notification');

exports.sendNotification = async (req, res, next) => {
  try {
    const { type, message } = req.body;
    const notification = new Notification(type, message);
    await SQSClient.sendMessage(notification.toJSON());
    res.status(200).json({ success: true, message: 'Notification sent' });
  } catch (error) {
    next(error);
  }
};
