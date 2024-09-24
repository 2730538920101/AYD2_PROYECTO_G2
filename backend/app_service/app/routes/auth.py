from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from ..services.cognito_service import CognitoService  # Importar tu servicio de Cognito
from ..controllers.auth_controller import AuthController
from ..services.auth_service import AuthService  # Importar el AuthService
from ..controllers.encryption_controller import EncryptionController  # Importar el EncryptionController
from config import Config

# Inicializar el auth service
auth_service = AuthService()
# Inicializar el controlador de autenticación
auth_controller = AuthController()
# Inicializar AuthService y CognitoService
cognito_service = CognitoService()
# Inicializar el controlador de encriptación
encryption_controller = EncryptionController()

# Definir el Blueprint
bp = Blueprint('auth', __name__)

# Ruta para login
@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    validation = auth_controller.validate_user(email)
    email = validation[0]
    if email is not None:
        cognito_user_group_resp = cognito_service.get_user_group(email)
    if not cognito_user_group_resp:
        return jsonify({"error": "User grup undefined"}), 400
    
    db_password_resp = auth_controller.get_current_password(email, cognito_user_group_resp)
    if not db_password_resp:
        return jsonify({"error": "Can't get the password from database"}), 400
    
    db_validate_resp = encryption_controller.verify(password=password, hashed_password=db_password_resp)
    # Autenticar al usuario

    auth_response = cognito_service.authenticate_user(email, password)
    
    if auth_response and db_validate_resp:
        return jsonify({
            "message": "Login successful",
            "auth_result": auth_response
        }), 200
    else:
        return jsonify({"error": "Login failed"}), 401

# Ruta para confirmar registro de usuario
@bp.route('/confirm-signup', methods=['POST'])
def confirm_signup():
    data = request.get_json()
    email = data.get('email')
    confirmation_code = data.get('confirmation_code')

    if not email or not confirmation_code:
        return jsonify({"error": "Email and confirmation code are required"}), 400
    validation = auth_controller.validate_user(email)
    email = validation[0]
    if email is not None:
        # Confirmar registro del usuario
        response = cognito_service.validate_verification_code(email, confirmation_code)

    if response:
        return jsonify({"message": "Email confirmed successfully"}), 200
    else:
        return jsonify({"error": "Email confirmation failed"}), 400

# Ruta para verificar si un usuario ya está registrado
@bp.route('/check-user-exists', methods=['POST'])
def check_user_exists():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400
    validation = auth_controller.validate_user(email)
    email = validation[0]
    if email is not None:
        # Verificar si el usuario existe
        user_exists = cognito_service.user_exists(email)
    if user_exists:
        return jsonify({"message": "User exists"}), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Ruta para verificar si un usuario ya ha confirmado su registro
@bp.route('/is-user-confirmed', methods=['POST'])
def is_user_confirmed():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400
    validation = auth_controller.validate_user(email)
    email = validation[0]
    if email is not None:
        # Verificar si el usuario está confirmado
        is_confirmed = cognito_service.is_user_confirmed(email)

    if is_confirmed:
        return jsonify({"message": "User is confirmed"}), 200
    else:
        return jsonify({"error": "User is not confirmed"}), 400

# Ruta para recuperación de cuenta
@bp.route('/recover', methods=['POST'])
def recover_account():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({"error": "Email is required"}), 400
    validation = auth_controller.validate_user(email)
    email = validation[0]
    if email is not None:
        # Iniciar la recuperación de cuenta
        response = cognito_service.recover_account(email)
    
    if response:
        return jsonify({"message": "Recovery initiated"}), 200
    else:
        return jsonify({"error": "Recovery failed"}), 400

# Ruta para confirmar recuperación de cuenta
@bp.route('/confirm-recovery', methods=['POST'])
def confirm_recovery():
    data = request.get_json()
    email = data.get('email')
    confirmation_code = data.get('confirmation_code')
    new_password = data.get('new_password')

    if not email or not confirmation_code or not new_password:
        return jsonify({"error": "Email, confirmation code, and new password are required"}), 400
    validation = auth_controller.validate_user(email)
    email = validation[0]
    if email is not None:
        # Encriptar la nueva contraseña
        encrypted_new_password = encryption_controller.encrypt(password=new_password)
        # Actualizar la contraseña en la base de datos
        user_type = cognito_service.get_user_group(email)
    if not user_type:
        return jsonify({"error": "UserGroup not defined"}), 400
    db_response = auth_controller.change_password_in_db(email, encrypted_new_password, user_type)
    if not db_response:
        return jsonify({"error": "Password not updated in database"}), 400
    # Confirmar recuperación de cuenta
    response = cognito_service.confirm_recovery(email, confirmation_code, new_password)
    
    if response:
        return jsonify({"message": "Password recovery confirmed"}), 200
    else:
        return jsonify({"error": "Confirmation failed"}), 400


# Ruta para cambiar la contraseña
@bp.route('/change-password', methods=['POST'])
@auth_service.is_authorized(['AdminGroup', 'AssistantGroup', 'DriverGroup', 'ClientGroup'])
def change_password():
    data = request.get_json()
    email = data.get('email')
    old_password = data.get('old_password')
    new_password = data.get('new_password')
    user_type = data.get('user_type')

    if not email or not old_password or not new_password or not user_type:
        return jsonify({"error": "Email, old password, new password, and user type are required"}), 400
    validation = auth_controller.validate_user(email)
    email = validation[0]
    if email is not None:
        # Obtener la contraseña actual desde la base de datos
        current_hashed_password = auth_controller.get_current_password(email, user_type)
    # Verificar la contraseña antigua
    if not encryption_controller.verify(password=old_password, hashed_password=current_hashed_password):
        return jsonify({"error": "Old password is incorrect"}), 400

    # Encriptar la nueva contraseña
    encrypted_new_password = encryption_controller.encrypt(password=new_password)

    # Actualizar la contraseña en Cognito
    cognito_response = auth_controller.change_password_in_cognito(email, old_password, new_password)

    if not cognito_response:
        return jsonify({"error": "Failed to update password in Cognito"}), 400

    # Actualizar la contraseña en la base de datos
    db_response = auth_controller.change_password_in_db(email, encrypted_new_password, user_type)

    if db_response:
        return jsonify({"message": "Password updated successfully"}), 200
    else:
        return jsonify({"error": "Failed to update password in the database"}), 500