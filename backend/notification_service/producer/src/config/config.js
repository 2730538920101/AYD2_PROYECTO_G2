require('dotenv').config();

const config = {
    sqs: {
        queueUrl: process.env.SQS_QUEUE_URL || '',
        region: process.env.AWS_REGION || '',
        accessKeyId: process.env.SQS_AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.SQS_AWS_SECRET_ACCESS_KEY || '',
    },
    server: {
        port: process.env.PRODUCER_PORT || 4100,
    },
    s3: {
        AccessKeyId: process.env.S3_AWS_ACCESS_KEY_ID || '',
        SecretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY || '',
        region: process.env.AWS_REGION || '',
        bucketName: process.env.AWS_BUCKET_NAME || '',
    },
};

module.exports = config;