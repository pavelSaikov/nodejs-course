const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    title = 'task-title',
    order = 1,
    description = 'task-description',
    userId = 'user-id',
    boardId = 'board-id',
    columnId = 'column-id'
  }) {
    this.id = uuidv4();
    this.order = order;
    this.title = title;
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

module.exports = { Task, checkIsNewRequestTaskValid, checkIsUpdatedTaskValid };
