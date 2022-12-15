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
  return this.match(/\d/g).map(Number);
};

class Point {
  constructor(x, y, w) {
    this.row = x;
    this.col = y;
    this.dist = w;
    this.path = [this];
  }

  getNeighbours() {
    const neighbours = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        neighbours.push(new Point(this.x + i, this.y + j, this.w + 1));
      }
    }
    return neighbours;
  }

  getImmediateNeighbours() {
    const neighbours = [];
    const positions = [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ];
    positions.map((p) => new Point(this.x + p[0], this.y + p[1], this.w + 1));
    return neighbours;
  }

  up() {
    this.x -= 1;
  }

  down() {
    this.x += 1;
  }

  left() {
    this.y -= 1;
  }

  right() {
    this.y += 1;
  }

  add(point) {
    if (point instanceof Array) {
      this.x += point[0];
      this.y += point[1];
    }
    if (point instanceof Point) {
      this.x += point.x;
      this.y += point.y;
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
  console.log(matrix.map((row) => row.join("")));
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
