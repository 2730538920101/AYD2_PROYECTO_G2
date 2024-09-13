from .user import User

class Administrador(User):
    def __init__(self, usuario, contrasenia, validacion):
        self.usuario = usuario
        self.contrasenia = contrasenia
        self.validacion = validacion

    def get_role(self):
        return 'Administrador'

