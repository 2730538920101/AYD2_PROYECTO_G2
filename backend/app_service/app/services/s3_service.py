import boto3
from botocore.exceptions import NoCredentialsError, ClientError
import logging
from config import Config

class S3Service:
    def __init__(self, bucket_name=Config.AWS_BUCKET_NAME, region_name=Config.AWS_REGION):
        self.s3 = boto3.client('s3', region_name=region_name, aws_access_key_id=Config.AWS_ACCESS_KEY_ID, aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY)
        self.bucket_name = bucket_name

    def list_objects(self, prefix=''):
        try:
            response = self.s3.list_objects_v2(Bucket=self.bucket_name, Prefix=prefix)
            if 'Contents' in response:
                return [obj['Key'] for obj in response['Contents']]
            else:
                return []
        except NoCredentialsError:
            logging.error("Credentials not available.")
            return None
        except ClientError as e:
            logging.error(f"An error occurred: {e}")
            return None

    def delete_object(self, object_key):
        try:
            self.s3.delete_object(Bucket=self.bucket_name, Key=object_key)
            return True
        except NoCredentialsError:
            logging.error("Credentials not available.")
            return False
        except ClientError as e:
            logging.error(f"An error occurred: {e}")
            return False

    def upload_object(self, file_stream, object_key):
        try:
            # Usar upload_fileobj para archivos en memoria
            self.s3.upload_fileobj(file_stream, self.bucket_name, object_key)
            return f"https://{self.bucket_name}.s3.amazonaws.com/{object_key}"
        except NoCredentialsError:
            logging.error("Credentials not available.")
            return None
        except ClientError as e:
            logging.error(f"An error occurred: {e}")
            return None