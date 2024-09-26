const { S3Client, ListObjectsV2Command, DeleteObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const config = require('../config/config');

class S3Service {
  constructor(bucketName = config.s3.bucketName) {
    this.client = new S3Client({
      credentials: {
        accessKeyId: config.s3.AccessKeyId,
        secretAccessKey: config.s3.SecretAccessKey,
      },
      region: config.s3.region,
    });
    this.bucketName = config.s3.bucketName;
  }

  // Listar objetos dentro del bucket
  async listObjects(prefix = '') {
    const params = {
      Bucket: this.bucketName,
      Prefix: prefix,
    };

    try {
      const command = new ListObjectsV2Command(params);
      const data = await this.client.send(command);
      return data.Contents ? data.Contents.map((obj) => obj.Key) : [];
    } catch (error) {
      console.error('Error listing objects from S3:', error.message);
      throw new Error('Error listing objects in S3');
    }
  }

  // Eliminar un objeto del bucket
  async deleteObject(objectKey) {
    const params = {
      Bucket: this.bucketName,
      Key: objectKey,
    };

    try {
      const command = new DeleteObjectCommand(params);
      await this.client.send(command);
      return true;
    } catch (error) {
      console.error('Error deleting object from S3:', error.message);
      throw new Error('Error deleting object from S3');
    }
  }

  // Subir archivo (equivalente a upload_object)
  async uploadObject(fileStream, objectKey) {
    const params = {
      Bucket: this.bucketName,
      Key: objectKey,
      Body: fileStream,
    };

    try {
      const command = new PutObjectCommand(params);
      await this.client.send(command);
      return `https://${this.bucketName}.s3.${config.s3.region}.amazonaws.com/${objectKey}`;
    } catch (error) {
      console.error('Error uploading file to S3:', error.message);
      throw new Error('Error uploading file to S3');
    }
  }
}

module.exports = new S3Service();
