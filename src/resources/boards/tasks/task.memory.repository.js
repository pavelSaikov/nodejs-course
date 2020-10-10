const { Task } = require('./task.models');

let TASKS = [];

const gelAllTasks = async () => TASKS;

const getAllByBoardId = async boardId => {
  const searchedTask = TASKS.filter(t => t.boardId === boardId);
  return searchedTask;
};

const getById = async (boardId, id) => {
  return TASKS.find(t => t.id === id && t.boardId === boardId);
};

const addTask = async (boardId, newTask) => {
  const newTaskObj = new Task({ ...newTask, boardId });

  TASKS.push(newTaskObj);
  return newTaskObj;
};

const updateTask = async (boardId, taskId, updatedTask) => {
  const editableTask = TASKS.find(t => t.id === taskId);

  if (!editableTask) {
    return;
  }

  const otherTasks = TASKS.filter(t => t.id !== taskId);
  otherTasks.push({ ...updatedTask, id: taskId });
  TASKS = otherTasks;

  return updatedTask;
};

const deleteTask = async (boardId, id) => {
  const positionOfRemovedTask = TASKS.findIndex(
    t => t.id === id && t.boardId === boardId
  );

  if (positionOfRemovedTask === -1) {
    return false;
  }

  TASKS = TASKS.filter((v, i) => i !== positionOfRemovedTask);
  return true;
};

module.exports = {
  getAllByBoardId,
  getById,
  updateTask,
  addTask,
  deleteTask,
  gelAllTasks
};
