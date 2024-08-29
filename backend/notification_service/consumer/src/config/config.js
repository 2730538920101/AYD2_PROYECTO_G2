require('dotenv').config();

const config = {
    sqs: {
        queueUrl: process.env.SQS_QUEUE_URL || 'your-queue-url',
      },
    server: {
        port: process.env.PRODUCER_PORT || 4200,
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'PROYECTO_VIAJES',
      }
};

module.exports = config;
