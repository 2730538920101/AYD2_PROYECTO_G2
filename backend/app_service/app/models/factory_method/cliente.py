from .user import User

class Cliente(User):
    def __init__(self, nombre, fecha_nacimiento, genero, correo, foto_dpi, telefono, contrasenia, pregunta, respuesta, estado):
        self.nombre = nombre
        self.fecha_nacimiento = fecha_nacimiento
        self.genero = genero
        self.correo = correo
        self.foto_dpi = foto_dpi
        self.telefono = telefono
        self.contrasenia = contrasenia
        self.pregunta = pregunta
        self.respuesta = respuesta
        self.estado = estado

    def get_role(self):
        return 'Cliente'
