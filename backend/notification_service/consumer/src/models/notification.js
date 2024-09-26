class Notification {
  constructor(viajeId, type, message, adjunto, fechaHora) {
    this.viajeId = viajeId;
    this.type = type;
    this.message = message;
    this.adjunto = adjunto;
    this.fechaHora = fechaHora;
  }

  static fromJSON(json) {
    let data;

    try {
      // Verificar si 'json' ya es un objeto, si no, intentar parsearlo
      if (typeof json === 'string') {
        data = JSON.parse(json); // Intenta parsear si es una cadena
      } else if (typeof json === 'object' && json !== null) {
        data = json; // Si ya es un objeto, úsalo directamente
      } else {
        throw new Error('El formato del mensaje no es un JSON válido');
      }

      // Si data sigue siendo un string después del primer parseo, intentar nuevamente
      if (typeof data === 'string') {
        data = JSON.parse(data); // Volver a intentar parsear
      }

      // Extraer los valores del objeto data
      const viajeId = data.viajeId !== undefined ? data.viajeId : null;
      const type = data.type !== undefined ? data.type : '';
      const message = data.message !== undefined ? data.message : '';
      const adjunto = data.adjunto !== undefined ? data.adjunto : null;
      const fechaHora = data.fechaHora ? new Date(data.fechaHora) : new Date();

      // Devolver una nueva instancia de Notification con los valores extraídos
      return new Notification(viajeId, type, message, adjunto, fechaHora);

    } catch (error) {
      console.error('Error parsing JSON in Notification.fromJSON:', error.message);
      throw new Error('Invalid JSON format');
    }
  }
}

// Asegúrate de exportar correctamente la clase Notification
module.exports = Notification;
