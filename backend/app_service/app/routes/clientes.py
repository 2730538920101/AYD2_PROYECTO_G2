from flask import Blueprint, request, jsonify
import io
from werkzeug.utils import secure_filename
from ..controllers.clientes_controller import ClientesController
from ..controllers.encryption_controller import EncryptionController
from ..services.s3_service import S3Service
from ..services.cognito_service import CognitoService
from ..models.factory_method.factory import UserFactory
from config import Config

# Definir el Blueprint
bp = Blueprint('clientes', __name__)

# Inicializar el controlador y el servicio S3
clientes_controller = ClientesController()
# Inicializar el controlador del servicio proxy de encryptación
encryption_controller = EncryptionController() 
s3_service = S3Service()
cognito_service = CognitoService()

# Ruta para crear clientes
@bp.route('/crear', methods=['POST'])
def crear_clientes():
    # Verificar que el request contenga un archivo y datos JSON
    if 'foto_dpi' not in request.files or not request.form:
        return jsonify({'error': 'Faltan datos o archivo en la solicitud.'}), 400

    # Obtener los datos del formulario y el archivo
    datos = request.form
    archivo_foto_dpi = request.files['foto_dpi']
    
    # Validar archivo
    if archivo_foto_dpi.filename == '':
        return jsonify({'error': 'No se ha seleccionado ningún archivo.'}), 400

    # Procesar archivo de imagen
    try:
        # Guardar la imagen en S3
        filename = secure_filename(archivo_foto_dpi.filename)
        file_stream = io.BytesIO(archivo_foto_dpi.read())
        filename = "fotos_dpi_clientes/" + filename
        print(filename)
        object_url = s3_service.upload_object(file_stream, filename)
        
        if object_url is None:
            return jsonify({'error': 'Error al subir la imagen a S3.'}), 500
        
        if datos.get('contrasenia') == datos.get('contrasenia2'):
            # Encriptar la contraseña usando el EncryptionController
            contrasenia_encriptada = encryption_controller.encrypt(password=datos.get('contrasenia'), action='encrypt')
            print(f"Contraseña encriptada: {contrasenia_encriptada}")
            # Extraer los datos del formulario
            cliente_data = {
                'nombre': datos.get('nombre'),
                'fecha_nacimiento': datos.get('fecha_nacimiento'),
                'genero': datos.get('genero'),
                'correo': datos.get('correo'),
                'foto_dpi': object_url,
                'telefono': datos.get('telefono'),
                'contrasenia': contrasenia_encriptada,
                'pregunta': datos.get('pregunta'),
                'respuesta': datos.get('respuesta')
            }
            cliente = UserFactory.create_user('Cliente', **cliente_data)
            
            # Registrar el usuario en Cognito
            cognito_resp = cognito_service.register_user(cliente.correo, datos.get('contrasenia'), cliente.get_role())
            
            # Verificar si la respuesta de Cognito fue exitosa
            if cognito_resp and cognito_resp['ResponseMetadata']['HTTPStatusCode'] == 200:
                # Si el registro en Cognito es exitoso, proceder con la inserción en la base de datos
                clientes_controller.create_cliente(cliente)
                return jsonify({'mensaje': 'Cliente creado exitosamente.'}), 201
            else:
                # Si hubo un error en el registro de Cognito, devolver un error
                return jsonify({'error': 'Error al registrar el usuario en Cognito.'}), 500
        else:
            return jsonify({'error': 'La contraseña no coincide con la confirmación'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500