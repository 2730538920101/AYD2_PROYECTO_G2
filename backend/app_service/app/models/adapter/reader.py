from abc import ABC, abstractmethod

class CSVReader(ABC):
    @abstractmethod
    def read_csv_stream(self, stream):
        """Lee el archivo CSV desde un flujo de texto y devuelve una lista de diccionarios."""
        pass
