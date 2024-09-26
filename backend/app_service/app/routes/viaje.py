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