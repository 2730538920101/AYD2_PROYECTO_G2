import io
from ..controllers.encryption_controller import EncryptionController
from ..models.singleton.singleton import MySQLSingleton
from ..services.s3_service import S3Service
from ..services.cognito_service import CognitoService
from ..models.factory_method.factory import UserFactory
from ..utils.funciones import BadRequestError, generar_identificador_unico
from werkzeug.utils import secure_filename
from datetime import datetime

class AsistentesController:

    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton()
        # Inicializar controladores y servicios
        self.encryption_controller = EncryptionController()
        self.s3_service = S3Service()
        self.cognito_service = CognitoService()

    def get_asistentes(self):
        try:
            # Definir la consulta SQL
            query = """SELECT ASISTENTE_ID, NOMBRE, TELEFONO, ESTADO_CIVIL, GENERO, CORREO, FECHA_NACIMIENTO, DIRECCION, NUMERO_DPI, NUMERO_CUENTA, PAPELERIA
                    FROM Asistente"""

            # Ejecutar la consulta usando el singleton
            asistente_rows = self.db.fetch_all(query, [])

            # Convertir los resultados a una lista de diccionarios
            asistentes = []
            for row in asistente_rows:
                asistente = {
                    "asistente_id": row[0],
                    "nombre": row[1],
                    "telefono": row[2],
                    "estado_civil": row[3],
                    "genero": row[4],
                    "correo": row[5],
                    "fecha_nacimiento": row[6].strftime("%d/%m/%Y"),
                    "direccion": row[7],
                    "numero_dpi": row[8],
                    "numero_cuenta": row[9],
                    "papeleria": row[10]
                }
                asistentes.append(asistente)

            # Retornar los resultados
            return asistentes

        except Exception as e:
            raise Exception(f"Error al obtener asistentes: {e}")

    def create_asistente(self, request):

        # Se verifica si los campos requeridos estan presentes en el formulario
        if 'nombre' not in request.form:
            raise BadRequestError('Falta el nombre.')
        if 'telefono' not in request.form:
            raise BadRequestError('Falta el teléfono.')
        if 'estado_civil' not in request.form:
            raise BadRequestError('Falta el estado civil.')
        if 'genero' not in request.form:
            raise BadRequestError('Falta el género.')
        if 'correo' not in request.form:
            raise BadRequestError('Falta el correo.')
        if 'contrasenia' not in request.form:
            raise BadRequestError('Falta la contraseña.')
        if 'fecha_nacimiento' not in request.form:
            raise BadRequestError('Falta la fecha de nacimiento.')
        if 'direccion' not in request.form:
            raise BadRequestError('Falta la dirección.')
        if 'numero_dpi' not in request.form:
            raise BadRequestError('Falta el número de DPI.')
        if 'numero_cuenta' not in request.form:
            raise BadRequestError('Falta el número de cuenta.')
        if 'papeleria' not in request.files:
            raise BadRequestError('Falta la papelería.')

        # Obtener los datos del formulario y el archivo
        datos = request.form
        archivo_papeleria = request.files['papeleria']

        # Validar archivo
        if archivo_papeleria.filename == '':
            raise BadRequestError('No se ha seleccionado ningún archivo.')

        # Guardar la papelería en S3
        filename_papeleria = secure_filename(archivo_papeleria.filename)
        file_stream_papeleria = io.BytesIO(archivo_papeleria.read())
        filename_papeleria = f"documento_cv_asistentes/{str(datetime.now().strftime('%Y%m%d%H%M%S'))}_{filename_papeleria}"
        object_url_papeleria = self.s3_service.upload_object(file_stream_papeleria, filename_papeleria)
        if not object_url_papeleria:
            raise Exception('Error al subir la imagen a S3.')

        if datos.get('contrasenia') == datos.get('contrasenia2'):
            # Encriptar la contraseña
            contrasenia_encriptada = self.encryption_controller.encrypt(password=datos.get('contrasenia'), action='encrypt')
            # Generar el código de empleado único
            codigo_empleado = generar_identificador_unico('A', datos.get('numero_dpi'), datos.get('nombre'))
            # Extraer los datos del formulario
            asistente_data = {
                'nombre': datos.get('nombre'),
                'telefono': datos.get('telefono'),
                'estado_civil': datos.get('estado_civil'),
                'genero': datos.get('genero'),
                'correo': datos.get('correo'),
                'codigo_usuario': codigo_empleado,
                'contrasenia': contrasenia_encriptada,
                'fecha_nacimiento': datos.get('fecha_nacimiento'),
                'direccion': datos.get('direccion'),
                'numero_dpi': datos.get('numero_dpi'),
                'numero_cuenta': datos.get('numero_cuenta'),
                'papeleria': object_url_papeleria
            }
            asistente = UserFactory.create_user('Asistente', **asistente_data)

            try:
                # Definir la consulta SQL y los parámetros
                query = """
                INSERT INTO Asistente (nombre, telefono, estado_civil, genero, correo, codigo_usuario, contrasenia, fecha_nacimiento, direccion, numero_dpi, numero_cuenta, papeleria)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                values = (
                    asistente.nombre,
                    asistente.telefono,
                    asistente.estado_civil,
                    asistente.genero,
                    asistente.correo,
                    asistente.codigo_usuario,
                    asistente.contrasenia,
                    asistente.fecha_nacimiento,
                    asistente.direccion,
                    asistente.numero_dpi,
                    asistente.numero_cuenta,
                    asistente.papeleria
                )
                # Ejecutar la consulta usando el singleton
                self.db.execute_query(query, values)
            except Exception as e:
                # Eliminar la imagen de S3 si ocurre un error
                self.s3_service.delete_object(filename_papeleria)
                raise Exception(f"Error al insertar asistente: {e}")

            try:
                # Registrar al asistente en Cognito
                self.cognito_service.register_user(asistente.correo, datos.get('contrasenia'), asistente.get_role())
            except Exception as e:
                # Eliminar la imagen de S3 si ocurre un error
                self.s3_service.delete_object(filename_papeleria)
                # Eliminar usuario segun su correo si ocurre un error
                self.db.execute_query("DELETE FROM Asistente WHERE correo = %s", (asistente.correo,))
                raise Exception(f"Error al insertar el asistente: {e}")
        else:
            raise BadRequestError('La contraseña no coincide con la confirmación.')

    def update_asistente(self, asistente_data):
        try:
            # Crear una lista de campos para actualizar
            update_fields = []
            update_values = []

            # Verificar si cada campo de asistente_data no es None y agregarlo a la lista
            if 'nombre' in asistente_data:
                update_fields.append("nombre = %s")
                update_values.append(asistente_data['nombre'])
            if 'telefono' in asistente_data:
                update_fields.append("telefono = %s")
                update_values.append(asistente_data['telefono'])
            if 'estado_civil' in asistente_data:
                update_fields.append("estado_civil = %s")
                update_values.append(asistente_data['estado_civil'])
            if 'fecha_nacimiento' in asistente_data:
                update_fields.append("fecha_nacimiento = %s")
                update_values.append(asistente_data['fecha_nacimiento'])
            if 'direccion' in asistente_data:
                update_fields.append("direccion = %s")
                update_values.append(asistente_data['direccion'])

            # Si no se proporcionan campos para actualizar, lanzar una excepción
            if not update_fields:
                raise Exception("No se proporcionaron campos para actualizar")

            # Definir la consulta SQL dinámica
            query = f"""
            UPDATE Asistente
            SET {', '.join(update_fields)}
            WHERE ASISTENTE_ID = %s
            """

            # Agregar el ID del asistente al final de la lista de valores
            update_values.append(asistente_data['asistente_id'])

            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, update_values)

        except Exception as e:
            raise Exception(f"Error al actualizar asistente: {e}")
