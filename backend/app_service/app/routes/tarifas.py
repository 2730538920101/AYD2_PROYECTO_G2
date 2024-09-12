from flask import Blueprint, request, jsonify
import io
from ..models.adapter.reader_implementacion import CSVReaderImpl
from ..controllers.tarifas_controller import TarifaController

# Definir el Blueprint
bp = Blueprint('tarifas', __name__)

# Ruta para actualizar la tarifa con un CSV sin guardarlo temporalmente
@bp.route('/actualizar', methods=['POST'])
def actualizar_tarifa():
    # Verificar si se ha enviado un archivo en la solicitud
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    # Verificar si se ha seleccionado un archivo
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Procesar el archivo CSV directamente desde el flujo en memoria
    if file and file.filename.endswith('.csv'):
        # Convertir el archivo CSV en un flujo de texto
        stream = io.StringIO(file.stream.read().decode("UTF-8"))

        # Inicializar el CSVReader y el controlador de tarifas
        csv_reader = CSVReaderImpl()
        tarifa_controller = TarifaController(csv_reader)

        # Actualizar las tarifas en la base de datos
        result = tarifa_controller.actualizar_tarifas(stream)

        # Devolver el resultado de la operación
        return jsonify(result), 200 if 'message' in result else 500
    else:
        return jsonify({"error": "Invalid file format, only CSV is allowed"}), 400
