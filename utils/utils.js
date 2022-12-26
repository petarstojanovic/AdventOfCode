const fs = require("fs");
const readline = require("readline");

async function readLinesFromFile(file) {
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines = [];

  for await (const line of rl) {
    lines.push(line);
  }

  rl.close();

  return lines;
}

function readLinesFromString(value) {
  return value.match(/[^\r\n]+/g);
}

function createMatrix(N, M, initElement = ".") {
  return Array.from(Array(N), () => Array(M).fill(initElement));
}

String.prototype.getAllDigits = function () {
  return this.match(/-?\d+/g).map(Number);
};

const dfs = function (start, target) {
  if (start.value === target) {
    return start;
  }

  for (var i = 0; i < start.children.length; i++) {
    var result = dfs(start.children[i], target);
    if (result != null) {
      return result;
    }
  }
  return null;
};

class Point {
  constructor(x, y, w) {
    this.row = x;
    this.col = y;
    this.dist = w;
    this.path = [this];
  }

  getNeighbors() {
    const neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i !== 0 && j !== 0)
          neighbors.push(new Point(this.row + i, this.col + j, this.w + 1));
      }
    }
    return neighbors;
  }

  getImmediateNeighbors() {
    const neighbors = [];
    const positions = [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ];
    positions.map(
      (p) => new Point(this.row + p[0], this.col + p[1], this.w + 1)
    );
    return neighbors;
  }

  up() {
    this.row -= 1;
  }

  down() {
    this.row += 1;
  }

  left() {
    this.col -= 1;
  }

  right() {
    this.col += 1;
  }

  add(point) {
    if (point instanceof Array) {
      this.row += point[0];
      this.col += point[1];
    }
    if (point instanceof Point) {
      this.row += point.row;
      this.col += point.col;
    }
  }
}

function maxN(N, ...args) {
  return args.sort((a, b) => a - b).slice(0, N);
}

function minN(N, ...args) {
  return args.sort((a, b) => b - a).slice(0, N);
}

function getDistance(p1, p2) {
  return Math.abs(p1.row - p2.row) + Math.abs(p1.col - p2.col);
}

function printMatrix(matrix) {
  console.log(matrix.map((row) => row.join("")).join("\n"));
}

module.exports = {
  readLinesFromFile,
  readLinesFromString,
  createMatrix,
  Point,
  maxN,
  minN,
  getDistance,
  printMatrix,
};
