# Importing Flask
from flask import Flask
# Instantiating Flask as the application 
Application = Flask(__name__, static_folder='Public', static_url_path='/Public')
# Routing
@Application.route('/', methods = ['GET'])
def homepage():
    return Application.send_static_file('Pages/Homepage.html')
@Application.route('/Downloads', methods = ['GET'])
def downloads():
    return Application.send_static_file('Pages/Downloads.html')
# Running the application
Application.run(debug=True)