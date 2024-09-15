from flask import Blueprint, request, jsonify
import io
from werkzeug.utils import secure_filename
from ..controllers.asistentes_controller import AsistentesController
from ..controllers.encryption_controller import EncryptionController
from ..services.s3_service import S3Service
from ..services.cognito_service import CognitoService
from ..models.factory_method.factory import UserFactory
from ..utils.funciones import generar_identificador_unico
from config import Config

# Definir el Blueprint
bp = Blueprint('asistentes', __name__)

# Inicializar el controlador y el servicio S3
asistentes_controller = AsistentesController()
encryption_controller = EncryptionController()
s3_service = S3Service()
cognito_service = CognitoService()

# Ruta para crear asistentes
@bp.route('/crear', methods=['POST'])
def crear_asistente():
    # Verificar que el request contenga un archivo y datos JSON
    if 'papeleria' not in request.files or not request.form:
        return jsonify({'error': 'Faltan datos o archivo en la solicitud.'}), 400

    # Obtener los datos del formulario y el archivo
    datos = request.form
    archivo_papeleria = request.files['papeleria']

    # Validar archivo
    if archivo_papeleria.filename == '':
        return jsonify({'error': 'No se ha seleccionado ningún archivo.'}), 400

    try:
        # Subir la papelería (CV) a S3
        filename_papeleria = secure_filename(archivo_papeleria.filename)
        file_stream_papeleria = io.BytesIO(archivo_papeleria.read())
        filename_papeleria = "documento_cv_asistentes/" + filename_papeleria
        object_url_papeleria = s3_service.upload_object(file_stream_papeleria, filename_papeleria)

        if not object_url_papeleria:
            return jsonify({'error': 'Error al subir la papelería a S3.'}), 500

        if datos.get('contrasenia') == datos.get('contrasenia2'):
            # Encriptar la contraseña
            contrasenia_encriptada = encryption_controller.encrypt(password=datos.get('contrasenia'), action='encrypt')
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
                'papeleria': object_url_papeleria,
                'pregunta': datos.get('pregunta'),
                'respuesta': datos.get('respuesta'),
                'estado': datos.get('estado')
            }
            asistente = UserFactory.create_user('Asistente', **asistente_data)

            # Registrar al asistente en Cognito
            cognito_resp = cognito_service.register_user(asistente.correo, datos.get('contrasenia'), asistente.get_role())

            if cognito_resp and cognito_resp['ResponseMetadata']['HTTPStatusCode'] == 200:
                # Insertar en la base de datos
                asistentes_controller.create_asistente(asistente)
                return jsonify({'mensaje': 'Asistente creado exitosamente.'}), 201
            else:
                return jsonify({'error': 'Error al registrar el usuario en Cognito.'}), 500
        else:
            return jsonify({'error': 'La contraseña no coincide con la confirmación'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500
