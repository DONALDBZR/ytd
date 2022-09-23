# Importing Flask
from flask import Flask
# Importing the database handler
from flaskext.mysql import MySQL
# Importing the ENV File
from Environment import Environment
# Importing JSON
import json
# Instantiating Flask as the application 
Application = Flask(__name__, static_folder='Public', static_url_path='/Public')
# Instantiating the database handler
DatabaseHandler = MySQL()
# Configuring the application
Application.config['MYSQL_DATABASE_USER'] = Environment.USERNAME
Application.config['MYSQL_DATABASE_PASSWORD'] = Environment.PASSWORD
Application.config['MYSQL_DATABASE_DB'] = Environment.DATABASE
Application.config['MYSQL_DATABASE_HOST'] = Environment.HOST
# Initializing the database handler
DatabaseHandler.init_app(Application)
# Routing
@Application.route('/', methods = ['GET'])
def homepage():
    return Application.send_static_file('Pages/Homepage.html')

@Application.route('/Dashboard', methods = ['GET'])
def dashboard():
    return Application.send_static_file('Pages/Dashboard.html')

@Application.route('/Downloads', methods = ['GET'])
def getDownloads():
    databaseConnection = DatabaseHandler.connect()
    cursor = databaseConnection.cursor()
    cursor.execute("SELECT * FROM YouTubeDownloader.Downloads")
    data = cursor.fetchall()
    return json.dumps(data)
# Running the application
Application.run(debug=True)