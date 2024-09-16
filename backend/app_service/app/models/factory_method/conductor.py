from .user import User

class Conductor(User):
    def __init__(self, nombre, telefono, estado_civil, genero, correo, codigo_empleado, contrasenia, fecha_nacimiento, direccion, numero_dpi, numero_cuenta, papeleria, fotografia, marca_vehiculo, placa, anio, pregunta, respuesta, estado_informacion):
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
        self.papeleria = papeleria
        self.fotografia = fotografia
        self.marca_vehiculo = marca_vehiculo
        self.placa = placa
        self.anio = anio
        self.pregunta = pregunta
        self.respuesta = respuesta
        self.estado_informacion = estado_informacion

    def get_role(self):
        return 'Conductor'
