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

#* Ruta para actualizar un conductor
@bp.route('/actualizar/<int:con_id>', methods=['PUT'])
def actualizar_conductor(con_id):
    #* Verificamos si el conductor existe
    conductor = conductores_controller.get_conductor_by_id(con_id)
    if not conductor:
        return jsonify({'error': 'El conductor no existe.'}), 404
    
    # Obtener los datos del formulario y los archivos
    datos = request.form
    archivo_fotografia = request.files.get('fotografia')
    archivo_papeleria = request.files.get('papeleria')

    try:
        # Subir la nueva fotografía del vehículo a S3 si existe
        if archivo_fotografia:
            # Eliminar la antigua si existe
            if conductor['fotografia']:
                s3_service.delete_object(conductor['fotografia'].split('/')[-1])
            
            filename_fotografia = secure_filename(archivo_fotografia.filename)
            file_stream_fotografia = io.BytesIO(archivo_fotografia.read())
            filename_fotografia = "fotos_vehiculo_conductores/" + filename_fotografia
            object_url_fotografia = s3_service.upload_object(file_stream_fotografia, filename_fotografia)
        else:
            object_url_fotografia = conductor['fotografia']  # Mantener la antigua

        # Subir la nueva papelería (CV) a S3 si existe
        if archivo_papeleria:
            # Eliminar la antigua si existe
            if conductor['papeleria']:
                s3_service.delete_object(conductor['papeleria'].split('/')[-1])

            filename_papeleria = secure_filename(archivo_papeleria.filename)
            file_stream_papeleria = io.BytesIO(archivo_papeleria.read())
            filename_papeleria = "documento_cv_conductores/" + filename_papeleria
            object_url_papeleria = s3_service.upload_object(file_stream_papeleria, filename_papeleria)
        else:
            object_url_papeleria = conductor['papeleria']  # Mantener la antigua

        if not object_url_fotografia or not object_url_papeleria:
            return jsonify({'error': 'Error al subir los archivos a S3.'}), 500

        # Validar contraseñas solo si se proporcionan ambas
        if datos.get('contrasenia') and datos.get('contrasenia2'):
            if datos.get('contrasenia') == datos.get('contrasenia2'):
                # Encriptar la nueva contraseña
                contrasenia_encriptada = encryption_controller.encrypt(password=datos.get('contrasenia'), action='encrypt')
            else:
                return jsonify({'error': 'La contraseña no coincide con la confirmación'}), 400
        else:
            contrasenia_encriptada = conductor['contrasenia']  # Mantener la antigua

        # Actualizar solo los campos proporcionados
        conductor_data = {
            'nombre': datos.get('nombre', conductor['nombre']),
            'telefono': datos.get('telefono', conductor['telefono']),
            'estado_civil': datos.get('estado_civil', conductor['estado_civil']),
            'genero': datos.get('genero', conductor['genero']),
            'correo': datos.get('correo', conductor['correo']),
            'codigo_empleado': conductor['codigo_empleado'],  # No se cambia
            'contrasenia': contrasenia_encriptada,
            'fecha_nacimiento': datos.get('fecha_nacimiento', conductor['fecha_nacimiento']),
            'direccion': datos.get('direccion', conductor['direccion']),
            'numero_dpi': datos.get('numero_dpi', conductor['numero_dpi']),
            'numero_cuenta': datos.get('numero_cuenta', conductor['numero_cuenta']),
            'papeleria': object_url_papeleria,
            'fotografia': object_url_fotografia,
            'marca_vehiculo': datos.get('marca_vehiculo', conductor['marca_vehiculo']),
            'placa': datos.get('placa', conductor['placa']),
            'anio': datos.get('anio', conductor['anio']),
            'estado_informacion': datos.get('estado_informacion', conductor['estado_informacion'])
        }

        conductor_actualizado = UserFactory.create_user('Conductor', **conductor_data)

        # Actualizar en la base de datos
        conductores_controller.update_conductor(conductor_actualizado)
        return jsonify({'mensaje': 'Conductor actualizado exitosamente.'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
