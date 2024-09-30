from flask import Blueprint, request, jsonify
from ..utils.funciones import BadRequestError
from ..controllers.conductores_controller import ConductoresController

# Definir el Blueprint
bp = Blueprint('conductores', __name__)

# Inicializar el controlador
conductores_controller = ConductoresController()

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
@bp.route('/', methods=['POST'])
def crear_conductor():
    try:
        conductores_controller.create_conductor(request)
        return jsonify({"mensaje": "Conductor creado exitosamente"}), 201
    except BadRequestError as e:
        return jsonify({"error": str(e)}), 400
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
