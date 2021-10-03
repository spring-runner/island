var board = [];
const boardSize = 32;

var start_time = 0;
var game_time = 0;

// Create wind and waves
const NUM_WAVES = 20;
var wind = new Wind();
var waves = new Waves(wind, NUM_WAVES);

function animate() {
  // Determine how much time has passed (dt) and update the game time.
  // Gap the simulated time at 0.1 seconds to avoid huge jumps.
  var now = (Date.now() / 1000) - start_time;
  var dt = Math.min(0.1, now - game_time);
  game_time = now;

  // Simulate waves
  waves.simulate(dt);

  // Update the display
  updateDisplay();

  movePlayer()
  // Continue the animation loop
  window.requestAnimationFrame(animate);
}

function makeWorld() {
  // Create the game board
  for (var row = 0; row < boardSize; row++) {
    board.push([]);
    for (var col = 0; col < boardSize; col++) {
      board[row].push(new Square(row, col));
    }
  }

  // Generate the world.  Place some lava.
  for (var i = 0; i < 10; ++i) {
    var r = 0;
    var c = 0;
    for (var j = 0; j < 10; ++j) {
      r += Math.random();
      c += Math.random();
    }
    r = Math.floor(boardSize * r / 10);
    c = Math.floor(boardSize * c / 10);
    board[r][c].elevation = Elevation.lava;
  }

  // Now grow outward from the lava.
  var grows = 0;
  while (grows < 500) {
    var r = Math.floor(Math.random() * (boardSize - 2) + 1);
    var c = Math.floor(Math.random() * (boardSize - 2) + 1);
    var square = board[r][c];
    if (square.elevation < Elevation.lava) {
      var elev =
          Math.ceil((board[r-1][c].elevation +
                     board[r+1][c].elevation +
                     board[r][c-1].elevation +
                     board[r][c+1].elevation) / 4);
      if (elev > square.elevation) {
        square.elevation = elev;
        grows += 1;
      }
    }
  }
}

function init() {
  makeWorld();

  // Display board
  updateDisplay();

  // Begin the animation loop
  start_time = Date.now() / 1000;
  game_time = start_time;
  window.requestAnimationFrame(animate);
}
