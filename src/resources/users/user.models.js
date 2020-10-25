const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  login: String,
  password: String
});

class User {
  constructor({ name, login = 'user', password = 'P@55w0rd', id }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = { User, UserSchema };
