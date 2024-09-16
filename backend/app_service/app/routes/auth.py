from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from cognito_service import CognitoService  # Importar tu servicio de Cognito
from config import Config

# Inicializar CognitoService
cognito_service = CognitoService()

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

    # Autenticar al usuario
    auth_response = cognito_service.authenticate_user(email, password)
    
    if auth_response:
        return jsonify({
            "message": "Login successful",
            "auth_result": auth_response['AuthenticationResult']
        }), 200
    else:
        return jsonify({"error": "Login failed"}), 401

# Ruta para recuperación de cuenta
@bp.route('/recover', methods=['POST'])
def recover_account():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({"error": "Email is required"}), 400

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

    # Confirmar recuperación de cuenta
    response = cognito_service.confirm_recovery(email, confirmation_code, new_password)
    
    if response:
        return jsonify({"message": "Password recovery confirmed"}), 200
    else:
        return jsonify({"error": "Confirmation failed"}), 400

# Ruta para cambiar contraseña
@bp.route('/change-password', methods=['POST'])
def change_password():
    data = request.get_json()
    email = data.get('email')
    previous_password = data.get('previous_password')
    new_password = data.get('new_password')

    if not email or not previous_password or not new_password:
        return jsonify({"error": "Email, previous password, and new password are required"}), 400

    # Cambiar contraseña
    response = cognito_service.change_password(email, previous_password, new_password)
    
    if response:
        return jsonify({"message": "Password changed successfully"}), 200
    else:
        return jsonify({"error": "Password change failed"}), 400

# Ruta para bloquear una cuenta
@bp.route('/block-account', methods=['POST'])
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

