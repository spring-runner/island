var playerX = 100;
var playerY = 100;
var speed = 10;
function movePlayer() {
    var keys = [];
  document.onkeydown = function() {
    var key = event.key
    console.log(key);
    if (key == "ArrowDown") {
      playerY += speed;
    }
    if (key == "ArrowUp") {
      playerY -= speed;
    }
    if (key == "ArrowLeft") {
      playerX -= speed;
    }
    if (key == "ArrowRight") {
      playerX += speed;
    }
  }
}
