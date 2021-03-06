var board = [];
const boardSize = 32;

var start_time = 0;
var game_time = 0;

function animate() {
  // Determine how much time has passed (dt) and update the game time.
  // Gap the simulated time at 0.1 seconds to avoid huge jumps.
  var now = (Date.now() / 1000) - start_time;
  var dt = Math.min(0.1, now - game_time);
  game_time = now;

  // Simulate wave physics
  simulatePhysics(dt);

  // Simulate squares
  simulateSquares(dt);

  // Update the display
  updateDisplay();

  // Update animals
  animals.update();

  // Draw animals
  animals.draw();

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

  // Generate the world.  Place some lava at random locations near the center.
  for (var i = 0; i < 6; ++i) {
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

  // Now do several rounds expanding land outward from the lava.
  var smooth = Array(boardSize).fill(0).map(x => Array(boardSize).fill(0));
  for (var i = 0; i < 10; ++i) {
    for (var r = 1; r + 1 < boardSize; ++r) {
      for (var c = 1; c + 1 < boardSize; ++c) {
        smooth[r][c] = Math.max(
          board[r][c].elevation,
          Math.round((
            board[r - 1][c].elevation +
            board[r + 1][c].elevation +
            board[r][c - 1].elevation +
            board[r][c + 1].elevation +
            2 * Math.random()) / 4));
      }
    }
    for (var r = 1; r + 1 < boardSize; ++r) {
      for (var c = 1; c + 1 < boardSize; ++c) {
        board[r][c].elevation = smooth[r][c];
      }
    }
  }

  // Sprinkle a bit more lava
  for (var i = 0; i < 6; ++i) {
    r = Math.floor(boardSize * Math.random());
    c = Math.floor(boardSize * Math.random());
    board[r][c].elevation = Elevation.lava;
  }
}

var animals;

function init() {

  makeWorld();

  // Initialize various systems...
  initAudio();
  initImlib();
  initPhysics();
  initPlayer();

  animals = new Animals();

  // Display board for the first time
  updateDisplay();

  // Begin the animation loop
  start_time = Date.now() / 1000;
  game_time = 0;
  window.requestAnimationFrame(animate);
}
