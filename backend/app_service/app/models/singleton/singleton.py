import mysql.connector
from mysql.connector import MySQLConnection, Error

class MySQLSingleton:
    _instance = None

    def __new__(cls, host, user, password, database):
        if cls._instance is None:
            cls._instance = super(MySQLSingleton, cls).__new__(cls)
            cls._instance._initialize(host, user, password, database)
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
                self.cursor = self.connection.cursor()
            except Error as e:
                print(f"Error connecting to MySQL: {e}")
                self.connection = None
                self.cursor = None

    def execute_query(self, query, parameters=()):
        if self.connection is None or self.cursor is None:
            raise RuntimeError("Database connection is not initialized.")
        try:
            self.cursor.execute(query, parameters)
            self.connection.commit()
        except Error as e:
            print(f"Error executing query: {e}")

    def fetch_all(self, query, parameters=()):
        if self.connection is None or self.cursor is None:
            raise RuntimeError("Database connection is not initialized.")
        try:
            self.cursor.execute(query, parameters)
            return self.cursor.fetchall()
        except Error as e:
            print(f"Error fetching data: {e}")
            return []

    def execute_stored_procedure(self, procedure_name, parameters=()):
        if self.connection is None or self.cursor is None:
            raise RuntimeError("Database connection is not initialized.")
        try:
            self.cursor.callproc(procedure_name, parameters)
            results = []
            for result_set in self.cursor.stored_results():
                results.append(result_set.fetchall())
            self.connection.commit()
            return results
        except Error as e:
            print(f"Error executing stored procedure: {e}")
            return []

    def __del__(self):
        if self.connection is not None and self.cursor is not None:
            self.cursor.close()
            self.connection.close()
