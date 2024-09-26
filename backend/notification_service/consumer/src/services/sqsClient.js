const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs');
const config = require('../config/config');

class SQSService {
  constructor() {
    this.client = new SQSClient({
      region: config.sqs.region,
      credentials: {
        accessKeyId: config.sqs.accessKeyId,
        secretAccessKey: config.sqs.secretAccessKey,
      },
    });
    this.queueUrl = config.sqs.queueUrl;
  }

  async receiveMessage() {
    const params = {
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20, // Long polling para minimizar el número de solicitudes
    };

    try {
      const command = new ReceiveMessageCommand(params);
      const data = await this.client.send(command);
      return data.Messages || [];
    } catch (error) {
      console.error('Error receiving message from SQS:', error);
      throw new Error('Error receiving message from SQS');
    }
  }

  async deleteMessage(receiptHandle) {
    const params = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    };

    try {
      const command = new DeleteMessageCommand(params);
      await this.client.send(command);
      console.log('Message deleted from SQS');
    } catch (error) {
      console.error('Error deleting message from SQS:', error);
      throw new Error('Error deleting message from SQS');
    }
  }
}

module.exports = new SQSService();
