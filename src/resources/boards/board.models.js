const { v4: uuidv4 } = require('uuid');

class Column {
  constructor({ title = 'column-title', order = 1 }) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
  }

  getId() {
    return this.id;
  }
}

class Board {
  constructor({ title = 'table-title', columns = [] } = {}) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }

  getId() {
    return this.id;
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

module.exports = { Board, Column, checkIsRequestBoardValid };
