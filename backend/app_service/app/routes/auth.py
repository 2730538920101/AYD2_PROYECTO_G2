from flask import Blueprint, jsonify

# Definir el Blueprint
bp = Blueprint('auth', __name__)

# Ruta principal de la API
@bp.route('/login', methods=['POST'])
def index():
    return jsonify({"message": "Welcome to the Flask API!"})