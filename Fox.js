var range = 100;
var chicks = [[0, 0], [150, 200], [30, 100]];
var foxx = 150;
var foxy = 150;

c = document.getElementById("canvas");
ctx = c.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 300, 300);
ctx.fillStyle = "blue";
ctx.strokeStyle = "red";
ctx.fillRect(145, 145, 10, 10);
path(nextPos(chicks), "white")

function path(points, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(points[0][0],points[0][1]);
  for (var i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.stroke()
}


function nextPos(chickinCords) {
  var denominatorX = 0;
  var numeratorX = 0;
  var denominatorY = 0;
  var numeratorY = 0;
  for (var i = 0; i < chickinCords.length; i++) {
    let x = chickinCords[i][0];
    let y = chickinCords[i][1];
    let distanceX = chickinCords[i][0] - foxx;
    let distanceY = chickinCords[i][1] - foxy;
    if ((Math.abs(distanceX) < range) && (Math.abs(distanceY) < range)) {
      var weightX = Math.pow(range - Math.abs(distanceX), 2);
      denominatorX += weightX;
      numeratorX += weightX * distanceX;

      var weightY = Math.pow(range - Math.abs(distanceY), 2);
      denominatorY += weightY;
      numeratorY += weightY * distanceY;
    }
   }
   xDelta = numeratorX / denominatorX;
   yDelta = numeratorY / denominatorY;
   console.log([xDelta, yDelta]);
   return [xDelta, yDelta];
 }
