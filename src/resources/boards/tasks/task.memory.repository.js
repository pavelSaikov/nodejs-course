const mongoose = require('mongoose');

const { MODELS } = require('../../../common/db');
const { Task } = require('./task.models');

const gelAllTasks = async () =>
  mongoose.models[MODELS.TASK]
    .find({})
    .then(tasks => tasks.map(t => new Task({ ...t.toObject(), id: t.id })));

const getAllByBoardId = async boardId =>
  mongoose.models[MODELS.TASK]
    .find({ boardId })
    .then(tasks => tasks.map(t => new Task({ ...t.toObject(), id: t.id })));

const getById = async (boardId, id) => {
  const result = await mongoose.models[MODELS.TASK].findById(id);

  if (!result) {
    return result;
  }

  return new Task({ ...result.toObject(), id: result.id });
};

const addTask = async (boardId, newTask) => {
  const TaskModel = mongoose.models[MODELS.TASK];

  const task = new TaskModel({ ...newTask, boardId });
  await task.save();

  return new Task({ ...task.toObject(), id: task.id });
};

const updateTask = async (boardId, taskId, updatedTask) => {
  const TaskModel = mongoose.models[MODELS.TASK];

  try {
    await TaskModel.findByIdAndUpdate(taskId, { ...updatedTask });
  } catch {
    return;
  }

  return updatedTask;
};

const deleteTask = async (boardId, id) => {
  const TaskModel = mongoose.models[MODELS.TASK];

  try {
    await TaskModel.findByIdAndRemove(id);
  } catch {
    return;
  }

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
