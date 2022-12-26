const Player = require("./player");

const SIDE = 49;

class PlayerTwo extends Player {
  constructor(position, direction, side) {
    super(position, direction);

    this.side = side;
  }

  isInside(pos, side) {
    return (
      side.top <= pos[0] &&
      pos[0] <= side.bottom &&
      side.left <= pos[1] &&
      pos[1] <= side.right
    );
  }

  getTransposingDir(pos, side) {
    if (pos[0] < side.top) return 3; // top
    if (pos[0] > side.bottom) return 1; // bottom
    if (pos[1] < side.left) return 2; // left
    if (pos[1] > side.right) return 0; // right

    throw new Error(JSON.stringify({ p: pos, side }));
  }

  getRelativePosition() {
    return [
      this.position[0] - this.side.top,
      this.position[1] - this.side.left,
    ];
  }

  getNewRelativePosition(inSide, outSide, point) {
    let dx = 0;
    if (inSide === 0) {
      dx = SIDE - point[0];
    } else if (inSide === 1) {
      dx = point[1];
    } else if (inSide === 2) {
      dx = point[0];
    } else if (inSide === 3) {
      dx = SIDE - point[1];
    }

    if (outSide === 0) {
      return [SIDE - dx, SIDE];
    } else if (outSide === 1) {
      return [SIDE, dx];
    } else if (outSide === 2) {
      return [dx, 0];
    } else if (outSide === 3) {
      return [0, SIDE - dx];
    }
  }

  move(matrix) {
    let next = [
      this.position[0] + Player.dirs[this.direction][0],
      this.position[1] + Player.dirs[this.direction][1],
    ];

    if (!this.isInside(next, this.side)) {
      const dir = this.getTransposingDir(next, this.side);
      const newSide = this.side.getNeighbor(dir);
      let neighborDir = 0;
      while (newSide.getNeighbor(neighborDir) !== this.side) {
        neighborDir++;
      }

      const relativePos = this.getRelativePosition();
      const newRelativePos = this.getNewRelativePosition(
        dir,
        neighborDir,
        relativePos
      );

      this.side = newSide;
      this.direction = (neighborDir + 2) % 4;
      next[0] = this.side.top + newRelativePos[0];
      next[1] = this.side.left + newRelativePos[1];

      if (next[0] === 200 || next[1] === 200) {
        console.log("ASDADAS");
      }
    }

    matrix[this.position[0]][this.position[1]] = "o";

    if (matrix[next[0]][next[1]] !== "#") {
      this.position = next;
      return true;
    }

    return false;
  }
}

module.exports = PlayerTwo;
