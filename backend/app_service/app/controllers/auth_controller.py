from ..models.singleton.singleton import MySQLSingleton
from ..services.cognito_service import CognitoService
from config import Config

class AuthController:
    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton(Config.MYSQL_HOST, Config.MYSQL_USER, Config.MYSQL_PASSWORD, Config.MYSQL_DATABASE)
        self.cognito_service = CognitoService()

    def change_password_in_db(self, email: str, new_password: str, user_type: str) -> bool:
        """
        Cambia la contraseña de un usuario en la base de datos.
        """
        try:
            # Llama al procedimiento almacenado para actualizar la contraseña
            self.db.execute_stored_procedure('ChangePassword', (email, new_password, user_type))
            return True
        except Exception as e:
            print(f"Error updating password in database: {e}")
            return False

    def change_password_in_cognito(self, email: str, old_password: str, new_password: str) -> bool:
        """
        Cambia la contraseña de un usuario en AWS Cognito.
        """
        try:
            self.cognito_service.change_password(email, old_password, new_password)
            return True
        except Exception as e:
            print(f"Error updating password in Cognito: {e}")
            return False

    def get_current_password(self, email: str, user_type: str) -> str:
        """
        Obtiene la contraseña actual de un usuario en la base de datos.
        """
        try:
            # Llama al procedimiento almacenado y captura los resultados
            results = self.db.execute_stored_procedure('GetPassword', (email, user_type))

            # Como el procedimiento devuelve un resultado, obtenemos la primera fila
            if results and results[0]:
                current_password = results[0][0]  # Accede al valor de la contraseña
                print(current_password)
                return current_password
            else:
                print(f"No password found for {email}.")
                return None
        except Exception as e:
            print(f"Error retrieving current password from database: {e}")
            return None