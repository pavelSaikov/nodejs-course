const uuid = require('uuid');
const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema(
  {
    id: String,
    title: { type: String, default: 'column-title' },
    order: { type: Number, default: 1 }
  },
  { _id: false }
);

const BoardSchema = new mongoose.Schema({
  title: { type: String, default: 'table-title' },
  columns: { type: [ColumnSchema], default: [] }
});

class Column {
  constructor({ id = uuid.v4(), title = 'column-title', order = 1 }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({ id, title, columns }) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

const checkIsRequestBoardValid = board => {
  const { title, columns } = board;
  let isBoardValid = true;

  if (!title || !columns) {
    isBoardValid = false;
  }

  if (columns) {
    columns.forEach(i => {
      if (!i.title || typeof i.order !== 'number') {
        isBoardValid = false;
      }
    });
  }

  return isBoardValid;
};

module.exports = {
  BoardSchema,
  ColumnSchema,
  Board,
  Column,
  checkIsRequestBoardValid
};
