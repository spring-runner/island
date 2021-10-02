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

  // Continue the animation loop
  window.requestAnimationFrame(animate);
}

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

  // Begin the animation loop
  start_time = Date.now() / 1000;
  game_time = start_time;
  window.requestAnimationFrame(animate);
}
