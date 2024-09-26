const mysql = require('mysql2/promise');
const config = require('../config/config');

class DBService {
  constructor() {
    this.config = config.db;
  }

  async getConnection() {
    return mysql.createConnection(this.config);
  }

  async insertAlert(alert) {
    const connection = await this.getConnection();
    const query = `
      INSERT INTO Alerta (VIAJE_VIA_ID, TIPO_ALERTA, MENSAJE, ADJUNTO, FECHA_HORA) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const viajeViaId = alert.viajeId || null;
    const adjunto = alert.adjunto || null;
    const fechaHora = alert.fechaHora || new Date();

    await connection.execute(query, [viajeViaId, alert.type, alert.message, adjunto, fechaHora]);
    await connection.end();
  }
}

module.exports = new DBService();
