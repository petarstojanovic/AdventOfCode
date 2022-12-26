const { readLinesFromFile } = require("../../utils/utils");

const strategyGuide = {
  A: {
    X: 3,
    Y: 4,
    Z: 8,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 2,
    Y: 6,
    Z: 7,
  },
};

async function main() {
  const lines = await readLinesFromFile("./data.txt");

  let totalScore = 0;
  for await (const line of lines) {
    const [opponent, , me] = line;
    const score = strategyGuide[opponent][me];
    totalScore += score;
  }

  console.log("Total Score: ", totalScore);
}

async function oneLiner() {
  const totalScore = (await readLinesFromFile("./data.txt")).reduce(
    (ac, line) => {
      const [opponent, , me] = line;
      const score = strategyGuide[opponent][me];
      return ac + score;
    },
    0
  );

  console.log("Total Score: ", totalScore);
}

main();
oneLiner();
