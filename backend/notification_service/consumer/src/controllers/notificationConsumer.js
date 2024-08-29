const SQSClient = require('../services/sqsClient');
const Notification = require('../models/notification');
const Observable = require('../models/observable');
const ConcreteObserver = require('../models/concreteObserver');  // Si se utiliza

const observable = new Observable();
observable.addObserver(new ConcreteObserver());  // Agregar los observadores que se necesiten

exports.checkNotifications = async (req, res, next) => {
  try {
    const messages = await SQSClient.receiveMessage();
    messages.forEach(async (message) => {
      const notification = Notification.fromJSON(message.Body);
      observable.notify(notification);
      await DBClient.insertAlert(notification);
      await SQSClient.deleteMessage(message.ReceiptHandle);
    });
    res.status(200).json({ success: true, message: 'Notifications processed' });
  } catch (error) {
    next(error);
  }
};