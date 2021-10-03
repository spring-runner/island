
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
const PLAYER_HEIGHT = 24;
const PLAYER_WIDTH = 24;

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

function loadImages() {
  if (location.href.slice(0, 4) == "file") {
    console.warn("Cannot load images using the file:/// protocol");
    return
  }
  if ((new URLSearchParams(location.search)).get("block-loader") == "true") {
    return
  }
  ImageLoader.load("Assets/land_and_sea.png", function (img) {
    IMAGES.GROUND = img.spritesheet({rows:2, cols:4, gap:1, border:1});
  });
}

loadImages();
