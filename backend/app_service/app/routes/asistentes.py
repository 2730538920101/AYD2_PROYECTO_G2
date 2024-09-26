from flask import Blueprint, request, jsonify
from ..utils.funciones import BadRequestError
from ..controllers.asistentes_controller import AsistentesController

# Definir el Blueprint
bp = Blueprint('asistentes', __name__)

# Inicializar el controlador y el servicio S3
asistentes_controller = AsistentesController()

# Ruta para obtener todos los asistentes
@bp.route('/', methods=['GET'])
def obtener_asistentes():
    try:
        # Llamar al método del controlador para obtener todos los asistentes
        asistentes = asistentes_controller.get_asistentes()
        return jsonify(asistentes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para crear asistentes
@bp.route('/', methods=['POST'])
def crear_asistente():
    try:
        asistentes_controller.create_asistente(request)
        return jsonify({"mensaje": "Cliente creado exitosamente"}), 201
    except BadRequestError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para actualizar asistentes
@bp.route('/', methods=['PUT'])
def actualizar_asistente():
    try:

        # Obtener los datos del asistente desde el cuerpo de la solicitud
        asistente_data = request.get_json()

        # Verificar que se haya proporcionado el ID del asistente
        if 'asistente_id' not in asistente_data:
            return jsonify({"error": "El ID del asistente es obligatorio"}), 400

        # Llamar al método del controlador para actualizar el asistente
        asistentes_controller.update_asistente(asistente_data)

        return jsonify({"mensaje": "Asistente actualizado con éxito"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
