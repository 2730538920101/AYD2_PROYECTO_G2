from ..models.singleton.singleton import MySQLSingleton
from config import Config
from mysql.connector import Error

class AdministradorController:
    def __init__(self):
        # Conectar a la base de datos usando el singleton
        self.db = MySQLSingleton(Config.MYSQL_HOST, Config.MYSQL_USER, Config.MYSQL_PASSWORD, Config.MYSQL_DATABASE)

    def create_administrador(self, administrador_data):
        pass