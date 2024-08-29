require('dotenv').config();

const config = {
    sqs: {
        queueUrl: process.env.SQS_QUEUE_URL || 'your-queue-url',
      },
    server: {
        port: process.env.PRODUCER_PORT || 4100,
    },
};

module.exports = config;
