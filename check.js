function elevAt(row, col) {
  if (row < boardSize && row > 0 && col < boardSize && col > 0) {
    return board[row][col].elevation;
  }else {
    return null;
  }
}
//row < boardSize && row > 0 && col < boardSize && col > 0
