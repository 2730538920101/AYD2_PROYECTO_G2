import json
from mysql.connector import Error
from ..models.adapter.adapter import CSVToJSONAdapter
from ..models.singleton.singleton import MySQLSingleton

class TarifaController:
    def __init__(self, csv_reader):
        # Inicializa el adaptador para convertir CSV a JSON
        self.adapter = CSVToJSONAdapter(csv_reader)
        # Conecta a la base de datos usando el singleton
        self.db = MySQLSingleton()

    def actualizar_tarifas(self, csv_stream):
        try:
            # Convierte el CSV a JSON utilizando el Adapter
            tarifas_json = self.adapter.convert_stream_to_json(csv_stream)
            tarifas_json = json.loads(tarifas_json)
            # Limpia la tabla Tarifa
            self.limpiar_tarifas()

            # Inserta las tarifas desde el JSON
            self.insertar_tarifas(tarifas_json)

            return {"message": "Tarifas actualizadas exitosamente"}

        except Error as e:
            print(f"Error al actualizar tarifas: {e}")
            return {"error": "Error al actualizar tarifas"}

    def limpiar_tarifas(self):
        """Limpia la tabla de tarifas."""
        query = "TRUNCATE TABLE Tarifa"
        self.db.execute_query(query)

    def insertar_tarifas(self, tarifas_json):
        """Inserta las tarifas en la tabla."""
        print(tarifas_json)  # Imprime el JSON para verificar su estructura
        query = """
            INSERT INTO Tarifa (ORIGEN, DESTINO, MONTO) 
            VALUES (%s, %s, %s)
        """
        for tarifa in tarifas_json:
            print(tarifa)  # Imprime cada elemento de tarifas_json para ver su contenido
            origen = tarifa.get('ORIGEN')
            destino = tarifa.get('DESTINO')
            monto = tarifa.get('MONTO')
            if origen and destino and monto:
                self.db.execute_query(query, (origen, destino, monto))
            else:
                print("Error: Falta información en el JSON", tarifa)


    #*Metodo para obtener todas las tarifas
    @staticmethod
    def get_tarifas():
        try:
            # Definir la consulta SQL para obtener las tarifas
            query = "SELECT * FROM Tarifa"
            # Ejecutar la consulta
            db = MySQLSingleton()
            result = db.fetch_all(query)

            # Formatear los resultados en una lista de diccionarios
            tarifas = []
            for tarifa in result:
                tarifas.append({
                    "tarifa_id": tarifa[0],
                    "origen": tarifa[1],
                    "destino": tarifa[2],
                    "monto": tarifa[3]
                })
            return tarifas
        except Error as e:
            raise Exception(f"Error al obtener las tarifas: {e}")