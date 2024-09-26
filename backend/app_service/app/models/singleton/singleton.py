import mysql.connector
from config import Config
from mysql.connector import Error

class MySQLSingleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MySQLSingleton, cls).__new__(cls)
            cls._instance._initialize(Config.MYSQL_HOST, Config.MYSQL_USER, Config.MYSQL_PASSWORD, Config.MYSQL_DATABASE)
        return cls._instance

    def _initialize(self, host, user, password, database):
        if not hasattr(self, 'connection'):  # Verificar si la conexión ya ha sido establecida
            try:
                self.connection = mysql.connector.connect(
                    host=host,
                    user=user,
                    password=password,
                    database=database
                )
            except Error as e:
                print(f"Error connecting to MySQL: {e}")
                self.connection = None

    def execute_query(self, query, parameters=()):
        if self.connection is None:
            raise RuntimeError("Database connection is not initialized.")
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, parameters)
                self.connection.commit()
        except Error as e:
            raise RuntimeError(e)

    def fetch_one(self, query, parameters=()):
        if self.connection is None:
            raise RuntimeError("Database connection is not initialized.")
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, parameters)
                data = cursor.fetchone()
                return data # Retorna la primera fila
        except Error as e:
            print(f"Error fetching data: {e}")
            return None  # Retorna None si ocurre un error

    def fetch_all(self, query, parameters=()):
        if self.connection is None:
            raise RuntimeError("Database connection is not initialized.")
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, parameters)
                data = cursor.fetchall()
                return data # Retorna todas las filas
        except Error as e:
            print(f"Error fetching data: {e}")
            return []

    def execute_stored_procedure(self, procedure_name, parameters=()):
        if self.connection is None:
            raise RuntimeError("Database connection is not initialized.")
        try:
            self.connection.cursor.callproc(procedure_name, parameters)
            results = []
            for result_set in self.connection.cursor.stored_results():
                results.append(result_set.fetchall())
            self.connection.commit()
            return results
        except Error as e:
            print(f"Error executing stored procedure: {e}")
            return []

    def __del__(self):
        try:
            if self.connection is not None:
                self.connection.close()
        except Exception as e:
            print(f"Error closing database connection: {e}")
