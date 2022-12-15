const fs = require("fs");
const readline = require("readline");

const cargo = {
  1: ["W", "R", "F"],
  2: ["T", "H", "M", "C", "D", "V", "W", "P"],
  3: ["P", "M", "Z", "N", "L"],
  4: ["J", "C", "H", "R"],
  5: ["C", "P", "G", "H", "Q", "T", "B"],
  6: ["G", "C", "W", "L", "F", "Z"],
  7: ["W", "V", "L", "Q", "Z", "J", "G", "C"],
  8: ["P", "N", "R", "F", "W", "T", "V", "C"],
  9: ["J", "W", "H", "G", "R", "S", "V"],
};

async function getCargo() {
  const fileStream = fs.createReadStream("./cargo.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const cargoRaw = [];

  for await (const line of rl) {
    cargoRaw.push(line);
  }

  await rl.close();

  const indexRow = cargoRaw.pop();
  const indexes = indexRow
    .replaceAll(" ", "")
    .split("")
    .map((idx) => ({
      value: idx,
      index: indexRow.indexOf(idx),
    }));

  const cargo = {};
  cargoRaw.reverse().forEach((row) => {
    indexes.forEach((idx) => {
      cargo[idx.value] ??= [];
      const char = row.charAt(idx.index);
      if (char !== " ") cargo[idx.value].push(char);
    });
  });

  return cargo;
}

async function partOne() {
  const cargo = await getCargo();
  const fileStream = fs.createReadStream("./instructions.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const [, quantity, , from, , to] = line.split(" ");

    for (let i = 0; i < quantity; i++) {
      const crate = cargo[from].pop();
      cargo[to].push(crate);
    }
  }

  const result = Object.keys(cargo)
    .map((key) => cargo[key].pop())
    .join("");
  console.log(result);
}

const partTwo = async () => {
  const cargo = await getCargo();
  const fileStream = fs.createReadStream("./instructions.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const [, quantity, , from, , to] = line.split(" ");

    const crates = cargo[from].splice(cargo[from].length - quantity);
    cargo[to].push(...crates);
  }

  const result = Object.keys(cargo)
    .map((key) => cargo[key].pop())
    .join("");
  console.log(result);
};

async function start() {
  await partOne();
  await partTwo();
}

start();
