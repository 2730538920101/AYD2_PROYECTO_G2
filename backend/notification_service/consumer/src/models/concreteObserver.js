const Observer = require('./observer');
const DBClient = require('../services/dbClient');

class ConcreteObserver extends Observer {
  async update(notification) {
    try {
      await DBClient.insertAlert(notification);
      console.log('Notification processed and inserted into DB:', notification);
    } catch (error) {
      console.error('Error processing notification:', error);
    }
  }
}

module.exports = ConcreteObserver;
