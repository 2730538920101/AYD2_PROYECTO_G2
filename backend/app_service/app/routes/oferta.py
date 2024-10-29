from flask import Blueprint, request, jsonify
from ..utils.funciones import BadRequestError
from ..controllers.ofertas_controller import OfertasController

# Definir el Blueprint
bp = Blueprint('ofertas', __name__)

# Inicializar el controlador
ofertas_controller = OfertasController()

# Ruta para obtener la oferta segun el cliente
@bp.route('/<int:cli_id>', methods=['GET'])
def obtener_oferta_cliente(cli_id):
    try:
        # Llamar al método del controlador para obtener la oferta segun el cliente
        oferta = ofertas_controller.get_oferta_cliente(cli_id)
        return jsonify(oferta), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para crear ofertas
@bp.route('/', methods=['POST'])
def crear_oferta():
    try:
        ofertas_controller.create_oferta(request)
        return jsonify({"mensaje": "Oferta creada exitosamente"}), 201
    except BadRequestError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500