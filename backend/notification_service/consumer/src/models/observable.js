class Observable {
    constructor() {
      this.observers = [];
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    removeObserver(observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    notify(notification) {
      this.observers.forEach(observer => observer.update(notification));
    }
  }
  
  module.exports = Observable;
  