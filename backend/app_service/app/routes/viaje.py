from flask import Blueprint, request, jsonify
from ..controllers.viaje_controller import ViajeController

# Definir el Blueprint
bp = Blueprint('viajes', __name__)
NUMERO_VIAJES_FRECUENTES = 1
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
        viajes_frecuentes = viaje_controller.get_historial_viajes_frecuentes(cliente_id, NUMERO_VIAJES_FRECUENTES)
        return jsonify(viajes_frecuentes), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
#* Ruta para aceptar un viaje (conductor)
@bp.route('/aceptar', methods=['PUT'])
def aceptar_viaje():
    try:
        # Obtener el ID del viaje a aceptar
        viaje_id = request.json.get('viaje_id', None)
        if not viaje_id:
            return jsonify({'error': 'Falta el ID del viaje'}), 400
        # Obtener el ID del conductor
        conductor_id = request.json.get('conductor_id', None)
        if not conductor_id:
            return jsonify({'error': 'Falta el ID del conductor'}), 400

        # Llamar al método del controlador para aceptar el viaje
        viaje_controller.aceptar_viaje(viaje_id, conductor_id)
        return jsonify({'message': 'Viaje aceptado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#* Ruta para cancelar un viaje (cliente)
@bp.route('/cancelar', methods=['PUT'])
def cancelar_viaje():
    try:
        # Obtener el ID del viaje a cancelar
        viaje_id = request.json.get('viaje_id', None)
        if not viaje_id:
            return jsonify({'error': 'Falta el ID del viaje'}), 400
        razon_cancelacion = request.json.get('razon_cancelacion', None)
        if not razon_cancelacion:
            return jsonify({'error': 'Falta la razón de la cancelación'}), 400

        # Llamar al método del controlador para cancelar el viaje
        viaje_controller.cancelar_viaje(viaje_id, razon_cancelacion)
        return jsonify({'message': 'Viaje cancelado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}),

#* Ruta para modificar el estado del viaje a "EN CURSO" (conductor)
@bp.route('/en_curso', methods=['PUT'])
def en_curso():
    try:
        # Obtener el ID del viaje a modificar
        viaje_id = request.json.get('viaje_id', None)
        if not viaje_id:
            return jsonify({'error': 'Falta el ID del viaje'}), 400

        # Llamar al método del controlador para modificar el estado del viaje
        viaje_controller.iniciar_viaje(viaje_id)
        return jsonify({'message': 'Viaje en curso'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
#* Ruta para modificar el estado del viaje a "FINALIZADO" (conductor)
@bp.route('/finalizar', methods=['PUT'])
def finalizar():
    try:
        # Obtener el ID del viaje a modificar
        viaje_id = request.json.get('viaje_id', None)
        if not viaje_id:
            return jsonify({'error': 'Falta el ID del viaje'}), 400

        # Llamar al método del controlador para modificar el estado del viaje
        viaje_controller.finalizar_viaje(viaje_id)
        return jsonify({'message': 'Viaje finalizado'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500