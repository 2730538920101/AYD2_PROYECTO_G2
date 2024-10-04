import boto3
from botocore.exceptions import ClientError, NoCredentialsError, PartialCredentialsError
from config import Config

class CognitoService:

    def __init__(self):
        try:
            # Inicializar los clientes de Cognito con manejo de credenciales
            self.cognito_client = boto3.client(
                'cognito-idp',
                region_name=Config.AWS_REGION,
                aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY
            )
            self.identity_client = boto3.client(
                'cognito-identity',
                region_name=Config.AWS_REGION,
                aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY
            )
        except (NoCredentialsError, PartialCredentialsError) as e:
            print(f"Credenciales no encontradas o incompletas: {e}")
            raise

        # Configuración de variables de entorno
        self.user_pool_id = Config.COGNITO_USER_POOL_ID
        self.user_pool_client_id = Config.COGNITO_USER_POOL_CLIENT_ID
        self.identity_pool_id = Config.COGNITO_IDENTITY_POOL_ID

    def register_user(self, email: str, password: str, user_type: str) -> dict:
        """Registrar un nuevo usuario en el User Pool de Cognito y asignarlo a un grupo"""
        try:
            response = self.cognito_client.sign_up(
                ClientId=self.user_pool_client_id,
                Username=email,
                Password=password,
                UserAttributes=[{'Name': 'email', 'Value': email}]
            )

            # Mapear los tipos de usuario a grupos
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
            raise RuntimeError(e)

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

    def authenticate_user(self, email: str, password: str) -> dict:
        """Autenticar un usuario en el User Pool de Cognito y devolver los tokens de autenticación"""
        try:
            # Autenticar al usuario
            response = self.cognito_client.initiate_auth(
                ClientId=self.user_pool_client_id,
                AuthFlow='USER_PASSWORD_AUTH',
                AuthParameters={
                    'USERNAME': email,
                    'PASSWORD': password
                }
            )

            # Obtener los tokens de la respuesta
            access_token = response['AuthenticationResult']['AccessToken']
            id_token = response['AuthenticationResult']['IdToken']
            refresh_token = response['AuthenticationResult']['RefreshToken']

            # Retornar los tokens, el ID Token ya incluye los grupos
            return {
                'access_token': access_token,
                'id_token': id_token,  # Este token incluye los grupos del usuario
                'refresh_token': refresh_token
            }
        except ClientError as e:
            print(f"Error authenticating user: {e}")
            return None

    def recover_account(self, email: str) -> dict:
        """Iniciar el proceso de recuperación de cuenta"""
        try:
            response = self.cognito_client.forgot_password(
                ClientId=self.user_pool_client_id,
                Username=email
            )
            return response
        except ClientError as e:
            print(f"Error recovering account: {e}")
            return None

    def confirm_recovery(self, email: str, confirmation_code: str, new_password: str) -> dict:
        """Confirmar la recuperación de cuenta con el código y nueva contraseña"""
        try:
            response = self.cognito_client.confirm_forgot_password(
                ClientId=self.user_pool_client_id,
                Username=email,
                ConfirmationCode=confirmation_code,
                Password=new_password
            )
            return response
        except ClientError as e:
            print(f"Error confirming recovery: {e}")
            return None

    def block_account(self, email: str) -> dict:
        """Bloquear la cuenta de un usuario"""
        try:
            response = self.cognito_client.admin_disable_user(
                UserPoolId=self.user_pool_id,
                Username=email
            )
            return response
        except ClientError as e:
            print(f"Error blocking account: {e}")
            return None

    def unblock_account(self, email: str) -> dict:
        """Desbloquear la cuenta de un usuario"""
        try:
            response = self.cognito_client.admin_enable_user(
                UserPoolId=self.user_pool_id,
                Username=email
            )
            return response
        except ClientError as e:
            print(f"Error unblocking account: {e}")
            return None

    def change_password(self, email: str, previous_password: str, proposed_password: str) -> dict:
        """Cambiar la contraseña de un usuario autenticado"""
        try:
            # Primero autenticar al usuario para obtener el token
            auth_response = self.authenticate_user(email, previous_password)
            if not auth_response:
                print("Error authenticating user for password change.")
                return None

            # Cambiar de 'auth_result' a 'AuthenticationResult'
            access_token = auth_response['access_token']

            # Cambiar la contraseña usando el token de acceso
            response = self.cognito_client.change_password(
                AccessToken=access_token,
                PreviousPassword=previous_password,
                ProposedPassword=proposed_password
            )
            return response
        except ClientError as e:
            print(f"Error changing password: {e}")
            return None

    def user_exists(self, email):
        try:
            response = self.cognito_client.admin_get_user(
                UserPoolId=self.user_pool_id,
                Username=email
            )
            return True if response else False
        except self.cognito_client.exceptions.UserNotFoundException:
            return False

    def validate_verification_code(self, email: str, confirmation_code: str) -> dict:
        """Validar el código de verificación enviado al correo después del registro"""
        try:
            response = self.cognito_client.confirm_sign_up(
                ClientId=self.user_pool_client_id,
                Username=email,
                ConfirmationCode=confirmation_code
            )
            return response
        except ClientError as e:
            print(f"Error confirming sign up: {e}")
            return None

    def is_user_confirmed(self, email: str) -> bool:
        """Verificar si el usuario ha confirmado el registro en Cognito"""
        try:
            response = self.cognito_client.admin_get_user(
                UserPoolId=self.user_pool_id,
                Username=email
            )
            for attr in response['UserAttributes']:
                if attr['Name'] == 'email_verified' and attr['Value'] == 'true':
                    return True
            return False
        except ClientError as e:
            print(f"Error checking if user is confirmed: {e}")
            return False

    def get_user_group(self, email: str) -> str:
        """Obtener el grupo al que pertenece el usuario en el User Pool"""
        try:
            # Obtener los grupos a los que pertenece el usuario
            response = self.cognito_client.admin_list_groups_for_user(
                UserPoolId=self.user_pool_id,
                Username=email
            )
            groups = response.get('Groups', [])
            for group in groups:
                if group['GroupName'] == "AdminGroup":
                    return "Administrador"  # Retornar el grupo del usuario
                elif group['GroupName'] == "AssistantGroup":
                    return "Asistente"
                elif group['GroupName'] == "DriverGroup":
                    return "Conductor"
                elif group['GroupName'] == "ClientGroup":
                    return "Cliente"
            return None  # Si no pertenece a ningún grupo
        except ClientError as e:
            print(f"Error getting user group: {e}")
            return None