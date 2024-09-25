from ..models.singleton.singleton import MySQLSingleton
from mysql.connector import Error

class AsistentesController:
    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton()

    def get_asistentes(self):
        try:
            # Definir la consulta SQL
            query = """SELECT ASISTENTE_ID, NOMBRE, TELEFONO, ESTADO_CIVIL, GENERO, CORREO, FECHA_NACIMIENTO, DIRECCION, NUMERO_DPI, NUMERO_CUENTA, PAPELERIA
                    FROM Asistente"""

            # Ejecutar la consulta usando el singleton
            asistente_rows = self.db.fetch_all(query, [])

            # Convertir los resultados a una lista de diccionarios
            asistentes = []
            for row in asistente_rows:
                asistente = {
                    "asistente_id": row[0],
                    "nombre": row[1],
                    "telefono": row[2],
                    "estado_civil": row[3],
                    "genero": row[4],
                    "correo": row[5],
                    "fecha_nacimiento": row[6].strftime("%d/%m/%Y"),
                    "direccion": row[7],
                    "numero_dpi": row[8],
                    "numero_cuenta": row[9],
                    "papeleria": row[10]
                }
                asistentes.append(asistente)

            # Retornar los resultados
            return asistentes

        except Error as e:
            raise Exception(f"Error al obtener asistentes: {e}")

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

    def update_asistente(self, asistente_data):
        try:
            # Crear una lista de campos para actualizar
            update_fields = []
            update_values = []

            # Verificar si cada campo de asistente_data no es None y agregarlo a la lista
            if 'nombre' in asistente_data:
                update_fields.append("nombre = %s")
                update_values.append(asistente_data['nombre'])
            if 'telefono' in asistente_data:
                update_fields.append("telefono = %s")
                update_values.append(asistente_data['telefono'])
            if 'estado_civil' in asistente_data:
                update_fields.append("estado_civil = %s")
                update_values.append(asistente_data['estado_civil'])
            if 'fecha_nacimiento' in asistente_data:
                update_fields.append("fecha_nacimiento = %s")
                update_values.append(asistente_data['fecha_nacimiento'])
            if 'direccion' in asistente_data:
                update_fields.append("direccion = %s")
                update_values.append(asistente_data['direccion'])

            # Si no se proporcionan campos para actualizar, lanzar una excepción
            if not update_fields:
                raise Exception("No se proporcionaron campos para actualizar")

            # Definir la consulta SQL dinámica
            query = f"""
            UPDATE Asistente
            SET {', '.join(update_fields)}
            WHERE ASISTENTE_ID = %s
            """

            # Agregar el ID del asistente al final de la lista de valores
            update_values.append(asistente_data['asistente_id'])

            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, update_values)

        except Error as e:
            raise Exception(f"Error al actualizar asistente: {e}")
