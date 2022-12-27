const { readLinesFromFile, getAllDigits } = require("../../utils/utils");

async function getCargo() {
  const cargoRaw = await readLinesFromFile("./cargo.txt");

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
  const lines = await readLinesFromFile("./instructions.txt");

  for (const line of lines) {
    const [quantity, from, to] = getAllDigits(line);

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
  const lines = await readLinesFromFile("./instructions.txt");

  for (const line of lines) {
    const [quantity, from, to] = getAllDigits(line);

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
