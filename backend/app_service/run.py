from app import create_app
from config import Config
from flask_cors import CORS  # Importar la extensión CORS
from app.controllers.administrador_controller import AdministradorController  # Importar el controlador de administrador
from flask import request, Response
app = create_app()
app.config.from_object(Config)

# Configurar CORS
CORS(app, resources={r"/*": {"origins": "*"}})  # Permitir solicitudes desde cualquier origen
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res

def inicializar_administrador():
    """
    Inicializa el administrador predeterminado al iniciar el servidor.
    """
    admin_controller = AdministradorController()

    # Datos del administrador inicial
    
    usuario = app.config['ADMIN_EMAIL']
    contrasenia = app.config['ADMIN_PASSWORD']   
    validacion = app.config['ADMIN_VALIDATION']

    # Inicializar al administrador si no existe
    admin_controller.inicializar_administrador(
        usuario=usuario,
        contrasenia=contrasenia,
        validacion=validacion
    )

if __name__ == "__main__":
    # Inicializar el administrador predeterminado al arrancar el servidor
    inicializar_administrador()

    # Obtener el puerto y el host desde la configuración
    port = app.config['APP_PORT']
    host = app.config['APP_HOST']
    app.run(host=host, port=port, debug=True)
    
    ## Producción
    ## from werkzeug.middleware.proxy_fix import ProxyFix
    ## app.wsgi_app = ProxyFix(app.wsgi_app)
    ## app.run(host="0.0.0.0", port=port)
