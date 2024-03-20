from flask import Flask
from tech_blend_app import routes

app = Flask(__name__)

app.config.from_object("config")

if __name__ == "__main__":
    app.run(debug=True)