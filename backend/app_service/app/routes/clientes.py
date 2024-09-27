from flask import Blueprint, request, jsonify
from ..utils.funciones import BadRequestError
from ..controllers.clientes_controller import ClientesController

# Definir el Blueprint
bp = Blueprint('clientes', __name__)

# Inicializar el controlador y el servicio S3
clientes_controller = ClientesController()

# Ruta para obtener todos los clientes
@bp.route('/', methods=['GET'])
def obtener_clientes():
    try:
        # Llamar al método del controlador para obtener todos los clientes
        clientes = clientes_controller.get_clientes()
        return jsonify(clientes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para crear clientes
@bp.route('/', methods=['POST'])
def crear_clientes():
    try:
        clientes_controller.create_cliente(request)
        return jsonify({"mensaje": "Cliente creado exitosamente"}), 201
    except BadRequestError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para actualizar clientes
@bp.route('/', methods=['PUT'])
def actualizar_cliente():
    try:

        # Obtener los datos del cliente desde el cuerpo de la solicitud
        cliente_data = request.get_json()

        # Verificar que se haya proporcionado el ID del cliente
        if 'cli_id' not in cliente_data:
            return jsonify({"error": "El ID del cliente es obligatorio"}), 400

        # Llamar al método del controlador para actualizar el cliente
        clientes_controller.update_cliente(cliente_data)

        return jsonify({"mensaje": "Cliente actualizado con éxito"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para obtener un cliente por su ID   
@bp.route('/<int:cli_id>', methods=['GET'])
def obtener_cliente(cli_id):
    try:
        # Llamar al método del controlador para obtener un cliente por su ID
        cliente = clientes_controller.get_cliente_by_id(cli_id)
        return jsonify(cliente), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500