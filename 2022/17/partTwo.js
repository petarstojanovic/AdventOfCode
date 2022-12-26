const utils = require("../../utils/utils");

const LEFT = "<";
const RIGHT = ">";
const DOWN = "v";

const directions = {
  [LEFT]: [0, -1],
  [RIGHT]: [0, 1],
  [DOWN]: [-1, 0],
};

class Rock {
  constructor(points) {
    const temp = points.map((p) => new utils.Point(p[0], p[1], 0));
    this.points = [...temp];
    temp.sort((a, b) => a.col - b.col);
    this.left = temp[0];
    this.right = temp[temp.length - 1];
    temp.sort((a, b) => a.row - b.row);
    this.bottom = temp[0];
    this.top = temp[temp.length - 1];
  }

  move(dir) {
    this.points.forEach((point) => {
      point.add(directions[dir]);
    });
  }

  canMove(dir, set) {
    return this.points.every((point) => {
      const nextPosition = new utils.Point(point.row, point.col, 0);
      nextPosition.add(directions[dir]);
      if (nextPosition.row > 0 && nextPosition.col < 7 && nextPosition.col >= 0)
        return !set.has(`${nextPosition.row},${nextPosition.col}`);

      return false;
    });
  }

  printInMatrix(set) {
    this.points.forEach((point) => {
      set.add(`${point.row},${point.col}`);
    });
  }

  adjustStartingPosition(row) {
    this.points.forEach((point) => {
      point.add([row, 2]);
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
    [2, 2],
    [1, 2],
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [3, 0],
    [2, 0],
    [1, 0],
    [0, 0],
  ],
  [
    [1, 1],
    [1, 0],
    [0, 1],
    [0, 0],
  ],
];

let set = new Set(["0,0", "0,1", "0,2", "0,3", "0,4", "0,5", "0,6"]);

async function main() {
  const lines = await utils.readLinesFromFile("./data.txt");
  let dirs = lines[0].split("");

  let topRow = 0;

  let stopped = 0;
  let i = 0;

  while (stopped < 1000000000000) {
    const p = rocks[stopped % 5];
    const rock = new Rock(p);

    rock.adjustStartingPosition(topRow + 4);

    while (true) {
      const dir = dirs[i];
      i = (i + 1) % dirs.length;
      if (rock.canMove(dir, set)) {
        rock.move(dir);
      }
      if (!rock.canMove(DOWN, set)) {
        break;
      }
      rock.move(DOWN);
    }

    rock.printInMatrix(set);
    stopped += 1;

    if (topRow < rock.top.row) topRow = rock.top.row;

    if (stopped % 1000000 === 0) console.log({ stopped, topRow });
  }

  console.log(topRow);
}

main();
