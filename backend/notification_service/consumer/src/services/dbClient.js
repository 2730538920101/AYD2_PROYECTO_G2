const mysql = require('mysql2/promise');
const config = require('../config/config');

class DBClient {
  constructor() {
    this.config = config.db;
  }

  async getConnection() {
    return mysql.createConnection(this.config);
  }

  async insertAlert(alert) {
    const connection = await this.getConnection();
    const query = 'INSERT INTO ALERTA (type, message) VALUES (?, ?)';
    await connection.execute(query, [alert.type, alert.message]);
    await connection.end();
  }
}

module.exports = new DBClient();
