const utils = require("../../utils/utils");
const PlayerOne = require("./player-one");

async function main() {
  const lines = await utils.readLinesFromFile("./data.txt");

  const emptyLine = lines.findIndex((l) => l === "");
  let matrix = lines.slice(0, emptyLine);
  let instructions = lines.slice(emptyLine + 1)[0].split("");

  const longestRow = Math.max(...matrix.map((line) => line.length));

  matrix = matrix
    .map((line) => line.split(""))
    .map((row) => {
      if (row.length < longestRow) {
        const append = new Array(longestRow - row.length).fill(" ");
        return row.concat(append);
      }
      return row;
    });

  const startingPosition = matrix[0].findIndex((p) => p === ".");

  const player = new PlayerOne([0, startingPosition], 0);

  while (instructions.length > 0) {
    const idx = instructions.findIndex((p) => p === "L" || p === "R");
    const moves = Number(
      instructions.splice(0, idx === -1 ? instructions.length : idx).join("")
    );

    let i = 0;
    while (i < moves && player.move(matrix)) {
      i++;
    }
    if (instructions.length > 0) {
      const direction = instructions.shift();
      player.changeDirection(direction);
    }
  }

  const result =
    (player.position[0] + 1) * 1000 +
    (player.position[1] + 1) * 4 +
    player.direction;

  console.log(result);
}

main();
