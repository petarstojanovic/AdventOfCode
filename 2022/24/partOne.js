const utils = require("../../utils/utils");

class Wind {
  constructor(point, direction) {
    this.point = point;
    this.next = null;
    this.direction = direction;
  }

  hasNeighbors(matrix) {
    for (const dir of Object.values(dirs)) {
      if (matrix[this.point[0] + dir[0]][this.point[1] + dir[1]] === "#") {
        return true;
      }
    }
  }

  proposeStep(matrix) {
    const dir = dirs[this.direction];
    const next = [this.point[0] + dir[0], this.point[1] + dir[1]];

    if (matrix[next[0]][next[1]] === "#") {
      dir[0] *= -1;
      dir[1] *= -1;
      next[0] += dir[0];
      next[1] += dir[1];
      while (matrix[next[0]][next[1]] !== "#") {
        next[0] += dir[0];
        next[1] += dir[1];
      }
      dir[0] *= -1;
      dir[1] *= -1;
      next[0] += dir[0];
      next[1] += dir[1];
    }

    this.next = next;
  }

  move(matrix) {
    matrix[this.point[0]][this.point[1]] = ".";
    this.point = this.next;
    matrix[this.point[0]][this.point[1]] = dirChar[this.direction];
  }
}

class Player {
  constructor(point) {
    this.point = point;
    this.next = null;
  }

  proposeStep(matrix, winds) {
    let next = [this.point[0], this.point[1]];
    const neighbors = winds
      .map((wind) => wind.next)
      .filter((wind) => {
        for (const dir of dirs) {
          if (
            (wind[0] === this.point[0] + dir[0] &&
              wind[1] === this.point[1] + dir[1]) ||
            (wind[0] === this.point[0] && wind[1] === this.point[1])
          )
            return true;
        }
      });

    let dir;
    for (let i = 0; i < dirs.length; i++) {
      const next = [this.point[0] + dirs[i][0], this.point[1] + dirs[i][1]];
      if (
        !neighbors.some((n) => n[0] === next[0] && n[1] === next[1]) &&
        matrix[next[0]][next[1]] !== "#"
      ) {
        dir = i;
        break;
      }
    }

    if (dir)
      next = [this.point[0] + dirs[dir][0], this.point[1] + dirs[dir][1]];

    if (
      dir > 1 &&
      neighbors.some((n) => n[0] === this.point[0] && n[1] === this.point[1])
    ) {
      console.log(`WAIT`);
      this.next = [this.point[0], this.point[1]];
      return false;
    }

    console.log(`MOVE ${dirChar[dir]}`);
    this.next = next;
    return true;
  }

  move(matrix) {
    matrix[this.point[0]][this.point[1]] = ".";
    this.point = this.next;
    matrix[this.point[0]][this.point[1]] = "E";
    this.next = null;
  }
}

const dirChar = [">", "v", "<", "^"];

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

async function main() {
  const matrix = (await utils.readLinesFromFile("./data.txt")).map((l) =>
    l.split("")
  );

  matrix.N = matrix.length;
  matrix.M = matrix[0].length;

  const winds = [];
  const player = new Player([0, 1]);

  for (let i = 0; i < matrix.N; i++) {
    for (let j = 0; j < matrix.M; j++) {
      if (dirChar.includes(matrix[i][j])) {
        winds.push(new Wind([i, j], dirChar.indexOf(matrix[i][j])));
      }
    }
  }

  let steps = 0;
  while (true) {
    winds.forEach((wind) => {
      wind.proposeStep(matrix);
      wind.move(matrix);
    });

    steps += 1;
    if (player.proposeStep(matrix, winds)) {
    }
    player.move(matrix);

    if (player.point[0] === 5 && player.point[1] === 6) {
      break;
    }
  }

  console.log(steps);
}

main();
