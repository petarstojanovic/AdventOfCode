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

const secondStrategyGuide = {
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

async function partOne() {
  const lines = await readLinesFromFile("./data.txt");

  let totalScore = 0;
  for await (const line of lines) {
    const [opponent, , me] = line;
    const score = firstStrategyGuide[opponent][me];
    console.log(`Score of round => ${opponent}-${me} = ${score}`);
    totalScore += score;
  }

  console.log("Total Score: ", totalScore);
}

async function partTwo() {
  const fileStream = fs.createReadStream("./data.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let totalScore = 0;
  for await (const line of rl) {
    const [opponent, , me] = line;
    const score = secondStrategyGuide[opponent][me];
    console.log(`Score of round => ${opponent}-${me} = ${score}`);
    totalScore += score;
  }

  console.log("Total Score: ", totalScore);
}

partTwo();
