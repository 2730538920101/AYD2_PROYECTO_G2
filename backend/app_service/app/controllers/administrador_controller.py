from ..models.singleton.singleton import MySQLSingleton
from mysql.connector import Error
from ..controllers.encryption_controller import EncryptionController
from ..services.cognito_service import CognitoService  # Importar el servicio de Cognito
from ..models.factory_method.factory import UserFactory  # Importar la fábrica de usuarios
import os


class AdministradorController:
    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton()
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
        También escribir el valor encriptado de validacion en un archivo.
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
                encrypted_password = EncryptionController().encrypt(password=administrador.contrasenia, action='encrypt')
                encrypted_validation = EncryptionController().encrypt(password=administrador.validacion, action='encrypt')

                values = (
                    administrador.usuario,          # Usuario es el correo
                    encrypted_password,             # Contraseña ya encriptada
                    encrypted_validation            # Validación también encriptada
                )

                # Ejecutar la consulta usando el singleton
                self.db.execute_query(query, values)

                print("Administrador registrado en la base de datos.")

                # Escribir la validación encriptada en un archivo
                file_path = os.path.join(os.getcwd(), 'clave.ayd')
                with open(file_path, 'wb') as file:
                    file.write(encrypted_validation)

                    print(f"Archivo 'clave.ayd' creado en la ruta: {file_path}")

            else:
                raise Exception("Error al registrar el administrador en Cognito.")
        
        except Error as e:
            raise Exception(f"Error al insertar administrador en la base de datos: {e}")

    def inicializar_administrador(self, usuario, contrasenia, validacion):
        """
        Inicializar el administrador si no existe en la base de datos.
        """
        if not self.existe_administrador() and not self.cognito_service.user_exists(usuario):
            # Usar la fábrica de usuarios para crear el administrador
            administrador = {
                'usuario':usuario,
                'contrasenia':contrasenia,
                'validacion':validacion
            }
            administrador = UserFactory.create_user('Administrador', **administrador)
            self.create_administrador(administrador)
    
        else:
            print("Administrador ya existe, no se requiere registrar uno nuevo.")

    def obtener_validacion(self, usuario):
        """
        Obtener el texto de validación del administrador en la base de datos.
        """
        query = "SELECT VALIDACION FROM Administrador WHERE USUARIO = %s"
        try:
            result = self.db.fetch_one(query, (usuario,))
            return result[0] if result else None
        except Error as e:
            raise Exception(f"Error al obtener el texto de validación: {e}")