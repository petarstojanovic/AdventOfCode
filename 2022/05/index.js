const fs = require("fs");
const readline = require("readline");

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
