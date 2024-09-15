from ..models.singleton.singleton import MySQLSingleton
from config import Config
from mysql.connector import Error

class ClientesController:
    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton(Config.MYSQL_HOST, Config.MYSQL_USER, Config.MYSQL_PASSWORD, Config.MYSQL_DATABASE)

    def create_cliente(self, cliente_data):
        try:
            # Definir la consulta SQL y los parámetros
            query = """
            INSERT INTO Cliente (nombre, fecha_nacimiento, genero, correo, foto_dpi, telefono, contrasenia, pregunta, respuesta, estado)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                cliente_data.nombre,
                cliente_data.fecha_nacimiento,
                cliente_data.genero,
                cliente_data.correo,
                cliente_data.foto_dpi,
                cliente_data.telefono,
                cliente_data.contrasenia,
                cliente_data.pregunta,
                cliente_data.respuesta,
                cliente_data.estado
            )
            
            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, values)

        except Error as e:
            raise Exception(f"Error al insertar cliente: {e}")
