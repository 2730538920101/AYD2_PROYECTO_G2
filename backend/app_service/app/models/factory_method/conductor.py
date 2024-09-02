from .user import User
class Conductor(User):
    def _init_(self, con_id, nombre, telefono, estado_civil, genero, correo, codigo_empleado, contrasenia, fecha_nacimiento, direccion, numero_dpi, numero_cuenta, fotografia, marca_vehiculo, placa, anio, pregunta, respuesta, estado):
        self.con_id = con_id
        self.nombre = nombre
        self.telefono = telefono
        self.estado_civil = estado_civil
        self.genero = genero
        self.correo = correo
        self.codigo_empleado = codigo_empleado
        self.contrasenia = contrasenia
        self.fecha_nacimiento = fecha_nacimiento
        self.direccion = direccion
        self.numero_dpi = numero_dpi
        self.numero_cuenta = numero_cuenta
        self.fotografia = fotografia
        self.marca_vehiculo = marca_vehiculo
        self.placa = placa
        self.anio = anio
        self.pregunta = pregunta
        self.respuesta = respuesta
        self.estado = estado

    def get_role(self):
        return 'Conductor'

    def save(self):
        # Lógica para guardar el conductor en la base de datos
        pass
