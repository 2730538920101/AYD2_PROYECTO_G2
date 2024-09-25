from ..models.singleton.singleton import MySQLSingleton
from mysql.connector import Error

class ConductoresController:
    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton()

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
