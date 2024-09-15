import csv
from .reader import CSVReader

class CSVReaderImpl(CSVReader):
    def read_csv_stream(self, stream):
        # Leer el CSV desde el flujo (stream)
        reader = list(csv.DictReader(stream))
        return reader
