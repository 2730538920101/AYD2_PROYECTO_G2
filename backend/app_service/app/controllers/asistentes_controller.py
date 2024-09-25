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
