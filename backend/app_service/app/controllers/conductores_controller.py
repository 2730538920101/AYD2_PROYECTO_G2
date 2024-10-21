import io
from ..controllers.encryption_controller import EncryptionController
from ..models.singleton.singleton import MySQLSingleton
from ..services.s3_service import S3Service
from ..services.cognito_service import CognitoService
from ..models.factory_method.factory import UserFactory
from ..utils.funciones import BadRequestError, generar_identificador_unico
from werkzeug.utils import secure_filename
from datetime import datetime

class ConductoresController:

    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton()
        # Inicializar controladores y servicios
        self.encryption_controller = EncryptionController()
        self.s3_service = S3Service()
        self.cognito_service = CognitoService()

    def get_conductores(self):
        try:
            # Definir la consulta SQL
            query = """ SELECT c.CON_ID, c.NOMBRE, c.TELEFONO, c.ESTADO_CIVIL, c.GENERO, c.CORREO, c.CODIGO_EMPLEADO, c.FECHA_NACIMIENTO, 
                    c.DIRECCION, c.NUMERO_DPI, c.PAPELERIA, c.FOTOGRAFIA, c.MARCA_VEHICULO, c.PLACA, c.ANIO, c.ESTADO_INFORMACION, IFNULL(AVG(v.CALIFICACION_CONDUCTOR),0) AS CALIFICACION
                    FROM Conductor c
                    LEFT JOIN Viaje v ON c.CON_ID = v.CONDUCTOR_CON_ID 
                    GROUP BY c.CON_ID"""

            # Ejecutar la consulta usando el singleton
            conductor_rows = self.db.fetch_all(query, [])

            # Convertir los resultados a una lista de diccionarios
            conductores = []
            for row in conductor_rows:
                conductor = {
                    "con_id": row[0],
                    "nombre": row[1],
                    "telefono": row[2],
                    "estado_civil": row[3],
                    "genero": row[4],
                    "correo": row[5],
                    "codigo_empleado": row[6],
                    "fecha_nacimiento": row[7].strftime("%d/%m/%Y"),
                    "direccion": row[8],
                    "numero_dpi": row[9],
                    "papeleria": row[10],
                    "fotografia": row[11],
                    "marca_vehiculo": row[12],
                    "placa": row[13],
                    "anio": row[14],
                    "estado_informacion": row[15],
                    "calificacion": int(row[16])
                }
                conductores.append(conductor)

            # Retornar los resultados
            return conductores

        except Exception as e:
            raise Exception(f"Error al obtener conductores: {e}")

    def create_conductor(self, request):

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
        if 'contrasenia2' not in request.form:
            raise BadRequestError('Falta la confirmación de la contraseña.')
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
        if 'fotografia' not in request.files:
            raise BadRequestError('Falta la fotografía.')
        if 'marca_vehiculo' not in request.form:
            raise BadRequestError('Falta la marca del vehículo.')
        if 'placa' not in request.form:
            raise BadRequestError('Falta la placa del vehículo.')
        if 'anio' not in request.form:
            raise BadRequestError('Falta el año del vehículo.')
        if 'estado_informacion' not in request.form:
            raise BadRequestError('Falta el estado de la información.')

        # Obtener los datos del formulario y los archivos
        datos = request.form
        archivo_fotografia = request.files['fotografia']
        archivo_papeleria = request.files['papeleria']

        # Validar archivos
        if archivo_fotografia.filename == '':
            raise BadRequestError('Falta la fotografía.')
        if archivo_papeleria.filename == '':
            raise BadRequestError('Falta la papelería.')

        # Subir la fotografía del vehículo a S3
        filename_fotografia = secure_filename(archivo_fotografia.filename)
        file_stream_fotografia = io.BytesIO(archivo_fotografia.read())
        filename_fotografia = f"fotos_vehiculo_conductores/{str(datetime.now().strftime('%Y%m%d%H%M%S'))}_{filename_fotografia}"
        object_url_fotografia = self.s3_service.upload_object(file_stream_fotografia, filename_fotografia)
        if not object_url_fotografia:
            raise Exception('Error al subir la fotografia a S3.')

        # Subir la papelería (CV) a S3
        filename_papeleria = secure_filename(archivo_papeleria.filename)
        file_stream_papeleria = io.BytesIO(archivo_papeleria.read())
        filename_papeleria = f"documento_cv_conductores/{str(datetime.now().strftime('%Y%m%d%H%M%S'))}_{filename_papeleria}"
        object_url_papeleria = self.s3_service.upload_object(file_stream_papeleria, filename_papeleria)
        if not object_url_papeleria:
            raise Exception('Error al subir la papeleria a S3.')

        if datos.get('contrasenia') == datos.get('contrasenia2'):
            # Encriptar la contraseña
            contrasenia_encriptada = self.encryption_controller.encrypt(password=datos.get('contrasenia'), action='encrypt')
            # Generar el código de empleado único
            codigo_empleado = generar_identificador_unico( 'C', datos.get('numero_dpi'),datos.get('nombre'))
            # Extraer los datos del formulario
            conductor_data = {
                'nombre': datos.get('nombre'),
                'telefono': datos.get('telefono'),
                'estado_civil': datos.get('estado_civil'),
                'genero': datos.get('genero'),
                'correo': datos.get('correo'),
                'codigo_empleado': codigo_empleado,
                'contrasenia': contrasenia_encriptada,
                'fecha_nacimiento': datos.get('fecha_nacimiento'),
                'direccion': datos.get('direccion'),
                'numero_dpi': datos.get('numero_dpi'),
                'numero_cuenta': datos.get('numero_cuenta'),
                'papeleria': object_url_papeleria,
                'fotografia': object_url_fotografia,
                'marca_vehiculo': datos.get('marca_vehiculo'),
                'placa': datos.get('placa'),
                'anio': datos.get('anio'),
                'estado_informacion': datos.get('estado_informacion')
            }
            conductor = UserFactory.create_user('Conductor', **conductor_data)

            try:
                # Definir la consulta SQL y los parámetros
                query = """
                INSERT INTO Conductor (nombre, telefono, estado_civil, genero, correo, codigo_empleado, contrasenia, fecha_nacimiento, direccion, numero_dpi, numero_cuenta, papeleria, fotografia, marca_vehiculo, placa, anio, estado_informacion)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                values = (
                    conductor.nombre,
                    conductor.telefono,
                    conductor.estado_civil,
                    conductor.genero,
                    conductor.correo,
                    conductor.codigo_empleado,
                    conductor.contrasenia,
                    conductor.fecha_nacimiento,
                    conductor.direccion,
                    conductor.numero_dpi,
                    conductor.numero_cuenta,
                    conductor.papeleria,
                    conductor.fotografia,
                    conductor.marca_vehiculo,
                    conductor.placa,
                    conductor.anio,
                    conductor.estado_informacion
                )
                # Ejecutar la consulta usando el singleton
                self.db.execute_query(query, values)
            except Exception as e:
                # Eliminar los archivos del S3 si ocurre un error
                self.s3_service.delete_object(filename_fotografia)
                self.s3_service.delete_object(filename_papeleria)
                raise Exception(f"Error al insertar conductor: {e}")

            try:
                # Registrar al conductor en Cognito
                self.cognito_service.register_user(conductor.correo, datos.get('contrasenia'), conductor.get_role())
            except Exception as e:
                # Eliminar los archivos del S3 si ocurre un error
                self.s3_service.delete_object(filename_fotografia)
                self.s3_service.delete_object(filename_papeleria)
                # Eliminar usuario segun su correo si ocurre un error
                self.db.execute_query("DELETE FROM Conductor WHERE correo = %s", (conductor.correo,))
                raise Exception(f"Error al insertar el conductor: {e}")
        else:
            raise BadRequestError('La contraseña no coincide con la confirmación.')

    #*Metodo para obtener un conductor por su ID
    def get_conductor_by_id(self, con_id):
        try:
            # Definir la consulta SQL
            query = """ SELECT c.CON_ID, c.NOMBRE, c.TELEFONO, c.ESTADO_CIVIL, c.GENERO, c.CORREO, c.CODIGO_EMPLEADO, c.FECHA_NACIMIENTO, 
                        c.DIRECCION, c.NUMERO_DPI, c.PAPELERIA, c.FOTOGRAFIA, c.MARCA_VEHICULO, c.PLACA, c.ANIO, c.ESTADO_INFORMACION, IFNULL(AVG(v.CALIFICACION_CONDUCTOR),0) AS CALIFICACION
                        FROM Conductor c
                        LEFT JOIN Viaje v ON c.CON_ID = v.CONDUCTOR_CON_ID 
                        WHERE c.CON_ID = %s
                        GROUP BY c.CON_ID
                        """

            # Ejecutar la consulta usando el singleton
            conductor_row = self.db.fetch_one(query, [con_id])

            # Convertir los resultados a un diccionario
            conductor = {
                "con_id": conductor_row[0],
                "nombre": conductor_row[1],
                "telefono": conductor_row[2],
                "estado_civil": conductor_row[3],
                "genero": conductor_row[4],
                "correo": conductor_row[5],
                "codigo_empleado": conductor_row[6],
                "fecha_nacimiento": conductor_row[7].strftime("%d/%m/%Y"),
                "direccion": conductor_row[8],
                "numero_dpi": conductor_row[9],
                "papeleria": conductor_row[10],
                "fotografia": conductor_row[11],
                "marca_vehiculo": conductor_row[12],
                "placa": conductor_row[13],
                "anio": conductor_row[14],
                "estado_informacion": conductor_row[15],
                "calificacion": int(conductor_row[16])
            }

            # Retornar los resultados
            return conductor

        except Exception as e:
            raise Exception(f"Error al obtener conductor: {e}")
        
    #* Metodo para actualizar un conductor
    def update_conductor(self, conductor_data):
        try:
            # Definir la consulta SQL y los parámetros
            query = """
            UPDATE Conductor
            SET nombre = %s, telefono = %s, estado_civil = %s, genero = %s, correo = %s, fecha_nacimiento = %s, direccion = %s, numero_dpi = %s, numero_cuenta = %s, papeleria = %s, fotografia = %s, marca_vehiculo = %s, placa = %s, anio = %s, estado_informacion = %s
            WHERE CON_ID = %s
            """
            values = (
                conductor_data.nombre,
                conductor_data.telefono,
                conductor_data.estado_civil,
                conductor_data.genero,
                conductor_data.correo,
                conductor_data.fecha_nacimiento,
                conductor_data.direccion,
                conductor_data.numero_dpi,
                conductor_data.numero_cuenta,
                conductor_data.papeleria,
                conductor_data.fotografia,
                conductor_data.marca_vehiculo,
                conductor_data.placa,
                conductor_data.anio,
                conductor_data.estado_informacion,
                conductor_data.con_id
            )  
            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, values)
        except Error as e:
            raise Exception(f"Error al actualizar conductor: {e}")
        
    #* Metodo para saber si un conductor existe
    def exists_conductor(self, con_id):
        try:
            # Definir la consulta SQL
            query = "SELECT CON_ID FROM Conductor WHERE CON_ID = %s"
            # Ejecutar la consulta
            result = self.db.fetch_one(query, [con_id])
            # Retornar True si el conductor existe
            return result is not None
        except Error as e:
            raise Exception(f"Error al verificar la existencia del conductor: {e}")
        
