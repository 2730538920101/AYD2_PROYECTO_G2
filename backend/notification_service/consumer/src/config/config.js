require('dotenv').config();

const config = {
  sqs: {
    queueUrl: process.env.SQS_QUEUE_URL || '',
    region: process.env.AWS_REGION || '',
    accessKeyId: process.env.SQS_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.SQS_AWS_SECRET_ACCESS_KEY || '',
      },
    server: {
        port: process.env.CONSUMER_PORT || 4200,
      },
    db: {
        host: process.env.DB_HOST || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || '',
      }
};

module.exports = config;
