from ..models.singleton.singleton import MySQLSingleton
from config import Config
from mysql.connector import Error
from ..controllers.encryption_controller import EncryptionController
from ..services.cognito_service import CognitoService  # Importar el servicio de Cognito
from ..models.factory_method.factory import UserFactory  # Importar la fábrica de usuarios

class AdministradorController:
    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton(Config.MYSQL_HOST, Config.MYSQL_USER, Config.MYSQL_PASSWORD, Config.MYSQL_DATABASE)
        self.cognito_service = CognitoService()  # Inicializar el servicio de Cognito

    def existe_administrador(self):
        """
        Verificar si ya existe un administrador registrado en la base de datos.
        """
        query = "SELECT COUNT(*) FROM Administrador"
        try:
            result = self.db.fetch_all(query)
            # Si existe al menos un administrador, devolver True
            return result[0][0] > 0
        except Error as e:
            raise Exception(f"Error al verificar existencia de administrador: {e}")

    def create_administrador(self, administrador):
        """
        Insertar un nuevo administrador en la base de datos y registrar en Cognito.
        """
        try:
            # Registrar al administrador en Cognito primero
            cognito_response = self.cognito_service.register_user(
                administrador.usuario,
                administrador.contrasenia,
                administrador.get_role()
            )

            if cognito_response and cognito_response['ResponseMetadata']['HTTPStatusCode'] == 200:
                print("Administrador registrado en Cognito exitosamente.")

                # Si el registro en Cognito es exitoso, proceder a insertar en la base de datos
                query = """
                INSERT INTO Administrador (usuario, contrasenia, validacion)
                VALUES (%s, %s, %s)
                """
                values = (
                    administrador.usuario,              # Usuario es el correo
                    EncryptionController().encrypt(password=administrador.contrasenia, action='encrypt'),         # Contraseña ya encriptada
                    EncryptionController().encrypt(password=administrador.validacion, action='encrypt')        # Validación adicional si aplica
                )

                # Ejecutar la consulta usando el singleton
                self.db.execute_query(query, values)

                print("Administrador registrado en la base de datos.")
            else:
                raise Exception("Error al registrar el administrador en Cognito.")
        
        except Error as e:
            raise Exception(f"Error al insertar administrador en la base de datos: {e}")

    def inicializar_administrador(self, usuario, contrasenia, validacion):
        """
        Inicializar el administrador si no existe en la base de datos.
        """
        if not self.existe_administrador():
            # Usar la fábrica de usuarios para crear el administrador
            administrador = {
                'usuario':usuario,
                'contrasenia':contrasenia,
                'validacion':validacion
            }
            administrador = UserFactory.create_user('Administrador', **administrador)
            self.create_administrador(administrador)
            print("Administrador inicial registrado.")
        else:
            print("Administrador ya existe, no se requiere registrar uno nuevo.")
