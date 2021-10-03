const Elevation = {
  "depths" : 0,
  "shallows" : 1,
  "beach" : 2,
  "plains" : 3,
  "heights" : 4,
  "lava" : 5,
};

function Square(row, col) {
  this.row = row;
  this.col = col;
  this.elevation = Elevation.depths;
}
