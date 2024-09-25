// notificationConsumer.js

const SQSClient = require('../services/sqsClient');
const Notification = require('../models/notification'); // Importar correctamente la clase Notification
const Observable = require('../models/observable');
const ConcreteObserver = require('../models/concreteObserver');

const observable = new Observable();
const observer = new ConcreteObserver();
observable.addObserver(observer);  // Agregar el observador para que esté activo

exports.checkNotifications = async (req, res, next) => {
  try {
    const messages = await SQSClient.receiveMessage();

    // Verifica cada mensaje recibido
    messages.forEach(async (message) => {
      try {
        console.log('Raw message body:', message.Body);  // Verifica que contiene el JSON correcto

        // Intenta parsear el mensaje JSON
        const notification = Notification.fromJSON(message.Body); // Llamada correcta a fromJSON
        console.log('Parsed notification:', notification);

        // Notifica a los observadores
        observable.notify(notification);

        // Elimina el mensaje de SQS después de notificar a los observadores
        await SQSClient.deleteMessage(message.ReceiptHandle);

        console.log('Notification processed and inserted into DB:', notification);
      } catch (parseError) {
        console.error('Error parsing message body:', parseError);
      }
    });

    res.status(200).json({ success: true, message: 'Notifications processed' });
  } catch (error) {
    next(error);
  }
};
