const User = require('./user.models');
const taskService = require('../boards/tasks/task.service');

let USERS = [
  new User({ name: 'user1' }),
  new User({ name: 'user2' }),
  new User({ name: 'user2' })
];

const getAll = async () => USERS;

const addUser = async ({ name, login, password }) => {
  const newUser = new User({ login, name, password });
  USERS.push(newUser);
  return newUser;
};

const updateUser = async ({ id, name, login, password }) => {
  const otherUsers = USERS.filter(u => u.id !== id);

  if (otherUsers.length === USERS.length) {
    return;
  }

  const updatedUser = { id, name, login, password };
  otherUsers.push(updatedUser);
  USERS = otherUsers;

  return updatedUser;
};

const deleteUser = async id => {
  const newUsers = USERS.filter(u => u.id !== id);

  if (newUsers.length === USERS.length) {
    return false;
  }

  USERS = newUsers;

  const tasks = await taskService.getAllTasks();
  await Promise.all(
    tasks.map(t => {
      if (t.userId === id) {
        return taskService.updateTask(t.boardId, t.id, { ...t, userId: null });
      }

      return Promise.resolve();
    })
  );

  return true;
};

module.exports = { getAll, addUser, updateUser, deleteUser };
