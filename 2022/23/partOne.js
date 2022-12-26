const utils = require("../../utils/utils");

class Elf {
  constructor(point) {
    this.point = point;
    this.proposedStep = null;
  }

  hasNeighbors(matrix) {
    for (const dir of Object.values(dirs)) {
      if (matrix[this.point[0] + dir[0]][this.point[1] + dir[1]] === "#") {
        return true;
      }
    }
  }

  proposeStep(matrix) {
    for (let i = 0; i < proposals.length; i++) {
      const proposed = proposals[i](this.point, matrix);
      if (proposed) {
        this.proposedStep = proposed;
        break;
      }
    }
  }

  move(matrix) {
    matrix[this.point[0]][this.point[1]] = ".";
    this.point = this.proposedStep;
    matrix[this.point[0]][this.point[1]] = "#";
    this.proposedStep = null;
  }
}

const dirs = {
  NW: [-1, -1],
  N: [-1, 0],
  NE: [-1, 1],
  W: [0, -1],
  E: [0, 1],
  SW: [1, -1],
  S: [1, 0],
  SE: [1, 1],
};

const proposals = [
  (point, matrix) => {
    const x = point[0],
      y = point[1];

    if (
      matrix[dirs.N[0] + x][dirs.N[1] + y] === "." &&
      matrix[dirs.NE[0] + x][dirs.NE[1] + y] === "." &&
      matrix[dirs.NW[0] + x][dirs.NW[1] + y] === "."
    )
      return [dirs.N[0] + x, dirs.N[1] + y];
  },
  (point, matrix) => {
    const x = point[0],
      y = point[1];

    if (
      matrix[dirs.S[0] + x][dirs.S[1] + y] === "." &&
      matrix[dirs.SE[0] + x][dirs.SE[1] + y] === "." &&
      matrix[dirs.SW[0] + x][dirs.SW[1] + y] === "."
    )
      return [dirs.S[0] + x, dirs.S[1] + y];
  },
  (point, matrix) => {
    const x = point[0],
      y = point[1];

    if (
      matrix[dirs.W[0] + x][dirs.W[1] + y] === "." &&
      matrix[dirs.SW[0] + x][dirs.SW[1] + y] === "." &&
      matrix[dirs.NW[0] + x][dirs.NW[1] + y] === "."
    )
      return [dirs.W[0] + x, dirs.W[1] + y];
  },
  (point, matrix) => {
    const x = point[0],
      y = point[1];

    if (
      matrix[dirs.E[0] + x][dirs.E[1] + y] === "." &&
      matrix[dirs.NE[0] + x][dirs.NE[1] + y] === "." &&
      matrix[dirs.SE[0] + x][dirs.SE[1] + y] === "."
    )
      return [dirs.E[0] + x, dirs.E[1] + y];
  },
];

function switchProposals() {
  const temp = proposals.shift();
  proposals.push(temp);
}

const STEPS = 10;

async function main() {
  const appendingRow = new Array(10).fill(".");
  const matrix = (await utils.readLinesFromFile("./data.txt")).map((l) => [
    ...appendingRow,
    ...l.split(""),
    ...appendingRow,
  ]);

  matrix.N = matrix.length + 20;
  matrix.M = matrix[0].length;

  matrix.unshift(...utils.createMatrix(10, matrix.M, "."));
  matrix.push(...utils.createMatrix(10, matrix.M, "."));

  const elfs = [];

  for (let i = 0; i < matrix.N; i++) {
    for (let j = 0; j < matrix.M; j++) {
      if (matrix[i][j] === "#") {
        elfs.push(new Elf([i, j]));
      }
    }
  }

  // We have matrix and array of elfs
  for (let i = 0; i < STEPS; i++) {
    const proposedSteps = {};
    elfs.forEach((elf) => {
      if (elf.hasNeighbors(matrix)) {
        elf.proposeStep(matrix);
        if (elf.proposedStep) {
          proposedSteps[`${elf.proposedStep[0]},${elf.proposedStep[1]}`] ??= 0;
          proposedSteps[`${elf.proposedStep[0]},${elf.proposedStep[1]}`] += 1;
        }
      }
    });
    switchProposals();

    const doubles = Object.keys(proposedSteps).reduce((ac, key) => {
      if (proposedSteps[key] > 1) {
        ac.push(key);
      }
      return ac;
    }, []);

    elfs.forEach((elf) => {
      if (elf.proposedStep) {
        const key = elf.proposedStep[0] + "," + elf.proposedStep[1];
        if (doubles.includes(key)) {
          elf.proposedStep = null;
          return;
        }

        elf.move(matrix);
      }
    });
  }

  const { minX, maxX, minY, maxY } = elfs.reduce(
    (ac, elf) => {
      const [x, y] = elf.point;

      if (ac.minX === null) ac.minX = x;
      if (ac.minY === null) ac.minY = y;

      if (x < ac.minX) ac.minX = x;
      if (x > ac.maxX) ac.maxX = x;
      if (y < ac.minY) ac.minY = y;
      if (y > ac.maxY) ac.maxY = y;

      return ac;
    },
    {
      minX: null,
      maxX: 0,
      minY: null,
      maxY: 0,
    }
  );

  const result = (maxX - minX + 1) * (maxY - minY + 1) - elfs.length;

  console.log(result);

  console.log({ minX, maxX, minY, maxY });
}

main();
