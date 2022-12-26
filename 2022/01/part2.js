const { readLinesFromFile } = require("../../utils/utils");

async function main() {
  const lines = (await readLinesFromFile("./data.txt")).map(Number);

  let maxThree = [0, 0, 0];
  let currentSum = 0;

  for await (const line of lines) {
    if (line !== 0) {
      currentSum += line;
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
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b);

  console.log(result);
}

main();
