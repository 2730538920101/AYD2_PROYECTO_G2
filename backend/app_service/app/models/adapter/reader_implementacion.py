import csv
from .reader import CSVReader

class CSVReaderImpl(CSVReader):
    def read_csv(self, file_path: str):
        with open(file_path, mode='r') as file:
            reader = list(csv.DictReader(file))
            return reader
        