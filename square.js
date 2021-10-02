function Square(row, col) {
  this.row = row;
  this.col = col;
  this.elevation = Math.floor(
    ((Math.cos(row * 0.21 + 0.6) + Math.sin(col * 0.14 + 1.83) + 2) / 4) * 8 - 5);
}
