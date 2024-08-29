from app import create_app
from config import Config
from flask_cors import CORS  # Importar la extensión CORS

app = create_app()
app.config.from_object(Config)

# Configurar CORS
CORS(app, resources={r"/*": {"origins": "*"}})  # Permitir solicitudes desde cualquier origen

if __name__ == "__main__":
    # Obtener el puerto y el host desde la configuración
    port = app.config['APP_PORT']
    host = app.config['APP_HOST']
    app.run(host=host, port=port, debug=True)
    
    ## Producción
    ## from werkzeug.middleware.proxy_fix import ProxyFix
    ## app.wsgi_app = ProxyFix(app.wsgi_app)
    ## app.run(host="0.0.0.0", port=port)
