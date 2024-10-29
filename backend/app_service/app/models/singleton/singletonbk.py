import mysql.connector
from config import Config
from mysql.connector import Error

class MySQLSingleton:
    _instance = None

    def __new__(cls):
        if not cls._instance:
            cls._instance = super(MySQLSingleton, cls).__new__(cls)
            cls._instance._initialize(Config.MYSQL_HOST, Config.MYSQL_USER, Config.MYSQL_PASSWORD, Config.MYSQL_DATABASE)
        return cls._instance
    
    def _initialize(self, host, user, password, database):
        self.connection = mysql.connector.connect(
                    host=host,
                    user=user,
                    password=password,
                    database=database
                )

    def execute_query(self, query, parameters=()):
        cursor = self.connection.cursor()
        cursor.execute(query, parameters)
        self.connection.commit()
        cursor.close()
    
    def fetch_one(self, query, parameters=()):
        cursor = self.connection.cursor()
        cursor.execute(query, parameters)
        data = cursor.fetchone()
        cursor.close()
        return data

    def fetch_all(self, query, parameters=()):
        cursor = self.connection.cursor()
        cursor.execute(query, parameters)
        data = cursor.fetchall()
        cursor.close()
        return data

    def execute_stored_procedure(self, procedure_name, parameters=()):
        cursor = self.connection.cursor()
        cursor.callproc(procedure_name, parameters)
        results = []
        for result_set in cursor.stored_results():
            results.append(result_set.fetchall())
        self.connection.commit()
        cursor.close()
        return results