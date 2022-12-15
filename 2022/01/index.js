const fs = require("fs");
const readline = require("readline");

async function firstPart() {
  const fileStream = fs.createReadStream("./data.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let max = 0;
  let currentSum = 0;

  for await (const line of rl) {
    if (Number(line) !== 0) {
      currentSum += Number(line);
    } else {
      if (currentSum > max) {
        max = currentSum;
      }
      currentSum = 0;
    }
  }

  console.log(max);
}

async function secondPart() {
  const fileStream = fs.createReadStream("./data.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let maxThree = [0, 0, 0];
  let currentSum = 0;

  for await (const line of rl) {
    if (Number(line) !== 0) {
      currentSum += Number(line);
    } else {
      if (currentSum > maxThree[2]) {
        maxThree[2] = currentSum;
        maxThree.sort((a, b) => b - a);
      }
      currentSum = 0;
    }
  }

  console.log(maxThree.reduce((ac, cur) => ac + cur, 0));
}

secondPart();
