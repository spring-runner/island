var board = [];
const boardSize = 32;

// Create wind and waves
const NUM_WAVES = 5;
var wind = new Wind();
var waves = new Waves(wind, NUM_WAVES);

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
