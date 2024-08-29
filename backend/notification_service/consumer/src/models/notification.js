class Notification {
  constructor(type, message) {
    this.type = type;
    this.message = message;
  }

  static fromJSON(json) {
    const data = JSON.parse(json);
    return new Notification(data.type, data.message);
  }

  toString() {
    return JSON.stringify({
      type: this.type,
      message: this.message,
    });
  }
}

module.exports = Notification;
