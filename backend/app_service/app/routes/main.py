from flask import Blueprint, jsonify

# Definir el Blueprint
bp = Blueprint('main', __name__)

# Ruta principal de la API
@bp.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Welcome to the Flask API!"})

# Otra ruta de ejemplo
@bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})
