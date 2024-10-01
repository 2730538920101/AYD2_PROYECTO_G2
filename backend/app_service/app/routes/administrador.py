from flask import Blueprint, request, jsonify
import io
from werkzeug.utils import secure_filename
from ..controllers.administrador_controller import AdministradorController
from ..controllers.encryption_controller import EncryptionController
from ..services.s3_service import S3Service
from ..services.cognito_service import CognitoService
from ..services.auth_service import AuthService  # Importar el AuthService
from ..models.factory_method.factory import UserFactory
from config import Config

# Definir el Blueprint
bp = Blueprint('administrador', __name__)

# Inicializar el controlador y el servicio S3
administrador_controller = AdministradorController()
# Inicializar el controlador del servicio proxy de encryptación
encryption_controller = EncryptionController() 
s3_service = S3Service()
cognito_service = CognitoService()
auth_service = AuthService()


# Ruta para validar el contenido de un archivo
@bp.route('/validate-file', methods=['POST'])
@auth_service.is_authorized(['AdminGroup'])
def validate_file():
    # Asegurarse de que se recibió un archivo en el formulario
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    # Comprobar si el archivo tiene un nombre
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Leer el contenido del archivo
    file_content = file.read().decode('utf-8')

    # Obtener el usuario del cuerpo de la solicitud
    data = request.form
    usuario = data.get('usuario')

    if not usuario:
        return jsonify({"error": "User is required"}), 400

    # Validar el contenido del archivo con el texto almacenado
    validacion_texto = administrador_controller.obtener_validacion(usuario)

    if validacion_texto and file_content.strip() == validacion_texto.strip():
        return jsonify({"message": "Validation successful"}), 200
    else:
        return jsonify({"error": "Validation failed"}), 400

# Ruta para bloquear una cuenta
@bp.route('/block-account', methods=['POST'])
@auth_service.is_authorized(['AdminGroup'])
def block_account():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Bloquear cuenta
    response = cognito_service.block_account(email)
    
    if response:
        return jsonify({"message": "Account blocked successfully"}), 200
    else:
        return jsonify({"error": "Failed to block account"}), 400

# Ruta para desbloquear una cuenta
@bp.route('/unblock-account', methods=['POST'])
@auth_service.is_authorized(['AdminGroup'])
def unblock_account():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Desbloquear cuenta
    response = cognito_service.unblock_account(email)
    
    if response:
        return jsonify({"message": "Account unblocked successfully"}), 200
    else:
        return jsonify({"error": "Failed to unblock account"}), 400
