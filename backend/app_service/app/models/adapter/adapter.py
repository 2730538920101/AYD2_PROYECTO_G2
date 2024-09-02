import json
from reader import CSVReader

class CSVToJSONAdapter:
    def _init_(self, csv_reader: CSVReader):
        self.csv_reader = csv_reader

    def convert_to_json(self, file_path: str) -> str:
        csv_data = self.csv_reader.read_csv(file_path)
        return json.dumps(csv_data)