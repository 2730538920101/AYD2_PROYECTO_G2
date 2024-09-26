from ..models.singleton.singleton import MySQLSingleton
from mysql.connector import Error
from datetime import datetime

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
    

    # Método para crear un nuevo viaje
    def create_viaje(self, viaje_data):
        try:
            # Definir la consulta SQL y los parámetros
            query = """
            INSERT INTO Viaje (cli_id, conductor_con_id, estado, fecha_inicio, fecha_fin, origen, destino, total)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            # Asignar `None` si no existe el campo en el JSON
            cli_id = viaje_data.get('cli_id', None)
            conductor_con_id = viaje_data.get('conductor_con_id', None)
            estado = viaje_data['estado']
            fecha_inicio = viaje_data['fecha_inicio']
            fecha_fin = viaje_data.get('fecha_fin', None)  # Es opcional
            origen = viaje_data['origen']
            destino = viaje_data['destino']
            total = viaje_data['total']

            values = (
                cli_id,
                conductor_con_id,
                estado,
                fecha_inicio,
                fecha_fin,
                origen,
                destino,
                total
            )

            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, values)

        except Error as e:
            raise Exception(f"Error al insertar viaje: {e}")
    
    #* Método para verificar si el cliente tiene historial de viajes
    def verificar_historial_cliente(self, cliente_id):
        try:
            # Consulta para contar los viajes del cliente
            query = """
            SELECT COUNT(*) 
            FROM Viaje
            WHERE CLI_ID = %s
            """
            # Ejecutar la consulta
            resultado = self.db.fetch_one(query, (cliente_id,))
            
            # Verificar si el cliente tiene historial de viajes
            if resultado[0] > 0:
                return {
                    "cliente_habitual": True,
                    "total_viajes": resultado[0]
                }
            else:
                return {
                    "cliente_habitual": False,
                    "total_viajes": 0
                }

        except Error as e:
            raise Exception(f"Error al verificar historial de viajes del cliente: {e}")
        
    
    #* Método para obtener los viajes pendientes (sin conductor asignado)
    def get_viajes_pendientes(self):
        try:
            # Definir la consulta SQL para viajes sin conductor asignado
            query = """
            SELECT VIA_ID, ESTADO, FECHA_INICIO, ORIGEN, DESTINO, TOTAL
            FROM Viaje
            WHERE CONDUCTOR_CON_ID IS NULL
            """
            # Ejecutar la consulta con el ID del cliente
            viajes_pendientes = self.db.fetch_all(query)
            
            # Formatear los resultados en una lista de diccionarios
            viajes = []
            for row in viajes_pendientes:
                viaje = {
                    "via_id": row[0],
                    "estado": row[1],
                    "fecha_inicio": row[2],
                    "origen": row[3],
                    "destino": row[4],
                    "total": row[5]
                }
                viajes.append(viaje)

            return viajes

        except Error as e:
            raise Exception(f"Error al obtener viajes pendientes: {e}")
    
    #* Método para obtener los viajes frecuentes de un cliente
    def get_historial_viajes_frecuentes(self, cli_id, num_viajes):
        try:
            # Definir la consulta para llamar al procedimiento almacenado
            query = "CALL VerHistorialViajesFrecuentes(%s, %s);"
            values = (cli_id, num_viajes)

            # Ejecutar la consulta usando el singleton
            viajes_frecuentes = self.db.fetch_all(query, values)

            return viajes_frecuentes

        except Error as e:
            raise Exception(f"Error al obtener historial de viajes frecuentes: {e}")
    

    #* Método para aceptar un viaje (conductor)
    def aceptar_viaje(self, viaje_id, conductor_id):
        try:
            # Definir la consulta SQL para actualizar el conductor asignado y el estado
            query = """
            UPDATE Viaje
            SET CONDUCTOR_CON_ID = %s, ESTADO = 'ACEPTADO'
            WHERE VIA_ID = %s
            """
            values = (conductor_id, viaje_id)

            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, values)

        except Error as e:
            raise Exception(f"Error al aceptar viaje: {e}")

    
    #* Método para cancelar un viaje (cliente)
    def cancelar_viaje(self, viaje_id, razon_cancelacion):
        try:
            # Verificar el estado del viaje antes de cancelar
            query_estado = "SELECT ESTADO FROM Viaje WHERE VIA_ID = %s"
            estado_viaje = self.db.fetch_one(query_estado, (viaje_id,))

            if not estado_viaje:
                raise Exception("El viaje no existe.")

            estado = estado_viaje[0]

            if estado not in ['PENDIENTE', 'ACEPTADO']:
                raise Exception("Solo se pueden cancelar viajes en estado PENDIENTE o ACEPTADO.")

            # Insertar la razón de la cancelación en la tabla Cancelado
            query_cancelar = """
            INSERT INTO Cancelado (VIAJE_VIA_ID, TIPO_CANCELACION, MENSAJE, FECHA_HORA)
            VALUES (%s, %s, %s, %s)
            """
            values_cancelar = (viaje_id, 'Cancelación por cliente', razon_cancelacion, datetime.now())
            
            # Ejecutar la consulta para registrar la cancelación
            self.db.execute_query(query_cancelar, values_cancelar)

            # Actualizar el estado del viaje a "CANCELADO"
            query_update = """
            UPDATE Viaje
            SET ESTADO = 'CANCELADO'
            WHERE VIA_ID = %s
            """
            #TODO: 6. El viaje es enviado a la lista de espera para ser reasignado a un nuevo conductor.
            self.db.execute_query(query_update, (viaje_id,))

        except Error as e:
            raise Exception(f"Error al cancelar viaje: {e}")
    
    #* Método para modificar el estado del viaje a "EN CURSO" (conductor)
    def iniciar_viaje(self, viaje_id):
        try:
            # Definir la consulta SQL para actualizar el estado del viaje
            query = """
            UPDATE Viaje
            SET ESTADO = 'EN CURSO'
            WHERE VIA_ID = %s
            """
            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, (viaje_id,))

        except Error as e:
            raise Exception(f"Error al iniciar viaje: {e}")


    
