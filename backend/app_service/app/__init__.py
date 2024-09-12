from flask import Flask
from app.routes import main, tarifas

def create_app():
    app = Flask(__name__)
    app.register_blueprint(main.bp, url_prefix='/api')
    app.register_blueprint(tarifas.bp, url_prefix='/api/tarifas')


    return app
