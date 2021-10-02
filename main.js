var board = [];
const boardSize = 32;

function init() {
  console.log("Init Called");

  // Create the game board
  for (var row = 0; row < boardSize; row++) {
    board.push([]);
    for (var col = 0; col < boardSize; col++) {
      board[row].push(new Square(row, col));
    }
  }

  // Display board
  updateDisplay();
}
