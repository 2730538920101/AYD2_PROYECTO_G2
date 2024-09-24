from ..models.singleton.singleton import MySQLSingleton
from config import Config
from mysql.connector import Error

class ClientesController:
    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton(Config.MYSQL_HOST, Config.MYSQL_USER, Config.MYSQL_PASSWORD, Config.MYSQL_DATABASE)

    def get_clientes(self):
        try:
            # Definir la consulta SQL
            query = """SELECT CLI_ID, NOMBRE, FECHA_NACIMIENTO, GENERO, CORREO, FOTO_DPI, TELEFONO
                    FROM Cliente"""

            # Ejecutar la consulta usando el singleton
            cliente_rows = self.db.fetch_all(query, [])

            # Convertir los resultados a una lista de diccionarios
            clientes = []
            for row in cliente_rows:
                cliente = {
                    "cli_id": row[0],
                    "nombre": row[1],
                    "fecha_nacimiento": row[2],
                    "genero": row[3],
                    "correo": row[4],
                    "foto_dpi": row[5],
                    "telefono": row[6]
                }
                clientes.append(cliente)

            # Retornar los resultados
            return clientes

        except Error as e:
            raise Exception(f"Error al obtener clientes: {e}")

    def create_cliente(self, cliente_data):
        try:
            # Definir la consulta SQL y los parámetros
            query = """
            INSERT INTO Cliente (nombre, fecha_nacimiento, genero, correo, foto_dpi, telefono, contrasenia)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                cliente_data.nombre,
                cliente_data.fecha_nacimiento,
                cliente_data.genero,
                cliente_data.correo,
                cliente_data.foto_dpi,
                cliente_data.telefono,
                cliente_data.contrasenia
            )

            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, values)

        except Error as e:
            raise Exception(f"Error al insertar cliente: {e}")

    def update_cliente(self, cliente_data):
        try:
            # Crear una lista de campos para actualizar
            update_fields = []
            update_values = []

            # Verificar si cada campo de cliente_data no es None y agregarlo a la lista
            if cliente_data['nombre']:
                update_fields.append("nombre = %s")
                update_values.append(cliente_data['nombre'])
            if cliente_data['fecha_nacimiento']:
                update_fields.append("fecha_nacimiento = %s")
                update_values.append(cliente_data['fecha_nacimiento'])
            if cliente_data['telefono']:
                update_fields.append("telefono = %s")
                update_values.append(cliente_data['telefono'])
            if cliente_data['contrasenia']:
                update_fields.append("contrasenia = %s")
                update_values.append(cliente_data['contrasenia'])

            # Si no se proporcionan campos para actualizar, lanzar una excepción
            if not update_fields:
                raise Exception("No se proporcionaron campos para actualizar")

            # Definir la consulta SQL dinámica
            query = f"""
            UPDATE Cliente
            SET {', '.join(update_fields)}
            WHERE CLI_ID = %s
            """

            # Agregar el ID del cliente al final de la lista de valores
            update_values.append(cliente_data['cli_id'])

            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, update_values)

        except Error as e:
            raise Exception(f"Error al actualizar cliente: {e}")
