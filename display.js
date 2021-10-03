
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
  console.log("World images loaded.");
}

var playerImg = new Image();
playerImg.src = "Assets/Player.png";
playerImg.onload = function() {
  console.log("Player image loaded.");
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
      if (square.item == Item.wall) {
        ctx.fillStyle = "saddlebrown";
        ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      } else if (square.item == Item.alfalfa) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      } else if (square.item == Item.tree) {
        ctx.fillStyle = elevationColor[square.elevation];
        ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
        drawSprite(ctx, "trees", Math.min(Math.floor(square.age / 15), 3), px, py);
      } else if (square.item == Item.rail) {
        ctx.fillStyle = elevationColor[square.elevation];
        ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
        drawSprite(ctx, "rail", 3, px, py);
      } else {
        ctx.fillStyle = elevationColor[square.elevation];
        ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
      }
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

  drawSprite(ctx, "gull", Math.floor((game_time * 10) % 5), 200, 200);
}

function updatePlayer() {
  const player_height = 10;
  const player_width = 18;

  var ctx = gameBoard.getContext("2d");

  drawSprite(ctx, "player", Math.floor((game_time * 10) % 8),
    player_col * TILE_SIZE + (TILE_SIZE - player_width) / 2,
    player_row * TILE_SIZE + (TILE_SIZE - player_height) / 2);

  inventory_dirt_div.innerHTML = player_dirt;
  inventory_wood_div.innerHTML = player_wood;
  inventory_landmass_div.innerHTML = landmass;
}

function loadImages() {
  if (location.protocol != "http:" && location.protocol != "https:") {
    console.warn("Cannot load images via the " + location.protocol + " protocol. Aborted loadImages");
    return
  }
  var toLoad = 2;
  ImageLoader.load("Assets/trees.png", function (img) {
    IMAGES.TREES = img.spritesheet({rows:2, cols:2, gap:0, border:0});
    toLoad--;
    tryInit();
  });
  ImageLoader.load("Assets/chicken.png", function (img) {
    IMAGES.CHICKEN = img.spritesheet({rows:1, cols:2, gap:0, border:0});
    toLoad--;
    tryInit();
  });
  function tryInit() {
    if (toLoad == 0) {
      init();
    }
  }
}

function preload() {
  loadImages();
}
