def generar_identificador_unico(tipo_usuario, dpi, nombre):
    """
    Genera un identificador único para un usuario.

    :param tipo_usuario: Tipo de usuario ('Asistente' o 'Conductor')
    :param telefono: Número de teléfono del usuario
    :param nombre: Nombre del usuario
    :return: Identificador único
    """

    # Eliminar espacios al principio y al final del nombre
    nombre_limpio = nombre.strip()

    # Extraer las primeras 3 letras del nombre (en mayúsculas)
    primeras_letras_nombre = nombre_limpio[:3].upper()

    # Crear el identificador único
    identificador = f"{tipo_usuario}{dpi}{primeras_letras_nombre}"

    return identificador

# Excepcion personalizada para errores de solicitud incorrecta
class BadRequestError(Exception):
    def __init__(self, mensaje):
        self.mensaje = mensaje
        super().__init__(self.mensaje)