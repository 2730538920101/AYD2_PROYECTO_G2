class Notification {
  constructor(type, message, viajeId, adjunto, fechaHora = new Date()) {
    this.type = type;
    this.message = message;
    this.viajeId = viajeId;
    this.adjunto = adjunto;
    this.fechaHora = fechaHora;
  }

  toJSON() {
    return {
      type: this.type,
      message: this.message,
      viajeId: this.viajeId,
      adjunto: this.adjunto,
      fechaHora: this.fechaHora,
    };
  }
}

module.exports = Notification;
