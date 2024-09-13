from flask import Flask
from app.routes import main, tarifas, clientes

def create_app():
    app = Flask(__name__)
    app.register_blueprint(main.bp, url_prefix='/api')
    app.register_blueprint(tarifas.bp, url_prefix='/api/tarifas')
    app.register_blueprint(clientes.bp, url_prefix='/api/clientes')


    return app
