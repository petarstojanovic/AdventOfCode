const { readLinesFromFile } = require("../../utils/utils");

async function main() {
  const lines = (await readLinesFromFile("./data.txt")).map(Number);

  let currentSum = 0,
    max = 0;
  for (const line of lines) {
    if (line !== 0) {
      currentSum += line;
    } else {
      if (currentSum > max) {
        max = currentSum;
      }
      currentSum = 0;
    }
  }

  console.log(max);
}

async function oneLiner() {
  const result = (await readLinesFromFile("./data.txt"))
    .map(Number)
    .reduce((ac, num) => {
      if (ac.length === 0) ac.push(0);
      if (num === 0) {
        ac.push(0);
        return ac;
      }

      ac[ac.length - 1] += num;
      return ac;
    }, [])
    .sort((a, b) => b - a)[0];

  console.log(result);
}

main();
