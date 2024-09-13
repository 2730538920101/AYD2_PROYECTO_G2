from flask import Blueprint, request, jsonify
import io
from werkzeug.utils import secure_filename
from ..controllers.asistentes_controller import AsistentesController
from ..controllers.encryption_controller import EncryptionController
from ..services.s3_service import S3Service
from ..services.cognito_service import CognitoService
from ..models.factory_method.factory import UserFactory
from config import Config

# Definir el Blueprint
bp = Blueprint('asistentes', __name__)

# Inicializar el controlador y el servicio S3
asistentes_controller = AsistentesController()
# Inicializar el controlador del servicio proxy de encryptación
encryption_controller = EncryptionController() 
s3_service = S3Service()
cognito_service = CognitoService()

# Ruta para crear clientes
@bp.route('/crear', methods=['POST'])
def crear_asistente():
    pass