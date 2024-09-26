from flask import Blueprint, request, jsonify
from ..controllers.viaje_controller import ViajeController

# Definir el Blueprint
bp = Blueprint('viajes', __name__)

# Inicializar el controlador
viaje_controller = ViajeController()

# Ruta para obtener todos los viajes
@bp.route('/', methods=['GET'])
def obtener_viajes():
    try:
        # Llamar al método del controlador para obtener todos los viajes
        viajes = viaje_controller.get_viajes()
        return jsonify(viajes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Ruta para crear un nuevo viaje
@bp.route('/crear', methods=['POST'])
def crear_viaje():
    # Verificar que el request contenga datos JSON
    if not request.json:
        return jsonify({'error': 'Faltan datos en la solicitud.'}), 400

    # Obtener los datos del JSON
    viaje_data = request.json
    print("viaje_data: ",viaje_data)

    # Llamar al método del controlador para crear un nuevo viaje
    try:
        viaje_controller.create_viaje(viaje_data)
        return jsonify({'message': 'Viaje creado exitosamente'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#TODO: Pendiente de revision
# Ruta para verificar si el cliente tiene historial de viajes
@bp.route('/historial/<int:cliente_id>', methods=['GET'])
def verificar_historial_cliente(cliente_id):
    try:
        # Llamar al método del controlador para verificar el historial del cliente
        resultado = viaje_controller.verificar_historial_cliente(cliente_id)
        return jsonify(resultado), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener los viajes pendientes (sin conductor asignado)
@bp.route('/pendientes', methods=['GET'])
def get_viajes_pendientes():
    try:
        # Llamar al método del controlador para obtener los viajes pendientes
        viajes_pendientes = viaje_controller.get_viajes_pendientes()
        return jsonify(viajes_pendientes), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#TODO: Pendiente de revision
#* Ruta para obtener los viajes frecuentes de un cliente
@bp.route('/frecuentes/<int:cliente_id>', methods=['GET'])
def get_viajes_frecuentes(cliente_id):
    try:
        # Llamar al método del controlador para obtener los viajes frecuentes
        viajes_frecuentes = viaje_controller.get_historial_viajes_frecuentes(cliente_id)
        return jsonify(viajes_frecuentes), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
