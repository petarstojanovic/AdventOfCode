const utils = require("../../utils/utils");
const PlayerTwo = require("./player-two");

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

  const SIDE_SIZE = 50;

  const sides = {
    1: {
      left: startingPosition,
      right: startingPosition + SIDE_SIZE - 1,
      top: 0,
      bottom: SIDE_SIZE - 1,
      getNeighbor: (dir) => {
        switch (dir) {
          case 0:
            return sides[2];
          case 1:
            return sides[3];
          case 2:
            return sides[4];
          case 3:
            return sides[6];
        }
      },
    },
    2: {
      left: startingPosition + SIDE_SIZE,
      right: startingPosition + 2 * SIDE_SIZE - 1,
      top: 0,
      bottom: SIDE_SIZE - 1,
      getNeighbor: (dir) => {
        switch (dir) {
          case 0:
            return sides[5];
          case 1:
            return sides[3];
          case 2:
            return sides[1];
          case 3:
            return sides[6];
        }
      },
    },
    3: {
      left: startingPosition,
      right: startingPosition + SIDE_SIZE - 1,
      top: SIDE_SIZE,
      bottom: 2 * SIDE_SIZE - 1,
      getNeighbor: (dir) => {
        switch (dir) {
          case 0:
            return sides[2];
          case 1:
            return sides[5];
          case 2:
            return sides[4];
          case 3:
            return sides[1];
        }
      },
    },
    4: {
      left: startingPosition - SIDE_SIZE,
      right: startingPosition - 1,
      top: 2 * SIDE_SIZE,
      bottom: 3 * SIDE_SIZE - 1,
      getNeighbor: (dir) => {
        switch (dir) {
          case 0:
            return sides[5];
          case 1:
            return sides[6];
          case 2:
            return sides[1];
          case 3:
            return sides[3];
        }
      },
    },
    5: {
      left: startingPosition,
      right: startingPosition + SIDE_SIZE - 1,
      top: 2 * SIDE_SIZE,
      bottom: 3 * SIDE_SIZE - 1,
      getNeighbor: (dir) => {
        switch (dir) {
          case 0:
            return sides[2];
          case 1:
            return sides[6];
          case 2:
            return sides[4];
          case 3:
            return sides[3];
        }
      },
    },
    6: {
      left: startingPosition - SIDE_SIZE,
      right: startingPosition - 1,
      top: 3 * SIDE_SIZE,
      bottom: 4 * SIDE_SIZE - 1,
      getNeighbor: (dir) => {
        switch (dir) {
          case 0:
            return sides[5];
          case 1:
            return sides[2];
          case 2:
            return sides[1];
          case 3:
            return sides[4];
        }
      },
    },
  };

  const player = new PlayerTwo([0, startingPosition], 0, sides[1]);

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
      const direction = instructions.splice(0, 1)[0];
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
