from ..models.singleton.singleton import MySQLSingleton
from mysql.connector import Error

class ViajeController:
    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton()
    
    #* Método para obtener todos los viajes
    def get_viajes(self):
        try:
            #Definir la consulta SQL
            query = """SELECT CLI_ID, CONDUCTOR_CON_ID, ESTADO, FECHA_INICIO, FECHA_FIN, ORIGEN, DESTINO, TOTAL
                        FROM Viaje"""
            
            #Ejecutar la consulta usando el singleton
            viaje_rows = self.db.fetch_all(query, [])

            #Convertir los resultados a una lista de diccionarios
            viajes = []
            for row in viaje_rows:
                viaje = {
                    "cli_id": row[0],
                    "conductor_con_id": row[1],
                    "estado": row[2],
                    "fecha_inicio": row[3],
                    "fecha_fin": row[4],
                    "origen": row[5],
                    "destino": row[6],
                    "total": row[7]
                }
                viajes.append(viaje)
            
            #Retornar los resultados
            return viajes
        
        except Error as e:
            raise Exception(f"Error al obtener viajes: {e}")
    

    #* Método para crear un nuevo viaje del punto A al punto B
    def create_viaje(self, viaje_data):
        try:
            # Definir la consulta SQL y los parámetros
            query = """
            INSERT INTO Viaje (cli_id, conductor_con_id, estado, fecha_inicio, fecha_fin, origen, destino, total)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                viaje_data['cli_id'],
                viaje_data['conductor_con_id'],
                viaje_data['estado'],
                viaje_data['fecha_inicio'],
                viaje_data['fecha_fin'],
                viaje_data['origen'],
                viaje_data['destino'],
                viaje_data['total']
            )

            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, values)

        except Error as e:
            raise Exception(f"Error al insertar viaje: {e}")

    
