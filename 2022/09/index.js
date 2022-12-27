const { readLinesFromFile, printMatrix } = require("../../utils/utils");

const dirs = {
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
  U: [-1, 0],
};

const moveTowards = (head, tail) => {
  if (Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1) {
    const dx = head[0] - tail[0];
    const dy = head[1] - tail[1];
    tail[0] += Math.ceil(Math.abs(dx) / 2) * (dx < 0 ? -1 : 1);
    tail[1] += Math.ceil(Math.abs(dy) / 2) * (dy < 0 ? -1 : 1);
  }
};

async function polingRope(rope) {
  const data = await readLinesFromFile("./data.txt");

  const set = new Set(["0,0"]);

  for (const line of data) {
    const [dir, steps] = line.split(" ");

    for (let i = 0; i < +steps; i++) {
      const head = rope[0];
      const tail = rope[rope.length - 1];
      head[0] += dirs[dir][0];
      head[1] += dirs[dir][1];

      for (let j = 0; j < rope.length - 1; j++) {
        moveTowards(rope[j], rope[j + 1]);
      }
      set.add(tail[0] + "," + tail[1]);
    }
  }

  console.log(set.size);
}

async function start() {
  await polingRope([
    [0, 0],
    [0, 0],
  ]);

  await polingRope([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);
}

start();
