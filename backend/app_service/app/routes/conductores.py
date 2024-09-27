from flask import Blueprint, request, jsonify
import io
from werkzeug.utils import secure_filename
from ..controllers.conductores_controller import ConductoresController
from ..controllers.encryption_controller import EncryptionController
from ..services.s3_service import S3Service
from ..services.cognito_service import CognitoService
from ..models.factory_method.factory import UserFactory
from ..utils.funciones import generar_identificador_unico
from config import Config

# Definir el Blueprint
bp = Blueprint('conductores', __name__)

# Inicializar el controlador y el servicio S3
conductores_controller = ConductoresController()
# Inicializar el controlador del servicio proxy de encryptación
encryption_controller = EncryptionController()
s3_service = S3Service()
cognito_service = CognitoService()

# Ruta para obtener todos los conductores
@bp.route('/', methods=['GET'])
def obtener_conductores():
    try:
        # Llamar al método del controlador para obtener todos los conductores
        conductores = conductores_controller.get_conductores()
        return jsonify(conductores), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para crear conductores
@bp.route('/crear', methods=['POST'])
def crear_conductor():
    # Verificar que el request contenga archivos y datos JSON
    if 'fotografia' not in request.files or 'papeleria' not in request.files or not request.form:
        return jsonify({'error': 'Faltan datos o archivos en la solicitud.'}), 400

    # Obtener los datos del formulario y los archivos
    datos = request.form
    archivo_fotografia = request.files['fotografia']
    archivo_papeleria = request.files['papeleria']

    # Validar archivos
    if archivo_fotografia.filename == '' or archivo_papeleria.filename == '':
        return jsonify({'error': 'No se ha seleccionado algún archivo.'}), 400

    try:
        # Subir la fotografía del vehículo a S3
        filename_fotografia = secure_filename(archivo_fotografia.filename)
        file_stream_fotografia = io.BytesIO(archivo_fotografia.read())
        filename_fotografia = "fotos_vehiculo_conductores/" + filename_fotografia
        object_url_fotografia = s3_service.upload_object(file_stream_fotografia, filename_fotografia)

        # Subir la papelería (CV) a S3
        filename_papeleria = secure_filename(archivo_papeleria.filename)
        file_stream_papeleria = io.BytesIO(archivo_papeleria.read())
        filename_papeleria = "documento_cv_conductores/" + filename_papeleria
        object_url_papeleria = s3_service.upload_object(file_stream_papeleria, filename_papeleria)

        if not object_url_fotografia or not object_url_papeleria:
            return jsonify({'error': 'Error al subir los archivos a S3.'}), 500

        if datos.get('contrasenia') == datos.get('contrasenia2'):
            # Encriptar la contraseña
            contrasenia_encriptada = encryption_controller.encrypt(password=datos.get('contrasenia'), action='encrypt')
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

            # Registrar al conductor en Cognito
            cognito_resp = cognito_service.register_user(conductor.correo, datos.get('contrasenia'), conductor.get_role())

            if cognito_resp and cognito_resp['ResponseMetadata']['HTTPStatusCode'] == 200:
                # Insertar en la base de datos
                conductores_controller.create_conductor(conductor)
                return jsonify({'mensaje': 'Conductor creado exitosamente.'}), 201
            else:
                return jsonify({'error': 'Error al registrar el usuario en Cognito.'}), 500
        else:
            return jsonify({'error': 'La contraseña no coincide con la confirmación'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

#* Ruta para obtener un conductor por su ID
@bp.route('/<int:con_id>', methods=['GET'])
def obtener_conductor_por_id(con_id):
    try:
        # Llamar al método del controlador para obtener un conductor por su ID
        conductor = conductores_controller.get_conductor_by_id(con_id)
        return jsonify(conductor), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#* Ruta para actualizar un conductor
@bp.route('/actualizar/<int:con_id>', methods=['PUT'])
def actualizar_conductor(con_id):
    #* Verificamos si el conductor existe
    conductor = conductores_controller.get_conductor_by_id(con_id)
    if not conductor:
        return jsonify({'error': 'El conductor no existe.'}), 404
    
    # Obtener los datos del formulario y los archivos
    datos = request.form
    archivo_fotografia = request.files.get('fotografia')
    archivo_papeleria = request.files.get('papeleria')

    try:
        # Subir la nueva fotografía del vehículo a S3 si existe
        if archivo_fotografia:
            # Eliminar la antigua si existe
            if conductor['fotografia']:
                s3_service.delete_object(conductor['fotografia'].split('/')[-1])
            
            filename_fotografia = secure_filename(archivo_fotografia.filename)
            file_stream_fotografia = io.BytesIO(archivo_fotografia.read())
            filename_fotografia = "fotos_vehiculo_conductores/" + filename_fotografia
            object_url_fotografia = s3_service.upload_object(file_stream_fotografia, filename_fotografia)
        else:
            object_url_fotografia = conductor['fotografia']  # Mantener la antigua

        # Subir la nueva papelería (CV) a S3 si existe
        if archivo_papeleria:
            # Eliminar la antigua si existe
            if conductor['papeleria']:
                s3_service.delete_object(conductor['papeleria'].split('/')[-1])

            filename_papeleria = secure_filename(archivo_papeleria.filename)
            file_stream_papeleria = io.BytesIO(archivo_papeleria.read())
            filename_papeleria = "documento_cv_conductores/" + filename_papeleria
            object_url_papeleria = s3_service.upload_object(file_stream_papeleria, filename_papeleria)
        else:
            object_url_papeleria = conductor['papeleria']  # Mantener la antigua

        if not object_url_fotografia or not object_url_papeleria:
            return jsonify({'error': 'Error al subir los archivos a S3.'}), 500

        # Validar contraseñas solo si se proporcionan ambas
        if datos.get('contrasenia') and datos.get('contrasenia2'):
            if datos.get('contrasenia') == datos.get('contrasenia2'):
                # Encriptar la nueva contraseña
                contrasenia_encriptada = encryption_controller.encrypt(password=datos.get('contrasenia'), action='encrypt')
            else:
                return jsonify({'error': 'La contraseña no coincide con la confirmación'}), 400
        else:
            contrasenia_encriptada = conductor['contrasenia']  # Mantener la antigua

        # Actualizar solo los campos proporcionados
        conductor_data = {
            'nombre': datos.get('nombre', conductor['nombre']),
            'telefono': datos.get('telefono', conductor['telefono']),
            'estado_civil': datos.get('estado_civil', conductor['estado_civil']),
            'genero': datos.get('genero', conductor['genero']),
            'correo': datos.get('correo', conductor['correo']),
            'codigo_empleado': conductor['codigo_empleado'],  # No se cambia
            'contrasenia': contrasenia_encriptada,
            'fecha_nacimiento': datos.get('fecha_nacimiento', conductor['fecha_nacimiento']),
            'direccion': datos.get('direccion', conductor['direccion']),
            'numero_dpi': datos.get('numero_dpi', conductor['numero_dpi']),
            'numero_cuenta': datos.get('numero_cuenta', conductor['numero_cuenta']),
            'papeleria': object_url_papeleria,
            'fotografia': object_url_fotografia,
            'marca_vehiculo': datos.get('marca_vehiculo', conductor['marca_vehiculo']),
            'placa': datos.get('placa', conductor['placa']),
            'anio': datos.get('anio', conductor['anio']),
            'estado_informacion': datos.get('estado_informacion', conductor['estado_informacion'])
        }

        conductor_actualizado = UserFactory.create_user('Conductor', **conductor_data)

        # Actualizar en la base de datos
        conductores_controller.update_conductor(conductor_actualizado)
        return jsonify({'mensaje': 'Conductor actualizado exitosamente.'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
