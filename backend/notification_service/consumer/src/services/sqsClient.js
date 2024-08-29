const AWS = require('aws-sdk');
const config = require('../config/config');

class SQSClient {
  constructor() {
    this.sqs = new AWS.SQS();
    this.queueUrl = config.sqs.queueUrl;
  }

  async receiveMessage() {
    const params = {
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 10,
    };
    const data = await this.sqs.receiveMessage(params).promise();
    return data.Messages || [];
  }

  async deleteMessage(receiptHandle) {
    const params = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    };
    return this.sqs.deleteMessage(params).promise();
  }
}

module.exports = new SQSClient();
