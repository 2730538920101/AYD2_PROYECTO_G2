from ..models.singleton.singleton import MySQLSingleton
from ..utils.funciones import BadRequestError
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
            query = """SELECT CLI_ID, CONDUCTOR_CON_ID, ESTADO, FECHA_INICIO, FECHA_FIN, ORIGEN, DESTINO, TOTAL, CALIFICACION_CONDUCTOR, CALIFICACION_CLIENTE
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
                    "total": row[7],
                    "calificacion_conductor": row[8],
                    "calificacion_cliente": row[9]
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
            # Definir la consulta SQL para obtener los viajes pendientes junto con los datos del cliente
            query = """
            SELECT v.VIA_ID, v.ESTADO, v.FECHA_INICIO, v.ORIGEN, v.DESTINO, v.TOTAL,
                c.CLI_ID, c.NOMBRE, c.FECHA_NACIMIENTO, c.GENERO, c.CORREO, c.TELEFONO
            FROM Viaje v
            JOIN Cliente c ON v.CLI_ID = c.CLI_ID
            WHERE v.CONDUCTOR_CON_ID IS NULL AND v.ESTADO = 'PENDIENTE'
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
                    "total": row[5],
                    "cliente": {
                        "cli_id": row[6],
                        "nombre": row[7],
                        "fecha_nacimiento": row[8],
                        "genero": row[9],
                        "correo": row[10],
                        "telefono": row[11]
                    }
                }
                viajes.append(viaje)

            return viajes

        except Error as e:
            raise Exception(f"Error al obtener viajes pendientes: {e}")

    #* Método para obtener los viajes frecuentes de un cliente
    def get_historial_viajes_frecuentes(self, cli_id, num_viajes):
        try:
            # Definir la consulta SQL para obtener los viajes finalizados del cliente
            query = """
            SELECT
                CLI_ID,
                ORIGEN,
                DESTINO,
                TOTAL,
                COUNT(*) AS num_viajes
            FROM
                Viaje
            WHERE
                CLI_ID = %s AND ESTADO = 'FINALIZADO'
            GROUP BY
                CLI_ID, ORIGEN, DESTINO, TOTAL
            ORDER BY
                num_viajes DESC
            LIMIT %s;
            """
            values = (cli_id, num_viajes)

            # Ejecutar la consulta usando el singleton
            viajes_frecuentes = self.db.fetch_all(query, values)

            # Formatear los resultados en una lista de diccionarios (opcional)
            viajes = []
            for row in viajes_frecuentes:
                viaje = {
                    "cli_id": row[0],
                    "origen": row[1],
                    "destino": row[2],
                    "total": row[3],
                    "num_viajes": row[4]
                }
                viajes.append(viaje)

            return viajes

        except Error as e:
            raise Exception(f"Error al obtener historial de viajes frecuentes: {e}")

    # Metodo para que el cliente pueda calificar al conductor
    def calificar_conductor(self, viaje_id, calificacion):
        try:
            # Verificar el estado del viaje antes de calificar
            query_estado = "SELECT ESTADO FROM Viaje WHERE VIA_ID = %s"
            estado_viaje = self.db.fetch_one(query_estado, (viaje_id,))

            if not estado_viaje:
                raise Exception("El viaje no existe.")

            estado = estado_viaje[0]
            if estado != 'FINALIZADO':
                raise Exception("Solo se pueden calificar viajes en estado FINALIZADO.")

            # Se actualiza el parametro 'CALIFICACION_CONDUCTOR' en la tabla Viaje
            query_update = """
            UPDATE Viaje
            SET CALIFICACION_CONDUCTOR = %s
            WHERE VIA_ID = %s
            """
            self.db.execute_query(query_update, (calificacion, viaje_id))

        except Error as e:
            raise Exception(f"Error al calificar al conductor: {e}")

    # Metodo para que el conductor pueda calificar al cliente
    def calificar_cliente(self, viaje_id, calificacion):
        try:
            # Verificar el estado del viaje antes de calificar
            query_estado = "SELECT ESTADO FROM Viaje WHERE VIA_ID = %s"
            estado_viaje = self.db.fetch_one(query_estado, (viaje_id,))

            if not estado_viaje:
                raise Exception("El viaje no existe.")

            estado = estado_viaje[0]

            if estado != 'FINALIZADO':
                raise Exception("Solo se pueden calificar viajes en estado FINALIZADO.")

            # Se actualiza el parametro 'CALIFICACION_CLIENTE' en la tabla Viaje
            query_update = """
            UPDATE Viaje
            SET CALIFICACION_CLIENTE = %s
            WHERE VIA_ID = %s
            """
            self.db.execute_query(query_update, (calificacion, viaje_id))

        except Error as e:
            raise Exception(f"Error al calificar al cliente: {e}")

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

            # Se obtiene el credito actual que tiene el cliente que hizo el viaje
            query_oferta = """SELECT o.OFERTA_ID, IFNULL(o.CREDITO, 0) AS CREDITO
                        FROM Oferta o
                        WHERE o.CLI_ID = (SELECT v.CLI_ID FROM Viaje v WHERE v.VIA_ID = %s) AND o.FECHA_VENCIMIENTO > CURDATE() AND o.CREDITO > 0
                        """
            credito_cliente = self.db.fetch_one(query_oferta, (viaje_id,))

            if credito_cliente is not None:

                # Se obtiene el id de la oferta y el credito
                oferta_id = credito_cliente[0]
                credito = credito_cliente[1]

                # Se obtiene el total del viaje
                query_total = "SELECT TOTAL FROM Viaje WHERE VIA_ID = %s"
                total_viaje = self.db.fetch_one(query_total, (viaje_id,))
                total = total_viaje[0]

                # Se calcula el credito y el total final
                credito_final = 0
                total_final = 0
                if credito >= total:
                    credito_final = credito - total
                    total_final = 0
                else:
                    total_final = total - credito
                    credito_final = 0

                # Se actualiza el credito del cliente
                query_update = """
                UPDATE Oferta
                SET CREDITO = %s
                WHERE OFERTA_ID = %s
                """
                self.db.execute_query(query_update, (credito_final, oferta_id))

                # Se actualiza el total del viaje
                query_update_total = """
                UPDATE Viaje
                SET TOTAL = %s
                WHERE VIA_ID = %s
                """
                self.db.execute_query(query_update_total, (total_final, viaje_id))

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

    #* Método para finalizar un viaje (conductor)
    def finalizar_viaje(self, viaje_id):
        try:
            # Definir la consulta SQL para actualizar el estado del viaje
            query = """
            UPDATE Viaje
            SET ESTADO = 'FINALIZADO', FECHA_FIN = %s
            WHERE VIA_ID = %s
            """
            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, (datetime.now(), viaje_id))

            # Se obtiene el credito actual que tiene el cliente que hizo el viaje
            query_oferta = """SELECT o.OFERTA_ID, IFNULL(o.CREDITO, 0) AS CREDITO
                        FROM Oferta o
                        WHERE o.CLI_ID = (SELECT v.CLI_ID FROM Viaje v WHERE v.VIA_ID = %s) AND o.FECHA_VENCIMIENTO > CURDATE() AND o.CREDITO > 0
                        """
            credito_cliente = self.db.fetch_one(query_oferta, (viaje_id,))

            if credito_cliente is not None:

                # Se obtiene el id de la oferta y el credito
                oferta_id = credito_cliente[0]
                credito = credito_cliente[1]

                # Se obtiene el total del viaje
                query_total = "SELECT TOTAL FROM Viaje WHERE VIA_ID = %s"
                total_viaje = self.db.fetch_one(query_total, (viaje_id,))
                total = total_viaje[0]

                # Se calcula el credito y el total final
                credito_final = 0
                total_final = 0
                if credito >= total:
                    credito_final = credito - total
                    total_final = 0
                else:
                    total_final = total - credito
                    credito_final = 0

                # Se actualiza el credito del cliente
                query_update = """
                UPDATE Oferta
                SET CREDITO = %s
                WHERE OFERTA_ID = %s
                """
                self.db.execute_query(query_update, (credito_final, oferta_id))

                # Se actualiza el total del viaje
                query_update_total = """
                UPDATE Viaje
                SET TOTAL = %s
                WHERE VIA_ID = %s
                """
                self.db.execute_query(query_update_total, (total_final, viaje_id))

        except Error as e:
            raise Exception(f"Error al finalizar viaje: {e}")

    #* Método para obtener los viajes de un conductor
    def get_viajes_conductor(self, conductor_id):
        try:
            # Definir la consulta SQL para obtener los viajes de un conductor
            query = """
            SELECT VIA_ID, CLI_ID, ESTADO, FECHA_INICIO, FECHA_FIN, ORIGEN, DESTINO, TOTAL, CALIFICACION_CONDUCTOR, CALIFICACION_CLIENTE
            FROM Viaje
            WHERE CONDUCTOR_CON_ID = %s
            """
            # Ejecutar la consulta usando el singleton
            viajes_conductor = self.db.fetch_all(query, (conductor_id,))

            # Formatear los resultados en una lista de diccionarios
            viajes = []
            for row in viajes_conductor:
                viaje = {
                    "via_id": row[0],
                    "cli_id": row[1],
                    "estado": row[2],
                    "fecha_inicio": row[3],
                    "fecha_fin": row[4],
                    "origen": row[5],
                    "destino": row[6],
                    "total": row[7],
                    "calificacion_conductor": row[8],
                    "calificacion_cliente": row[9]
                }
                viajes.append(viaje)

            return viajes

        except Error as e:
            raise Exception(f"Error al obtener viajes de conductor: {e}")

    #* Metodo para listar los viajes de un cliente
    def get_viajes_cliente(self, cli_id):
        try:
            # Definir la consulta SQL para obtener los viajes de un cliente
            query = """
            SELECT VIA_ID, CONDUCTOR_CON_ID, ESTADO, FECHA_INICIO, FECHA_FIN, ORIGEN, DESTINO, TOTAL, CALIFICACION_CONDUCTOR, CALIFICACION_CLIENTE
            FROM Viaje
            WHERE CLI_ID = %s
            """
            # Ejecutar la consulta usando el singleton
            viajes_cliente = self.db.fetch_all(query, (cli_id,))

            # Formatear los resultados en una lista de diccionarios
            viajes = []
            for row in viajes_cliente:
                viaje = {
                    "via_id": row[0],
                    "conductor_con_id": row[1],
                    "estado": row[2],
                    "fecha_inicio": row[3],
                    "fecha_fin": row[4],
                    "origen": row[5],
                    "destino": row[6],
                    "total": row[7],
                    "calificacion_conductor": row[8],
                    "calificacion_cliente": row[9]
                }
                viajes.append(viaje)

            return viajes

        except Error as e:
            raise Exception(f"Error al obtener viajes de cliente: {e}")
