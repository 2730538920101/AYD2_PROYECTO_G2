class Viaje():
    def __init__(self, cli_id, conductor_con_id, estado, fecha_inicio, fecha_fin, origen, destino, total):
        self.cli_id = cli_id
        self.conductor_con_id = conductor_con_id
        self.estado = estado
        self.fecha_inicio = fecha_inicio
        self.fecha_fin = fecha_fin
        self.origen = origen
        self.destino = destino
        self.total = total