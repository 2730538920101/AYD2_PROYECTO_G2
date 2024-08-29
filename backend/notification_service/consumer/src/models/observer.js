class Observer {
    update(notification) {
      // Método a ser implementado por las subclases
      throw new Error('Observer update method must be implemented');
    }
  }
  
  module.exports = Observer;
  