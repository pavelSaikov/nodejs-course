const taskRepo = require('./task.memory.repository');

const getAllByBoardId = boardId => taskRepo.getAllByBoardId(boardId);

const getById = (boardId, id) => taskRepo.getById(boardId, id);

const addTask = (boardId, newTask) => taskRepo.addTask(boardId, newTask);

const updateTask = (boardId, taskId, updatedTask) =>
  taskRepo.updateTask(boardId, taskId, updatedTask);

const deleteTask = (boardId, id) => taskRepo.deleteTask(boardId, id);

const getAllTasks = () => taskRepo.gelAllTasks();

module.exports = {
  getAllByBoardId,
  getById,
  updateTask,
  addTask,
  deleteTask,
  getAllTasks
};
