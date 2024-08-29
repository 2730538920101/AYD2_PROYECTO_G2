const Observer = require('./observer');

class ConcreteObserver extends Observer {
  update(notification) {
    // Implementar la lógica específica para este observador
    console.log('Received notification:', notification);
  }
}

module.exports = ConcreteObserver;
