const { v4: uuidv4 } = require('uuid');

class User {
  constructor({ name, login = 'user', password = 'P@55w0rd' } = {}) {
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
