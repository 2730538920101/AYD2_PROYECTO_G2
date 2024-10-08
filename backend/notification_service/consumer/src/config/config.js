require('dotenv').config();

const config = {
  sqs: {
    queueUrl: process.env.SQS_QUEUE_URL || '',
    region: process.env.AWS_REGION || '',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    server: {
        port: process.env.CONSUMER_PORT || 4200,
      },
    db: {
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || '',
      }
};

module.exports = config;
