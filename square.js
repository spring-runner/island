const Elevation = {
  "depths" : 0,
  "shallows" : 1,
  "beach" : 2,
  "plains" : 3,
  "heights" : 4,
  "lava" : 5,
};

const Item = {
  "none" : 0,
  "alfalfa" : 1,
  "wall" : 2,
  "tree" : 3,
  "rail" : 4,
  "egg" : 5,
};

function Square(row, col) {
  this.row = row;
  this.col = col;
  this.elevation = Elevation.depths;
  this.item = Item.none;
  this.age = 0;
}

var landmass = 0;

function simulateSquares(dt) {
  landmass = 0;
  for (var row = 0; row < boardSize; ++row) {
    for (var col = 0; col < boardSize; ++col) {
      var square = board[row][col];

      if (square.item == Item.alfalfa) {
        square.age += dt;
        if (square.age > 60) {
          square.item = Item.none;
          // Alfalfa... eventually dies?
        }
      } else if (square.item == Item.tree) {
        square.age += dt;
        if (square.age > 60) {
          square.item = Item.none;
          if (square.elevation + 1 < Elevation.lava) {
            square.elevation += 1;
            player_wood += 1;
          }
        }
      }

      landmass += Math.max(square.elevation - Elevation.shallows, 0);
    }
  }
}
