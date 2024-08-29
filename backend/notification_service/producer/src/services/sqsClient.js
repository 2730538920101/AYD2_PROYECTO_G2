const AWS = require('aws-sdk');
const config = require('../config/config');

class SQSClient {
  constructor() {
    this.sqs = new AWS.SQS();
    this.queueUrl = config.sqs.queueUrl;
  }

  async sendMessage(messageBody) {
    const params = {
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(messageBody),
    };
    return this.sqs.sendMessage(params).promise();
  }
}

module.exports = new SQSClient();
