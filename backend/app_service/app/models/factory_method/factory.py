from .cliente import Cliente
from .administrador import Administrador
from .asistente import Asistente
from .conductor import Conductor

class UserFactory:
    @staticmethod
    def create_user(role, **kwargs):
        if role == 'Cliente':
            return Cliente(**kwargs)
        elif role == 'Conductor':
            return Conductor(**kwargs)
        elif role == 'Asistente':
            return Asistente(**kwargs)
        elif role == 'Administrador':
            return Administrador(**kwargs)
        else:
            raise ValueError(f"Role '{role}' not recognized")
