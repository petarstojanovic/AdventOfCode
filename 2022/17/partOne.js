const utils = require("../../utils/utils");

const LEFT = "<";
const RIGHT = ">";
const DOWN = "v";

const directions = {
  [LEFT]: [0, -1],
  [RIGHT]: [0, 1],
  [DOWN]: [1, 0],
};

class Rock {
  constructor(points) {
    const temp = points.map((p) => new utils.Point(p[0], p[1], 0));
    this.points = [...temp];
    temp.sort((a, b) => a.col - b.col);
    this.left = temp[0];
    this.right = temp[temp.length - 1];
    temp.sort((a, b) => b.row - a.row);
    this.bottom = temp[0];
    this.top = temp[temp.length - 1];
  }

  move(dir) {
    this.points.forEach((point) => {
      point.add(directions[dir]);
    });
  }

  canMove(dir, matrix) {
    return this.points.every((point) => {
      const nextPosition = new utils.Point(point.row, point.col, 0);
      nextPosition.add(directions[dir]);
      if (
        nextPosition.row > 0 &&
        nextPosition.row < 20000 &&
        nextPosition.col < 7 &&
        nextPosition.col >= 0
      )
        return matrix[nextPosition.row][nextPosition.col] !== "#";

      return false;
    });
  }

  printInMatrix(matrix) {
    this.points.forEach((point) => {
      matrix[point.row][point.col] = "#";
    });
  }

  adjustStartingPosition(destination) {
    const moveX = destination.row - this.bottom.row;
    this.points.forEach((point) => {
      point.add([moveX, 2]);
    });
  }
}

const rocks = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
];

const matrix = utils.createMatrix(20000, 7, ".");

async function main() {
  const lines = await utils.readLinesFromFile("./data.txt");
  let dirs = lines[0].split("");

  let topRockPoint = new utils.Point(20000, 0, 0);

  let stopped = 0;
  let i = 0;

  while (stopped < 2022) {
    const p = rocks[stopped % 5];
    const rock = new Rock(p);

    rock.adjustStartingPosition(new utils.Point(topRockPoint.row - 4, 0, 0));

    while (true) {
      const dir = dirs[i];
      i = (i + 1) % dirs.length;
      if (rock.canMove(dir, matrix)) {
        rock.move(dir);
      }
      if (!rock.canMove(DOWN, matrix)) {
        break;
      }
      rock.move(DOWN);
    }

    rock.printInMatrix(matrix);
    stopped += 1;

    if (topRockPoint.row > rock.top.row) topRockPoint = rock.top;
  }

  console.log(20000 - topRockPoint.row);
}

main();
