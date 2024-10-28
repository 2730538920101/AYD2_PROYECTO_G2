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

# Ruta para obtener conductores pendientes de confirmar
@bp.route('/pendientes', methods=['GET'])
def obtener_conductores_pendientes():
    try:
        # Llamar al método del controlador para obtener los conductores pendientes
        conductores_pendientes = conductores_controller.get_conductores_pendientes()
        return jsonify(conductores_pendientes), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para modificar el estado de informacion de un conductor
@bp.route('/actualizar-estado', methods=['PUT'])
def modificar_estado_informacion():
    try:
        # Obtener el ID del conductor a modificar
        con_id = request.json.get('con_id', None)
        if not con_id:
            return jsonify({'error': 'Falta el ID del conductor'}), 400
        # Obtener el estado del conductor
        estado_informacion = request.json.get('estado_informacion', None)
        if not estado_informacion:
            return jsonify({'error': 'Falta el estado de información del conductor'}), 400
        # Llamar al método del controlador para calificar al cliente
        conductores_controller.update_estado_informacion(con_id, estado_informacion)
        return jsonify({'mensaje': 'Estado de información del conductor actualizado exitosamente'}), 200
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

#* Ruta para realizar una solicitud de cambio de información
@bp.route('/solicitud-cambio/<int:con_id>', methods=['PUT'])
def crear_solicitud_cambio_informacion(con_id):
    try:
        # Llamar al método del controlador para crear una solicitud de cambio de información
        conductores_controller.create_solicitud_cambio_informacion(con_id, request)
        return jsonify({'mensaje': 'Solicitud de cambio de información creada exitosamente'}), 201
    except BadRequestError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500