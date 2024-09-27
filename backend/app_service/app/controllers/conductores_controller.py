from ..models.singleton.singleton import MySQLSingleton
from mysql.connector import Error

class ConductoresController:
    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton()

    def get_conductores(self):
        try:
            # Definir la consulta SQL
            query = """ SELECT
                            CON_ID, NOMBRE, TELEFONO, ESTADO_CIVIL, GENERO, CORREO, CODIGO_EMPLEADO,
                            FECHA_NACIMIENTO, DIRECCION, NUMERO_DPI, PAPELERIA, FOTOGRAFIA, MARCA_VEHICULO,
                            PLACA, ANIO, ESTADO_INFORMACION
                        FROM Conductor"""

            # Ejecutar la consulta usando el singleton
            conductor_rows = self.db.fetch_all(query, [])

            # Convertir los resultados a una lista de diccionarios
            conductores = []
            for row in conductor_rows:
                conductor = {
                    "con_id": row[0],
                    "nombre": row[1],
                    "telefono": row[2],
                    "estado_civil": row[3],
                    "genero": row[4],
                    "correo": row[5],
                    "codigo_empleado": row[6],
                    "fecha_nacimiento": row[7].strftime("%d/%m/%Y"),
                    "direccion": row[8],
                    "numero_dpi": row[9],
                    "papeleria": row[10],
                    "fotografia": row[11],
                    "marca_vehiculo": row[12],
                    "placa": row[13],
                    "anio": row[14],
                    "estado_informacion": row[15]
                }
                conductores.append(conductor)

            # Retornar los resultados
            return conductores

        except Error as e:
            raise Exception(f"Error al obtener conductores: {e}")

    def create_conductor(self, conductor_data):
        try:
            # Definir la consulta SQL y los parámetros
            query = """
            INSERT INTO Conductor (nombre, telefono, estado_civil, genero, correo, codigo_empleado, contrasenia, fecha_nacimiento, direccion, numero_dpi, numero_cuenta, papeleria, fotografia, marca_vehiculo, placa, anio, estado_informacion)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                conductor_data.nombre,
                conductor_data.telefono,
                conductor_data.estado_civil,
                conductor_data.genero,
                conductor_data.correo,
                conductor_data.codigo_empleado,
                conductor_data.contrasenia,
                conductor_data.fecha_nacimiento,
                conductor_data.direccion,
                conductor_data.numero_dpi,
                conductor_data.numero_cuenta,
                conductor_data.papeleria,
                conductor_data.fotografia,
                conductor_data.marca_vehiculo,
                conductor_data.placa,
                conductor_data.anio,
                conductor_data.estado_informacion
            )

            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, values)

        except Error as e:
            raise Exception(f"Error al insertar conductor: {e}")

    #*Metodo para obtener un conductor por su ID
    def get_conductor_by_id(self, con_id):
        try:
            # Definir la consulta SQL
            query = """ SELECT
                            CON_ID, NOMBRE, TELEFONO, ESTADO_CIVIL, GENERO, CORREO, CODIGO_EMPLEADO,
                            FECHA_NACIMIENTO, DIRECCION, NUMERO_DPI, PAPELERIA, FOTOGRAFIA, MARCA_VEHICULO,
                            PLACA, ANIO, ESTADO_INFORMACION
                        FROM Conductor
                        WHERE CON_ID = %s"""

            # Ejecutar la consulta usando el singleton
            conductor_row = self.db.fetch_one(query, [con_id])

            # Convertir los resultados a un diccionario
            conductor = {
                "con_id": conductor_row[0],
                "nombre": conductor_row[1],
                "telefono": conductor_row[2],
                "estado_civil": conductor_row[3],
                "genero": conductor_row[4],
                "correo": conductor_row[5],
                "codigo_empleado": conductor_row[6],
                "fecha_nacimiento": conductor_row[7].strftime("%d/%m/%Y"),
                "direccion": conductor_row[8],
                "numero_dpi": conductor_row[9],
                "papeleria": conductor_row[10],
                "fotografia": conductor_row[11],
                "marca_vehiculo": conductor_row[12],
                "placa": conductor_row[13],
                "anio": conductor_row[14],
                "estado_informacion": conductor_row[15]
            }

            # Retornar los resultados
            return conductor

        except Error as e:
            raise Exception(f"Error al obtener conductor: {e}")
