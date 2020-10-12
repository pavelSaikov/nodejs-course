const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, default: 'task-title' },
  order: { type: Number, default: 1 },
  description: { type: String, default: 'task-description' },
  userId: { type: String, default: 'user-id' },
  boardId: { type: String, default: 'board-id' },
  columnId: { type: String, default: 'column-id' }
});

class Task {
  constructor({
    id,
    title = 'task-title',
    order = 1,
    description = 'task-description',
    userId = 'user-id',
    boardId = 'board-id',
    columnId = 'column-id'
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

const checkIsNewRequestTaskValid = task =>
  task.title && typeof task.order === 'number';

const checkIsUpdatedTaskValid = task =>
  task.title && task.boardId && typeof task.order === 'number';

module.exports = {
  Task,
  TaskSchema,
  checkIsNewRequestTaskValid,
  checkIsUpdatedTaskValid
};
