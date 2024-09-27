const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');
const config = require('../config/config');


class SQSService {
  constructor() {
    this.client = new SQSClient({ 
      region: config.sqs.region,
      credentials: {
        accessKeyId: config.sqs.accessKeyId,
        secretAccessKey: config.sqs.secretAccessKey, 
      }
    });
    this.queueUrl = config.sqs.queueUrl;
  }

  async sendMessage(messageBody) {
    const params = {
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(messageBody),
    };

    try {
      const command = new SendMessageCommand(params);
      const data = await this.client.send(command);
      return data;
    } catch (error) {
      console.error('Error sending message to SQS:', error.message);
      throw new Error('Failed to send message to SQS');
    }
  }
}

module.exports = new SQSService();
