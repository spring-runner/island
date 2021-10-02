
const TILE_SIZE = 32;

const WORLD_IMAGE_WIDTH = 69;
const WORLD_IMAGE_HEIGHT = 35;
const WORLD_IMAGE_BORDER = 1;
const WORLD_IMAGE_PADDING = 1;
const WORLD_IMAGE_TILE_SIZE = 16;

var worldImg = new Image();
worldImg.src = "Assets/land_and_sea.png";
worldImg.onload = function() {
  updateDisplay();
}

function updateDisplay() {
  updateWorld();
}

function updateWorld() {
  var canvas = document.getElementById('gameBoard');
  var ctx = canvas.getContext('2d');
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      var tileDepth = board[row][col].elevation;
      tile = getWorldTileForDepth(tileDepth);
      ctx.drawImage(worldImg, tile[0],tile[1], tile[2], tile[3],
      row*TILE_SIZE, col*TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }

  // Display waves
  var middle = board.length * TILE_SIZE / 2;
  for (var i = 0; i < waves.waves.length; ++i) {
    var wave = waves.waves[i];
    var px = middle + wave.x;
    var py = middle - wave.y;
    ctx.beginPath();
    ctx.arc(px, py, 10, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

function getWorldTileForDepth(depth) {
  // The world tile file is layed out with 2 rows of 4 tiles.
  // The tile depths are:
  // +2 +1 0 -1
  // -2 -3 -4 -5
  // where 2 to 0 are land, -1 to -4 are partially sunken Island
  // and -5 is sea.

  // Assume we're in row 1.
  var sy = WORLD_IMAGE_BORDER;

  // Figure out if we are in 2.
  if (depth < -1) {
    sy = WORLD_IMAGE_BORDER + WORLD_IMAGE_TILE_SIZE + WORLD_IMAGE_PADDING;
  }

  // Now get the x offset.
  if (depth < -1) {
    // If we're in the second row, just pretend it's the first
    // row to keep the logic simpler.
    depth = depth + 4;
  }
  var imageOffset = 2 - depth;
  var sx = WORLD_IMAGE_BORDER +
    imageOffset * (WORLD_IMAGE_TILE_SIZE + WORLD_IMAGE_PADDING);
  return [sx, sy, WORLD_IMAGE_TILE_SIZE, WORLD_IMAGE_TILE_SIZE];
}
