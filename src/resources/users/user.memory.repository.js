const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { User } = require('./user.models');
const { MODELS } = require('../../common/db');
const config = require('../../common/config');

const getAll = async () =>
  mongoose.models[MODELS.USER]
    .find({})
    .then(users => users.map(u => new User({ ...u.toObject(), id: u.id })));

const getByLogin = async login =>
  mongoose.models[MODELS.USER]
    .find({ login })
    .then(users => users.map(u => new User({ ...u.toObject(), id: u.id }))[0]);

const addUser = async ({ name, login, password }) => {
  const UserModel = mongoose.models[MODELS.USER];

  const encryptedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);
  const newUser = new UserModel({ login, name, password: encryptedPassword });
  await newUser.save();
  return new User({ ...newUser.toObject(), id: newUser.id });
};

const updateUser = async ({ id, name, login, password }) => {
  const UserModel = mongoose.models[MODELS.USER];

  try {
    await UserModel.findByIdAndUpdate(id, { name, login, password });
  } catch {
    return;
  }

  return new User({ id, name, login, password });
};

const deleteUser = async id => {
  const userModel = mongoose.models[MODELS.USER];

  try {
    await userModel.findByIdAndDelete(id);
  } catch {
    return false;
  }

  const tasksModel = mongoose.models[MODELS.TASK];
  const tasks = await tasksModel.find({});
  await Promise.all(
    tasks.map(t => {
      if (t.userId !== id) {
        return Promise.resolve();
      }

      return tasksModel.findByIdAndUpdate(t.id, {
        ...t.toObject(),
        userId: null
      });
    })
  );

  return true;
};

module.exports = { getAll, getByLogin, addUser, updateUser, deleteUser };
