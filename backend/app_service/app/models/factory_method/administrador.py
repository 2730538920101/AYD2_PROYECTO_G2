class Administrador(User):
    def _init_(self, usuario, contrasenia, validacion):
        self.usuario = usuario
        self.contrasenia = contrasenia
        self.validacion = validacion

    def get_role(self):
        return 'Administrador'

    def save(self):
        # Lógica para guardar el administrador en la base de datos
        pass
