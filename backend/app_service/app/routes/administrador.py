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
