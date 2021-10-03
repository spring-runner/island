
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
const PLAYER_HEIGHT = 10;
const PLAYER_WIDTH = 18;

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

  // Display waves
  var middle = board.length * TILE_SIZE / 2;
  var side_x = wind.uy * TILE_SIZE / 2;
  var side_y = - wind.ux * TILE_SIZE / 2;
  for (var i = 0; i < wave_list.length; ++i) {
    var wave = wave_list[i];
    var px = middle + wave.x;
    var py = middle - wave.y;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(px - side_x, py + side_y);
    ctx.lineTo(px + side_x, py - side_y);
    ctx.stroke();
  }
}

function updatePlayer() {
  const player_height = 10;
  const player_width = 18;

  var ctx = gameBoard.getContext("2d");
  ctx.drawImage(playerImg,
    0, 0, player_width, player_height,
    player_col * TILE_SIZE + (TILE_SIZE - player_width) / 2,
    player_row * TILE_SIZE + (TILE_SIZE - player_height) / 2,
    player_width, player_height);

  /*
  var canvas = document.getElementById('gameBoard');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(playerImg, 0, 0, PLAYER_WIDTH, PLAYER_HEIGHT,
  playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
  */
}

function loadImages() {
  if (location.protocol != "http:" && location.protocol != "https:") {
    console.warn("Cannot load images via the " + location.protocol + " protocol. Aborted loadImages");
    return
  }
  ImageLoader.load("Assets/land_and_sea.png", function (img) {
    IMAGES.GROUND = img.spritesheet({rows:2, cols:4, gap:1, border:1});
  });
}

loadImages();
