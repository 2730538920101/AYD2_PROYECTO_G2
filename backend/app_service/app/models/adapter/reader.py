from abc import ABC, abstractmethod

class CSVReader(ABC):
    @abstractmethod
    def read_csv(self, file_path: str):
        """Lee el archivo CSV y devuelve una lista de diccionarios."""
        pass