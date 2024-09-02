from .user import User
class Cliente(User):
    def _init_(self, cli_id, nombre, fecha_nacimiento, genero, correo, foto_dpi, telefono, contrasenia, pregunta, respuesta, estado):
        self.cli_id = cli_id
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

    def save(self):
        # Lógica para guardar el cliente en la base de datos
        pass
