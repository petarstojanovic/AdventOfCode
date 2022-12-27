const {
  readLinesFromFile,
  createMatrix,
  printMatrix,
} = require("../../utils/utils");

async function partOne() {
  const data = await readLinesFromFile("./data.txt");

  let cycle = 1;
  let X = 1;
  let sum = 0;

  function doCycle(value) {
    // start

    if (cycle % 40 === 20) {
      sum += cycle * X;
    }
    if (value) {
      X += value;
    }

    cycle += 1;
    // end cycle
  }

  for (const line of data) {
    if (line === "noop") {
      doCycle();
    } else {
      const [, value] = line.split(" ");
      doCycle();
      doCycle(+value);
    }
  }

  console.log(sum);
}

async function partTwo() {
  const data = await readLinesFromFile("./data.txt");

  const matrix = createMatrix(6, 40);
  let cycle = 1;
  let X = 1;

  function doCycle(value) {
    // start

    const crt = (cycle - 1) % 40;
    const row = Math.floor((cycle - 1) / 40);

    if (Math.abs(crt - X) <= 1) matrix[row][crt] = "#";
    if (value) {
      X += value;
    }

    cycle += 1;
    // end cycle
  }

  for (const line of data) {
    if (line === "noop") {
      doCycle();
    } else {
      const [, value] = line.split(" ");
      doCycle();
      doCycle(+value);
    }
  }

  printMatrix(matrix);
}

async function start() {
  await partOne();
  await partTwo();
}

start();
