const { readLinesFromFile } = require("../../utils/utils");

async function partOne() {
  const matrix = (await readLinesFromFile("./data.txt")).map((row) =>
    row.split("").map(Number)
  );
  matrix.N = matrix.length;
  matrix.M = matrix[0].length;

  let count = 2 * (matrix.N + matrix.M - 2);

  for (let i = 1; i < matrix.N - 1; i++) {
    for (let j = 1; j < matrix.M - 1; j++) {
      const tree = matrix[i][j];
      const row = matrix[i];
      const col = matrix.map((row) => row[j]);
      // left
      if (row.slice(0, j).every((number) => number < tree)) {
        count += 1;
        continue;
      }
      // right
      if (row.slice(j + 1).every((number) => number < tree)) {
        count += 1;
        continue;
      }
      // top
      if (col.slice(0, i).every((number) => number < tree)) {
        count += 1;
        continue;
      }
      // bottom
      if (col.slice(i + 1).every((number) => number < tree)) {
        count += 1;
        continue;
      }
    }
  }

  console.log(count);
}

async function partTwo() {
  const matrix = (await readLinesFromFile("./data.txt")).map((row) =>
    row.split("").map(Number)
  );
  matrix.N = matrix.length;
  matrix.M = matrix[0].length;

  let maxScenicScore = 0;

  for (let i = 1; i < matrix.N - 1; i++) {
    for (let j = 1; j < matrix.M - 1; j++) {
      const tree = matrix[i][j];
      const row = matrix[i];
      const col = matrix.map((row) => row[j]);

      const left = row.slice(0, j).reverse();
      const right = row.slice(j + 1);
      const top = col.slice(0, i).reverse();
      const bottom = col.slice(i + 1);

      const scenicScore = [left, right, top, bottom]
        .map((side) =>
          side.findIndex((t) => t >= tree) >= 0
            ? side.findIndex((t) => t >= tree) + 1
            : side.length
        )
        .reduce((ac, cur) => ac * cur, 1);

      if (maxScenicScore < scenicScore) maxScenicScore = scenicScore;
    }
  }
  console.log(maxScenicScore);
}

async function start() {
  await partOne();
  await partTwo();
}

start();
