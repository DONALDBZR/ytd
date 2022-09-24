# Importing MySQL Connector
import mysql.connector
# Importing ENV
from Environment import Environment
# Database class
class Database:
    def __init__(self):
        # The host of the database server
        # TYPE: String
        self.__host = Environment.HOST
        # The database of the database server
        # TYPE: String
        self.__database = Environment.DATABASE
        # The username that is registered to communicate on the database server
        # TYPE: String
        self.__username = Environment.USERNAME
        # The password needed to authenticate the username that is registered to communicate on the database server
        # TYPE: String
        self.__password = Environment.PASSWORD
        try:
            self.__databaseHandler = mysql.connector.connect(host = self.__host, database = self.__database, user = self.__username, password = self.__password)
        except mysql.connector.Error as error:
            print("Connection Failed: " + error)
    # Preparing the SQL query that is going to be handled by the database handler
    def query(self, query: str, parameters: None | tuple):
        self.__statement = self.__databaseHandler.cursor(prepared=True)
        self.__statement.execute(query, parameters)
    # Executing the SQL query which will send a command to the database server
    def execute(self):
        self.__databaseHandler.commit()
    # Fetching all the data that is requested from the command that was sent to the database server
    def resultSet(self):
        return self.__statement.fetchall()