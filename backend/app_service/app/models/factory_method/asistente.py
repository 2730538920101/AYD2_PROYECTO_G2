from .user import User

class Asistente(User):
    def __init__(self, nombre, telefono, estado_civil, genero, correo, codigo_usuario, contrasenia, fecha_nacimiento, direccion, numero_dpi, numero_cuenta, papeleria, fotografia, pregunta, respuesta, estado):
        self.nombre = nombre
        self.telefono = telefono
        self.estado_civil = estado_civil
        self.genero = genero
        self.correo = correo
        self.codigo_usuario = codigo_usuario
        self.contrasenia = contrasenia
        self.fecha_nacimiento = fecha_nacimiento
        self.direccion = direccion
        self.numero_dpi = numero_dpi
        self.numero_cuenta = numero_cuenta
        self.papeleria = papeleria
        self.pregunta = pregunta
        self.respuesta = respuesta
        self.estado = estado

    def get_role(self):
        return 'Asistente'

