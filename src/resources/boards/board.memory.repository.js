const { Board, Column } = require('./board.models');

let BOARDS = [
  new Board({
    title: 'board-1',
    columns: [
      { title: 'column-1', order: 1 },
      { title: 'column-2', order: 2 }
    ]
  }),
  new Board({
    title: 'board-2',
    columns: [
      { title: 'column-1', order: 1 },
      { title: 'column-2', order: 2 }
    ]
  })
];

const getAllBoards = async () => BOARDS;

const getBoardById = async boardId => BOARDS.find(b => b.id === boardId);

const addBoard = async boardPrototype => {
  const columns = boardPrototype.columns.map(
    ({ title, order }) => new Column({ title, order })
  );
  const board = new Board({ title: boardPrototype.title, columns });

  BOARDS.push(board);

  return board;
};

const updateBoard = async updatedBoard => {
  const otherBoards = BOARDS.filter(b => b.id !== updatedBoard.id);
  otherBoards.push(updatedBoard);
  BOARDS = otherBoards;

  return updatedBoard;
};

const deleteBoard = async id => {
  const newBoardsList = BOARDS.filter(b => b.id !== id);

  if (newBoardsList.length === BOARDS.length) {
    return false;
  }

  BOARDS = newBoardsList;
  return true;
};
module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
