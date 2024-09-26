import io
from ..models.singleton.singleton import MySQLSingleton
from ..controllers.encryption_controller import EncryptionController
from ..services.s3_service import S3Service
from ..services.cognito_service import CognitoService
from ..models.factory_method.factory import UserFactory
from ..utils.funciones import BadRequestError
from werkzeug.utils import secure_filename
from datetime import datetime

class ClientesController:

    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton()
        # Inicializar el controlador del servicio proxy de encryptación
        self.encryption_controller = EncryptionController()
        self.s3_service = S3Service()
        self.cognito_service = CognitoService()

    def get_clientes(self):

        # Definir la consulta SQL
        query = """SELECT CLI_ID, NOMBRE, FECHA_NACIMIENTO, GENERO, CORREO, FOTO_DPI, TELEFONO
                FROM Cliente"""

        # Ejecutar la consulta usando el singleton
        cliente_rows = self.db.fetch_all(query, [])

        # Convertir los resultados a una lista de diccionarios
        clientes = []
        for row in cliente_rows:
            cliente = {
                "cli_id": row[0],
                "nombre": row[1],
                "fecha_nacimiento": row[2],
                "genero": row[3],
                "correo": row[4],
                "foto_dpi": row[5],
                "telefono": row[6]
            }
            clientes.append(cliente)

        # Retornar los resultados
        return clientes

    def create_cliente(self, request):

        # Verificar si los campos requeridos están presentes en el formulario
        if 'nombre' not in request.form:
            raise BadRequestError('Falta el nombre.')
        if 'fecha_nacimiento' not in request.form:
            raise BadRequestError('Falta la fecha de nacimiento.')
        if 'genero' not in request.form:
            raise BadRequestError('Falta el género.')
        if 'correo' not in request.form:
            raise BadRequestError('Falta el correo.')
        if 'foto_dpi' not in request.files:
            raise BadRequestError('Falta la foto del DPI o los datos.')
        if 'telefono' not in request.form:
            raise BadRequestError('Falta el teléfono.')
        if 'contrasenia' not in request.form:
            raise BadRequestError('Falta la contraseña.')
        if 'contrasenia2' not in request.form:
            raise BadRequestError('Falta la confirmación de la contraseña.')

        # Obtener los datos del formulario y el archivo
        datos = request.form
        archivo_foto_dpi = request.files['foto_dpi']

        # Validar archivo
        if archivo_foto_dpi.filename == '':
            raise BadRequestError('No se ha seleccionado ningún archivo.')

        # Guardar la imagen en S3
        filename = secure_filename(archivo_foto_dpi.filename)
        file_stream = io.BytesIO(archivo_foto_dpi.read())
        # Se define la ruta donde se guardará la imagen en S3 considerando la fecha y hora actual
        filename = f"fotos_dpi_clientes/{str(datetime.now().strftime('%Y%m%d%H%M%S'))}_{filename}"
        object_url = self.s3_service.upload_object(file_stream, filename)
        if object_url is None:
            raise Exception('Error al subir la imagen a S3.')

        if datos.get('contrasenia') == datos.get('contrasenia2'):
            # Encriptar la contraseña usando el EncryptionController
            contrasenia_encriptada = self.encryption_controller.encrypt(password=datos.get('contrasenia'), action='encrypt')
            # Extraer los datos del formulario
            cliente_data = {
                'nombre': datos.get('nombre'),
                'fecha_nacimiento': datos.get('fecha_nacimiento'),
                'genero': datos.get('genero'),
                'correo': datos.get('correo'),
                'foto_dpi': object_url,
                'telefono': datos.get('telefono'),
                'contrasenia': contrasenia_encriptada
            }
            cliente = UserFactory.create_user('Cliente', **cliente_data)

            # Definir el query para insertar un cliente
            query = """
            INSERT INTO Cliente (nombre, fecha_nacimiento, genero, correo, foto_dpi, telefono, contrasenia)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                cliente.nombre,
                cliente.fecha_nacimiento,
                cliente.genero,
                cliente.correo,
                cliente.foto_dpi,
                cliente.telefono,
                cliente.contrasenia
            )

            try:
                # Ejecutar la consulta
                self.db.execute_query(query, values)
            except Exception as e:
                # Eliminar la imagen de S3 si ocurre un error
                self.s3_service.delete_object(filename)
                raise Exception(f"Error al insertar el cliente: {e}")

            try:
                # Registrar usuario en Cognito
                self.cognito_service.register_user(cliente.correo, datos.get('contrasenia'), cliente.get_role())
            except Exception as e:
                # Eliminar la imagen de S3 si ocurre un error
                self.s3_service.delete_object(filename)
                # Eliminar usuario segun su correo si ocurre un error
                self.db.execute_query("DELETE FROM Cliente WHERE correo = %s", (cliente.correo,))
                raise Exception(f"Error al insertar el cliente: {e}")

        else:
            raise BadRequestError('La contraseña no coincide con la confirmación.')

    def update_cliente(self, cliente_data):

        # Crear una lista de campos para actualizar
        update_fields = []
        update_values = []

        # Verificar si cada campo de cliente_data no es None y agregarlo a la lista
        if 'nombre' in cliente_data:
            update_fields.append("nombre = %s")
            update_values.append(cliente_data['nombre'])
        if 'fecha_nacimiento' in cliente_data:
            update_fields.append("fecha_nacimiento = %s")
            update_values.append(cliente_data['fecha_nacimiento'])
        if 'telefono' in cliente_data:
            update_fields.append("telefono = %s")
            update_values.append(cliente_data['telefono'])

        # Si no se proporcionan campos para actualizar, lanzar una excepción
        if not update_fields:
            raise BadRequestError("No se proporcionaron campos para actualizar.")

        # Definir la consulta SQL dinámica
        query = f"""
        UPDATE Cliente
        SET {', '.join(update_fields)}
        WHERE CLI_ID = %s
        """

        # Agregar el ID del cliente al final de la lista de valores
        update_values.append(cliente_data['cli_id'])

        # Ejecutar la consulta usando el singleton
        self.db.execute_query(query, update_values)
