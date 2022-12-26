const Player = require("./player");

class PlayerOne extends Player {
  move(matrix) {
    let next = [
      this.position[0] + Player.dirs[this.direction][0],
      this.position[1] + Player.dirs[this.direction][1],
    ];
    if (next[0] >= matrix.length) next[0] = 0;
    if (next[0] < 0) next[0] = matrix.length - 1;
    if (next[1] < 0) next[1] = matrix[0].length - 1;
    if (next[1] >= matrix[0].length) next[1] = 0;

    while (matrix[next[0]][next[1]] === " ") {
      next[0] += Player.dirs[this.direction][0];
      next[1] += Player.dirs[this.direction][1];

      if (next[0] >= matrix.length) next[0] = 0;
      if (next[0] < 0) next[0] = matrix.length - 1;
      if (next[1] < 0) next[1] = matrix[0].length - 1;
      if (next[1] >= matrix[0].length) next[1] = 0;
    }

    if (matrix[next[0]][next[1]] === ".") {
      this.position = next;
      return true;
    } else if (matrix[next[0]][next[1]] === "#") {
      return false;
    }

    return false;
  }
}

module.exports = PlayerOne;
