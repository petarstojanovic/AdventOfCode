const utils = require("../../utils/utils");

global.monkeys = {};

async function main() {
  const lines = await utils.readLinesFromFile("./data.txt");

  lines.forEach((line) => {
    const [name, right] = line.split(": ");
    let operation;
    if (isNaN(Number(right))) {
      const [mon1, op, mon2] = right.split(" ");
      operation = Function(
        `return monkeys['${mon1}']() ${op} monkeys['${mon2}']()`
      );
    } else {
      operation = () => Number(right);
    }
    monkeys[name] = operation;
  });

  console.log(monkeys["root"]());
}

main();
