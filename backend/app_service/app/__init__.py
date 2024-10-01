from flask import Flask
from app.routes import main, tarifas, clientes, conductores, administrador, asistentes, auth, viaje

def create_app():
    app = Flask(__name__)
    app.register_blueprint(main.bp, url_prefix='/api')
    app.register_blueprint(tarifas.bp, url_prefix='/api/tarifas')
    app.register_blueprint(clientes.bp, url_prefix='/api/clientes')
    app.register_blueprint(conductores.bp, url_prefix='/api/conductores')
    app.register_blueprint(asistentes.bp, url_prefix='/api/asistentes')
    app.register_blueprint(viaje.bp, url_prefix='/api/viaje')
    app.register_blueprint(administrador.bp, url_prefix='/api/administrador')
    app.register_blueprint(auth.bp, url_prefix='/api/auth')

    return app
