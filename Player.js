function initPlayer() {
  player_row = Math.floor(boardSize / 2);
  player_col = Math.floor(boardSize / 2);
  player_dirt = 0;
  player_wood = 1024;

  document.onkeydown = function(e) {
    var key = event.key;
    var square = board[player_row][player_col];

    if (key == "ArrowDown") {
      player_row = Math.min(player_row + 1, boardSize - 1);
    } else if (key == "ArrowUp") {
      player_row = Math.max(player_row - 1, 0);
    } else if (key == "ArrowLeft") {
      player_col = Math.max(player_col - 1, 0);
    } else if (key == "ArrowRight") {
      player_col = Math.min(player_col + 1, boardSize - 1);
    } else if (key == "d") {
      // dig
      if (square.item == Item.wall) {
        // dig up a wall
        player_dirt += 1;
        square.item = Item.none;
      } if (square.item == Item.rail) {
        // dig up a railing
        square.item = Item.none;
      } else if (square.item == Item.tree) {
        // dig up a tree - get wood when halfway grown
        if (square.age > 30) {
          player_wood += 1;
        }
        square.item = Item.none;
      } else if (square.elevation > Elevation.beach &&
                 square.elevation < Elevation.lava) {
        // dig up the ground
        player_dirt += 1;
        square.elevation -= 1;
      }
    } else if (key == "f") {
      // fill the ground with some dirt
      if (player_dirt > 0 &&
          square.elevation >= Elevation.shallows &&
          square.elevation <= Elevation.plains) {
        player_dirt -= 1;
        square.elevation += 1;
      }
    } else if (key == "a") {
      // plant alfalfa
      if (square.elevation >= Elevation.beach &&
          square.elevation < Elevation.lava &&
          square.item == Item.none) {
        square.item = Item.alfalfa;
        square.age = 0;
      }
    } else if (key == "w") {
      // build a wall
      if (player_dirt > 0 &&
          square.item != Item.wall &&
          square.elevation >= Elevation.beach &&
          square.elevation < Elevation.lava) {
        square.item = Item.wall;
        player_dirt -= 1;
      }
    } else if (key == "t") {
      // build a tree
      if (square.item == Item.none &&
          square.elevation >= Elevation.beach &&
          square.elevation < Elevation.lava) {
        square.item = Item.tree;
        square.age = 0;
      }
    } else if (key == "r") {
      // build a railing
      if (square.item == Item.none &&
          square.elevation >= Elevation.beach &&
          square.elevation < Elevation.lava &&
          player_wood > 0) {
        square.item = Item.rail;
        player_wood -= 1;
      }
    }
  }
}

var playerX = 100;
var playerY = 100;
var speed = 24;
function movePlayer() {
    var keys = [];
  document.onkeydown = function() {
    var key = event.key
    console.log(key);
    if (key == "ArrowDown") {
      playerY += speed;
      event.preventDefault();
    }
    if (key == "ArrowUp") {
      playerY -= speed;
      event.preventDefault();
    }
    if (key == "ArrowLeft") {
      playerX -= speed;
      event.preventDefault();
    }
    if (key == "ArrowRight") {
      playerX += speed;
      event.preventDefault();
    }
  }
}
