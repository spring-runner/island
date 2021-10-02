var board = [];
const boardSize = 32;
function init() {
  console.log("Init Called");
  for (var row = 0; row < boardSize; row++) {
    board.push([]);
    for (var col = 0; col < boardSize; col++) {
      board[row].push(1);
    }
  }
}
