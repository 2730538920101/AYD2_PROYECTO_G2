const sqsClient = require('../services/sqsClient');
const Notification = require('../models/notification');
const s3Service = require('../services/s3Service');

// Método para enviar la notificación
exports.sendNotification = async (req, res, next) => {
  const { type, message, viajeId } = req.body;
  const file = req.file; // Obtener el archivo subido

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Definir el objetoKey basado en el tipo
    const objectKey = `${type === 'Cliente' ? 'fotos_alertas_clientes/' : 'fotos_alertas_conductores/'}${Date.now()}_${file.originalname}`;

    // Subir la imagen a S3
    const imageUrl = await s3Service.uploadObject(file.buffer, objectKey); // file.buffer para el stream

    // Crear la notificación
    const notification = new Notification(type, message, viajeId, imageUrl); // Usar la URL de la imagen
    const messageBody = JSON.stringify(notification.toJSON());

    // Enviar el mensaje a SQS
    await sqsClient.sendMessage(messageBody);

    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending notification' });
  }
};
