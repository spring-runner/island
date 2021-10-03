
// World constants
const TILE_SIZE = 24;
const BOARD_SIZE_PX = TILE_SIZE * boardSize;

// Asset constants
const WORLD_IMAGE_WIDTH = 69;
const WORLD_IMAGE_HEIGHT = 35;
const WORLD_IMAGE_BORDER = 1;
const WORLD_IMAGE_PADDING = 1;
const WORLD_IMAGE_TILE_SIZE = 16;

const IMAGES = {};
const PLAYER_HEIGHT = 28;
const PLAYER_WIDTH = 36;

let playerIsLoaded;

var worldImg = new Image();
worldImg.src = "Assets/land_and_sea.png";
worldImg.onload = function() {
  updateDisplay();
}

var playerImg = new Image();
playerImg.src = "Assets/Player.png";
playerImg.onload = function() {
  console.log("we have loaded the player once and never again");
}

function updateDisplay() {
  updateWorld();
  updatePlayer();
}

function updateWorld() {
  const elevationColor = [
    "#000090",
    "#0000a8",
    "lightgreen",
    "mediumseagreen",
    "seagreen",
    "gray",
  ];

  ctx = gameBoard.getContext("2d");
  for (var row = 0; row < boardSize; ++row) {
    for (var col = 0; col < boardSize; ++col) {
      var square = board[row][col];
      var px = col * TILE_SIZE;
      var py = row * TILE_SIZE;
      ctx.fillStyle = elevationColor[square.elevation];
      ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
    }
  }

  // Display wind indicator
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(50, 50);
  var speed = wind.speed(game_time);
  var direction = wind.direction(game_time);
  ctx.lineTo(50 + 10 * speed * Math.cos(direction),
             50 - 10 * speed * Math.sin(direction));
  ctx.stroke();

  // Display waves
  ctx.strokeStyle = "black";
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



function updatePlayer() {

  var canvas = document.getElementById('gameBoard');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(playerImg, 0, 0, PLAYER_WIDTH, PLAYER_HEIGHT,
  playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT)
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

function loadImages() {
  if (location.href.slice(0, 4) == "file") {
    console.warn("Cannot load images using the file:/// protocol");
    return
  }
  if ((new URLSearchParams(location.search)).get("block-loader") == "true") {
    return
  }
  var loader = new ImageLoader();
  IMAGES.GROUND = loader.load("Assets/land_and_sea.png").spritesheet({rows:2, cols:3, gap:1, border:1});
}

loadImages();
