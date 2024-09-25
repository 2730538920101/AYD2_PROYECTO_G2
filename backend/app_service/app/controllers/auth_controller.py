from ..models.singleton.singleton import MySQLSingleton
from ..services.cognito_service import CognitoService
from config import Config

class AuthController:
    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton()
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
        
    def validate_user(self, input_value: str) -> str:
        """
        Valida si el usuario existe en las tablas Cliente, Conductor, Asistente o Administrador,
        usando el procedimiento almacenado ValidateUser.
        """
        try:
            # Llama al procedimiento almacenado ValidateUser
            result = self.db.execute_stored_procedure('ValidateUser', (input_value,))

            # Como el procedimiento devuelve un resultado, obtenemos la primera fila
            if result and result[0]:
                validation = result[0][0]  # Accede al valor de validación
                print(f"Validation result: {validation}")
                return validation
            else:
                print(f"No user found for input: {input_value}")
                return None
        except Exception as e:
            print(f"Error validating user in database: {e}")
            return None