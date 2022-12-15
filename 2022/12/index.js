const fs = require("fs");
const readline = require("readline");

async function readLines() {
  const fileStream = fs.createReadStream("./data.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines = [];

  for await (const line of rl) {
    lines.push(line);
  }

  await rl.close();

  return lines;
}

// QItem for current location and distance
// from source location
class QItem {
  constructor(x, y, w) {
    this.row = x;
    this.col = y;
    this.dist = w;
    this.path = [[x, y]];
  }
}

function isValid(current, nextStep) {
  const v = nextStep === "E" ? "z" : nextStep;
  const a = current === "S" ? "a" : current;
  return v.charCodeAt() - a.charCodeAt() <= 1;
}

function minDistance(grid, source, N, M) {
  // To keep track of visited QItems. Marking
  // blocked cells as visited.
  var visited = Array.from(Array(N), () => Array(M).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = false;
    }
  }

  // applying BFS on matrix cells starting from source
  var q = [];
  q.push(source);
  visited[source.row][source.col] = true;
  while (q.length != 0) {
    var p = q[0];
    q.shift();

    const current = grid[p.row][p.col];

    // Destination found;
    if (current == "E") return p;

    // moving up
    if (
      p.row - 1 >= 0 &&
      visited[p.row - 1][p.col] == false &&
      isValid(current, grid[p.row - 1][p.col])
    ) {
      const item = new QItem(p.row - 1, p.col, p.dist + 1);
      item.path.unshift(...p.path);
      q.push(item);
      visited[p.row - 1][p.col] = true;
    }

    // moving down
    if (
      p.row + 1 < N &&
      visited[p.row + 1][p.col] == false &&
      isValid(current, grid[p.row + 1][p.col])
    ) {
      const item = new QItem(p.row + 1, p.col, p.dist + 1);
      item.path.unshift(...p.path);
      q.push(item);
      visited[p.row + 1][p.col] = true;
    }

    // moving left
    if (
      p.col - 1 >= 0 &&
      visited[p.row][p.col - 1] == false &&
      isValid(current, grid[p.row][p.col - 1])
    ) {
      const item = new QItem(p.row, p.col - 1, p.dist + 1);
      item.path.unshift(...p.path);
      q.push(item);
      visited[p.row][p.col - 1] = true;
    }

    // moving right
    if (
      p.col + 1 < M &&
      visited[p.row][p.col + 1] == false &&
      isValid(current, grid[p.row][p.col + 1])
    ) {
      const item = new QItem(p.row, p.col + 1, p.dist + 1);
      item.path.unshift(...p.path);
      q.push(item);
      visited[p.row][p.col + 1] = true;
    }
  }

  return -1;
}

function makeMatrix(N, M) {
  return Array.from(Array(N), () => Array(M).fill("."));
}

async function main() {
  const matrix = (await readLines()).map((l) => l.split(""));

  const N = matrix.length,
    M = matrix[0].length;

  const sources = matrix
    .reduce((a, b, i) => {
      const j = b.findIndex((item) => item === "a" || "S");
      if (j !== -1) {
        a.push([i, j]);
      }
      return a;
    }, [])
    .map((s) => new QItem(s[0], s[1], 0));

  const result = sources
    .map((s) => minDistance(matrix, s, N, M))
    .sort((a, b) => a.dist - b.dist)[0];

  const m = makeMatrix(N, M);

  for (let i = 0; i < result.path.length; i++) {
    const current = result.path[i];
    if (i + 1 === result.path.length) {
      m[current[0]][current[1]] = "E";
      break;
    }

    const next = result.path[i + 1];

    if (next[0] > current[0]) m[current[0]][current[1]] = "v";
    else if (next[0] < current[0]) m[current[0]][current[1]] = "^";
    else if (next[1] > current[1]) m[current[0]][current[1]] = ">";
    else m[current[0]][current[1]] = "<";
  }

  m.forEach((l) => {
    console.log(l.join(""));
  });
  console.log(result.dist);
}

async function main2() {
  const matrix = (await readLines()).map((l) => l.split(""));

  const N = matrix.length,
    M = matrix[0].length;

  const result = minDistance(matrix, matrix.length, matrix[0].length);

  const m = makeMatrix(N, M);

  for (let i = 0; i < result.path.length; i++) {
    const current = result.path[i];
    if (i + 1 === result.path.length) {
      m[current[0]][current[1]] = "E";
      break;
    }

    const next = result.path[i + 1];

    if (next[0] > current[0]) m[current[0]][current[1]] = "v";
    else if (next[0] < current[0]) m[current[0]][current[1]] = "^";
    else if (next[1] > current[1]) m[current[0]][current[1]] = ">";
    else m[current[0]][current[1]] = "<";
  }

  m.forEach((l) => {
    console.log(l.join(""));
  });
  console.log(result.dist);
}

main();
