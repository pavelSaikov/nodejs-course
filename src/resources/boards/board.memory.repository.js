const mongoose = require('mongoose');
const { MODELS } = require('../../common/db');

const { Board, Column } = require('./board.models');

const getAllBoards = async () =>
  mongoose.models[MODELS.BOARD]
    .find({})
    .then(boards => boards.map(b => new Board({ ...b.toObject(), id: b.id })));

const getBoardById = async boardId => {
  try {
    const board = await mongoose.models[MODELS.BOARD].findById(boardId);
    return new Board({ ...board.toObject(), id: board.id });
  } catch (e) {
    return;
  }
};

const addBoard = async boardPrototype => {
  const columns = boardPrototype.columns.map(
    ({ title, order }) => new Column({ title, order })
  );

  const BoardModel = mongoose.models[MODELS.BOARD];
  const board = new BoardModel({ title: boardPrototype.title, columns });
  await board.save();

  return new Board({ ...board.toObject(), id: board.id });
};

const updateBoard = async updatedBoard => {
  await mongoose.models[MODELS.BOARD].findByIdAndUpdate(
    updatedBoard.id,
    updatedBoard
  );

  return updatedBoard;
};

const deleteBoard = async id => {
  try {
    await mongoose.models[MODELS.BOARD].findByIdAndDelete(id);
  } catch {
    return false;
  }

  return true;
};
module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
