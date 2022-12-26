const { readLinesFromFile } = require("../../utils/utils");

const firstStrategyGuide = {
  A: {
    X: 4,
    Y: 8,
    Z: 3,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 7,
    Y: 2,
    Z: 6,
  },
};

async function main() {
  const lines = await readLinesFromFile("./data.txt");

  let totalScore = 0;
  for await (const line of lines) {
    const [opponent, , me] = line;
    const score = firstStrategyGuide[opponent][me];
    totalScore += score;
  }

  console.log("Total Score: ", totalScore);
}

async function oneLiner() {
  const totalScore = (await readLinesFromFile("./data.txt")).reduce(
    (ac, line) => {
      const [opponent, , me] = line;
      const score = firstStrategyGuide[opponent][me];
      return ac + score;
    },
    0
  );

  console.log("Total Score: ", totalScore);
}

main();
oneLiner();
