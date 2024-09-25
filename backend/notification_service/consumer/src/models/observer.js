class Observer {
  update(notification) {
    throw new Error('Observer update method must be implemented');
  }
}

module.exports = Observer;
