# Importing Flask
from flask import Flask
# Importing the Database Handler
from Database import Database
# Importing JSON
import json
# Instantiating Flask as the application 
Application = Flask(__name__, static_folder='Public', static_url_path='/Public')
# Instantiating the Database Handler
DatabaseHandler = Database()
# Routing
@Application.route('/', methods = ['GET'])
def homepage():
    return Application.send_static_file('Pages/Homepage.html')

@Application.route('/Dashboard', methods = ['GET'])
def dashboard():
    return Application.send_static_file('Pages/Dashboard.html')

@Application.route('/Downloads', methods = ['GET'])
def getDownloads():
    data = []
    DatabaseHandler.query("SELECT * FROM YouTubeDownloader.Downloads", None)
    results = DatabaseHandler.resultSet()
    for index in range(0, len(results), 1):
        record = {
            "id": results[index][0],
            "artist": results[index][1],
            "title": results[index][2],
            "size": results[index][3],
            "category": results[index][4]
        }
        data.append(record)
    return json.dumps(data)
# Running the application
Application.run(debug=True)