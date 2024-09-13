import boto3
from botocore.exceptions import ClientError, NoCredentialsError, PartialCredentialsError
from config import Config

class CognitoService:
    def __init__(self):
        try:
            # Inicializar los clientes de Cognito con manejo de credenciales
            self.cognito_client = boto3.client('cognito-idp', region_name=Config.AWS_REGION, aws_access_key_id=Config.COGNITO_AWS_ACCESS_KEY_ID, aws_secret_access_key=Config.COGNITO_AWS_SECRET_ACCESS_KEY)
            self.identity_client = boto3.client('cognito-identity', region_name=Config.AWS_REGION, aws_access_key_id=Config.COGNITO_AWS_ACCESS_KEY_ID, aws_secret_access_key=Config.COGNITO_AWS_SECRET_ACCESS_KEY)
        except (NoCredentialsError, PartialCredentialsError) as e:
            print(f"Credenciales no encontradas o incompletas: {e}")
            raise
        
        # Configuración de variables de entorno
        self.user_pool_id = Config.COGNITO_USER_POOL_ID
        self.user_pool_client_id = Config.COGNITO_USER_POOL_CLIENT_ID
        self.identity_pool_id = Config.COGNITO_IDENTITY_POOL_ID
        
        # Verificar la configuración cargada
        print(f"Region: {Config.AWS_REGION}")
        print(f"User Pool ID: {self.user_pool_id}")
        print(f"User Pool Client ID: {self.user_pool_client_id}")
        print(f"Identity Pool ID: {self.identity_pool_id}")

    def register_user(self, email: str, password: str, user_type: str) -> dict:
        """Registrar un nuevo usuario en el User Pool de Cognito y asignarlo a un grupo"""
        try:
            response = self.cognito_client.sign_up(
                ClientId=self.user_pool_client_id,
                Username=email,
                Password=password,
                UserAttributes=[
                    {
                        'Name': 'email',
                        'Value': email
                    }
                ]
            )
            if user_type == "Administrador":
                user_type = "AdminGroup"
            elif user_type == "Cliente":
                user_type = "ClientGroup"
            elif user_type == "Conductor":
                user_type = "DriverGroup"
            elif user_type == "Asistente":
                user_type = "AssistantGroup"
                
            # Asignar el usuario al grupo correspondiente
            self.add_user_to_group(email, user_type)
            return response
        except ClientError as e:
            print(f"Error registering user: {e}")
            return None

    def add_user_to_group(self, username: str, groupname: str) -> dict:
        """Asignar un usuario a un grupo en el User Pool"""
        try:
            response = self.cognito_client.admin_add_user_to_group(
                UserPoolId=self.user_pool_id,
                Username=username,
                GroupName=groupname
            )
            return response
        except ClientError as e:
            print(f"Error adding user to group: {e}")
            return None