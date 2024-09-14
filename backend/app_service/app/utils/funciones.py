def generar_identificador_unico(tipo_usuario, telefono, nombre):
    """
    Genera un identificador único para un usuario.

    :param tipo_usuario: Tipo de usuario ('Asistente' o 'Conductor')
    :param telefono: Número de teléfono del usuario
    :param nombre: Nombre del usuario
    :return: Identificador único
    """
   

    # Extraer las primeras 3 letras del nombre (en mayúsculas)
    primeras_letras_nombre = nombre[:3].upper()

    # Crear el identificador único
    identificador = f"{tipo_usuario}{telefono}{primeras_letras_nombre}"

    return identificador
