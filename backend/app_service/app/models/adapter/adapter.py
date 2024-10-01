import json
from .reader import CSVReader

class CSVToJSONAdapter:
    def __init__(self, csv_reader: CSVReader):
        self.csv_reader = csv_reader

    # Nuevo método para convertir un flujo de CSV a JSON
    def convert_stream_to_json(self, stream) -> str:
        csv_data = self.csv_reader.read_csv_stream(stream)
        return json.dumps(csv_data)
