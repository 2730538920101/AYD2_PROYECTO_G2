import boto3
from botocore.exceptions import NoCredentialsError, ClientError
import logging
from ...config import Config

class S3Service:
    def __init__(self, bucket_name=Config.AWS_BUCKET_NAME, region_name=Config.AWS_REGION):
        self.s3 = boto3.client('s3', region_name=region_name)
        self.bucket_name = bucket_name

    def list_objects(self, prefix=''):
        """
        Lista los objetos en un bucket de S3 bajo un prefijo específico.
        :param prefix: La 'ruta' en el bucket desde la que listar objetos.
        :return: Lista de claves de objetos o None si ocurre un error.
        """
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
        """
        Elimina un objeto de S3.
        :param object_key: La clave completa del objeto (incluyendo 'ruta').
        :return: True si se elimina con éxito, False si ocurre un error.
        """
        try:
            self.s3.delete_object(Bucket=self.bucket_name, Key=object_key)
            return True
        except NoCredentialsError:
            logging.error("Credentials not available.")
            return False
        except ClientError as e:
            logging.error(f"An error occurred: {e}")
            return False

    def upload_object(self, file_name, object_key):
        """
        Sube un archivo al bucket de S3 en una ruta específica.
        :param file_name: Ruta local del archivo que se va a subir.
        :param object_key: La clave completa del objeto en S3 (incluyendo 'ruta').
        :return: La URL del objeto si se sube con éxito, None si ocurre un error.
        """
        try:
            self.s3.upload_file(file_name, self.bucket_name, object_key)
            object_url = f"https://{self.bucket_name}.s3.amazonaws.com/{object_key}"
            return object_url
        except NoCredentialsError:
            logging.error("Credentials not available.")
            return None
        except ClientError as e:
            logging.error(f"An error occurred: {e}")
            return None
