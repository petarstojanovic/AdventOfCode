const { readLinesFromFile } = require("../../utils/utils");

async function partOne() {
  const data = (await readLinesFromFile("./data.txt"))[0];

  for (let i = 0; i <= data.length - 4; i++) {
    if (new Set(data.substring(i, i + 4).split("")).size === 4) {
      console.log(i + 4);
      break;
    }
  }
}

const partTwo = async () => {
  const data = (await readLinesFromFile("./data.txt"))[0];

  for (let i = 0; i <= data.length - 14; i++) {
    if (new Set(data.substring(i, i + 14).split("")).size === 14) {
      console.log(i + 14);
      break;
    }
  }
};

async function start() {
  await partOne();
  await partTwo();
}

start();
