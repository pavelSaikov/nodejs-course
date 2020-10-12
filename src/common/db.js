const mongoose = require('mongoose');

const { MONGO_CONNECTION_STRING } = require('./config');
const { TaskSchema } = require('../resources/boards/tasks/task.models');
const { UserSchema } = require('../resources/users/user.models');
const { BoardSchema } = require('../resources/boards/board.models');

let isConnected = false;

const MODELS = {
  USER: 'User',
  TASK: 'Task',
  BOARD: 'Board'
};

const getConnection = async () =>
  isConnected
    ? Promise.resolve(mongoose)
    : mongoose
        .connect(MONGO_CONNECTION_STRING, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        })
        .then(() => (isConnected = true))
        .then(() => {
          mongoose.model(MODELS.TASK, TaskSchema);
          mongoose.model(MODELS.USER, UserSchema);
          mongoose.model(MODELS.BOARD, BoardSchema);
        })
        .then(() => mongoose);

module.exports = { getConnection, MODELS };
