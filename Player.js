function initPlayer() {
  player_row = Math.floor(boardSize / 2);
  player_col = Math.floor(boardSize / 2);

  document.onkeydown = function(e) {
    var key = event.key;
    
    if (key == "ArrowDown") {
      player_row = Math.min(player_row + 1, boardSize - 1);
    } else if (key == "ArrowUp") {
      player_row = Math.max(player_row - 1, 0);
    } else if (key == "ArrowLeft") {
      player_col = Math.max(player_col - 1, 0);
    } else if (key == "ArrowRight") {
      player_col = Math.min(player_col + 1, boardSize - 1);
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
