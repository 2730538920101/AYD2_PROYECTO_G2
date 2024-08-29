// controllers/mainController.js

// Método para la ruta raíz ('/')
exports.hello = (req, res, next) => {
    try {
      res.status(200).json({ message: 'Hello from Consumer Service!' });
    } catch (error) {
      next(error);
    }
  };
  
  // Método para la ruta de salud ('/health')
  exports.health = (req, res, next) => {
    try {
      res.status(200).json({ status: 'OK', timestamp: new Date() });
    } catch (error) {
      next(error);
    }
  };
  