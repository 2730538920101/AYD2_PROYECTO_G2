from ..models.singleton.singleton import MySQLSingleton
from mysql.connector import Error

class AsistentesController:
    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton()

    def create_asistente(self, asistente_data):
        try:
            # Definir la consulta SQL y los parámetros
            query = """
            INSERT INTO Asistente (nombre, telefono, estado_civil, genero, correo, codigo_usuario, contrasenia, fecha_nacimiento, direccion, numero_dpi, numero_cuenta, papeleria)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                asistente_data.nombre,
                asistente_data.telefono,
                asistente_data.estado_civil,
                asistente_data.genero,
                asistente_data.correo,
                asistente_data.codigo_usuario,
                asistente_data.contrasenia,
                asistente_data.fecha_nacimiento,
                asistente_data.direccion,
                asistente_data.numero_dpi,
                asistente_data.numero_cuenta,
                asistente_data.papeleria
            )

            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, values)

        except Error as e:
            raise Exception(f"Error al insertar asistente: {e}")
