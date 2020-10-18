const usersRepo = require('./user.memory.repository');
const tasksService = require('../boards/tasks/task.service');

const getAll = () => usersRepo.getAll();

const getByLogin = login => usersRepo.getByLogin(login);

const addUser = user => usersRepo.addUser(user);

const updateUser = user => usersRepo.updateUser(user);

const deleteUser = async id => {
  const result = await usersRepo.deleteUser(id);

  const allTasks = await tasksService.getAllTasks();
  await Promise.all(
    allTasks.map(t => {
      if (t.userId !== id) {
        return Promise.resolve();
      }

      return tasksService.updateTask(t.boardId, t.id, { ...t, userId: null });
    })
  );

  return result;
};

module.exports = { getAll, getByLogin, addUser, updateUser, deleteUser };
