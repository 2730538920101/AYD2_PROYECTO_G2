from ..models.singleton.singleton import MySQLSingleton
from ..utils.funciones import BadRequestError
from datetime import datetime

class OfertasController:

    def __init__(self):
        # Conecta a la base de datos usando el singleton
        self.db = MySQLSingleton()

    # Método para crear una oferta
    def create_oferta(self, request):

        # Verificar si los campos requeridos están presentes en el formulario
        if 'cli_id' not in request.json:
            raise BadRequestError('Falta el ID del cliente.')
        if 'fecha_vencimiento' not in request.json:
            raise BadRequestError('Falta la fecha de vencimiento.')
        if 'credito' not in request.json:
            raise BadRequestError('Falta el crédito.')

        try:
            # Obtener los datos del formulario
            cli_id = request.json['cli_id']
            fecha_vencimiento = request.json['fecha_vencimiento']
            credito = request.json['credito']

            # Convertir la fecha de vencimiento a un formato válido
            fecha_vencimiento = datetime.strptime(fecha_vencimiento, '%Y/%m/%d').strftime('%Y-%m-%d')
            # Se valida que la fecha de vencimiento sea mayor a la fecha actual
            if fecha_vencimiento < datetime.now().strftime('%Y-%m-%d'):
                raise BadRequestError('La fecha de vencimiento debe ser mayor a la fecha actual.')

            # Definir la consulta SQL
            query = """INSERT INTO Oferta (CLI_ID, FECHA_VENCIMIENTO, CREDITO) VALUES (%s, %s, %s)"""

            # Ejecutar la consulta usando el singleton
            self.db.execute_query(query, [cli_id, fecha_vencimiento, credito])
        except Exception as e:
            raise Exception(f"Error al insertar la oferta: {e}")

    # Método para obtener la oferta activa de un cliente
    def get_oferta_cliente(self, cli_id):

        # Definir la consulta SQL
        query = """SELECT o.FECHA_VENCIMIENTO, o.CREDITO
                    FROM Oferta o
                    WHERE o.FECHA_VENCIMIENTO > CURDATE() AND o.CREDITO > 0 AND o.CLI_ID = %s
                """

        # Ejecutar la consulta usando el singleton
        oferta_row = self.db.fetch_one(query, [cli_id])

        # Convertir la fila en un diccionario
        oferta = {
            'fecha_vencimiento': oferta_row[0].strftime('%d/%m/%Y'),
            'credito': oferta_row[1]
        }

        return oferta