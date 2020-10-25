const mongoose = require('mongoose');

const { User } = require('./user.models');
const { MODELS } = require('../../common/db');

const getAll = async () =>
  mongoose.models[MODELS.USER]
    .find({})
    .then(users => users.map(u => new User({ ...u.toObject(), id: u.id })));

const addUser = async ({ name, login, password }) => {
  const UserModel = mongoose.models[MODELS.USER];
  const newUser = new UserModel({ login, name, password });
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
  // const tasks = await taskService.getAllTasks();
  // await Promise.all(
  //   tasks.map(t => {
  //     if (t.userId === id) {
  //       return taskService.updateTask(t.boardId, t.id, { ...t, userId: null });
  //     }

  //     return Promise.resolve();
  //   })
  // );

  return true;
};

module.exports = { getAll, addUser, updateUser, deleteUser };
