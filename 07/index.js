const fs = require("fs");
const readline = require("readline");
const BigNumber = require("bignumber.js");

async function readLine() {
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

function parseInput(input) {
  const [operation, value] = input.split(" ");

  return {
    operation,
    value,
  };
}

function chunkString(str, length) {
  return str.match(new RegExp(".{1," + length + "}", "g"));
}

async function main() {
  new BigNumber(123);

  const sequence = [
    {
      items: [75, 75, 98, 97, 79, 97, 64].map((n) => BigNumber(n)),
      operation: (old) => old.times(BigInt(13)),
      test: (item) => (item.mod(BigInt(19)).isEqualTo(BigNumber(0)) ? 2 : 7),
      iterations: 0,
    },
    {
      items: [50, 99, 80, 84, 65, 95].map((n) => BigNumber(n)),
      operation: (old) => old.plus(BigInt(2)),
      test: (item) => (item.mod(BigInt(3)).isEqualTo(BigNumber(0)) ? 4 : 5),
      iterations: 0,
    },
    {
      items: [96, 74, 68, 96, 56, 71, 75, 53].map((n) => BigNumber(n)),
      operation: (old) => old.plus(BigInt(1)),
      test: (item) => (item.mod(BigInt(11)).isEqualTo(BigNumber(0)) ? 7 : 3),
      iterations: 0,
    },
    {
      items: [83, 96, 86, 58, 92].map((n) => BigNumber(n)),
      operation: (old) => old.plus(BigInt(8)),
      test: (item) => (item.mod(BigInt(17)).isEqualTo(BigNumber(0)) ? 6 : 1),
      iterations: 0,
    },
    {
      items: [99].map((n) => BigNumber(n)),
      operation: (old) => old.times(old),
      test: (item) => (item.mod(BigInt(5)).isEqualTo(BigNumber(0)) ? 0 : 5),
      iterations: 0,
    },
    {
      items: [60, 54, 83].map((n) => BigNumber(n)),
      operation: (old) => old.plus(BigInt(4)),
      test: (item) => (item.mod(BigInt(2)).isEqualTo(BigNumber(0)) ? 2 : 0),
      iterations: 0,
    },
    {
      items: [77, 67].map((n) => BigNumber(n)),
      operation: (old) => old.times(BigInt(17)),
      test: (item) => (item.mod(BigInt(13)).isEqualTo(BigNumber(0)) ? 4 : 1),
      iterations: 0,
    },
    {
      items: [95, 65, 58, 76].map((n) => BigNumber(n)),
      operation: (old) => old.plus(BigInt(5)),
      test: (item) => (item.mod(BigInt(7)).isEqualTo(BigNumber(0)) ? 3 : 6),
      iterations: 0,
    },
  ];

  const ROUNDS = 500;

  for (let i = 0; i < ROUNDS; i++) {
    console.log("ROUND ", i);
    let count = sequence.length;
    for (let index = 0; index < count; index++) {
      const monkey = sequence[index];

      for (let itemIdx = 0; itemIdx < monkey.items.length; itemIdx++) {
        const item = monkey.items[itemIdx];
        monkey.iterations += 1;

        const currentWorryLevel = monkey.operation(item);

        const toIdx = monkey.test(currentWorryLevel);
        monkey.items.splice(itemIdx, 1);
        sequence[toIdx].items.push(currentWorryLevel);
        itemIdx--;
      }
    }
  }

  const [max, secondMax] = sequence
    .map((m) => m.iterations)
    .sort(function (a, b) {
      return b - a;
    });

  console.log(sequence);
  console.log(BigNumber(max).times(BigNumber(secondMax)));
}

main();
