const utils = require("./utils.js");

async function main() {
  const lines = (await utils.readLinesFromFile("./data.txt"))
    .map((line) => line.match(/-?\d+/g))
    .map((points) => {
      const [y, x, y1, x1] = points;
      return [
        new utils.Point(Number(x), Number(y), 0),
        new utils.Point(Number(x1), Number(y1), 0),
      ];
    });

  const ROW_INDEX = 2000000;

  const intervals = [];
  const allowed = [];

  lines.forEach((line) => {
    const sensor = line[0];
    const beacon = line[1];

    if (beacon.row === ROW_INDEX) allowed.push(beacon.col);

    const distance = utils.getDistance(sensor, beacon);

    if (
      sensor.row - distance <= ROW_INDEX &&
      sensor.row + distance >= ROW_INDEX
    ) {
      const sy = distance - Math.abs(sensor.row - ROW_INDEX);
      intervals.push([sensor.col - sy, sensor.col + sy]);
    }
  });

  let result = 0;
  let min, max;
  min = Math.min(...intervals.map((i) => i[0]));
  max = Math.max(...intervals.map((i) => i[1]));

  for (i = min; i <= max; i++) {
    if (allowed.includes(i)) continue;

    if (intervals.some(([left, right]) => left <= i && i <= right)) result += 1;
  }

  console.log({ result, allowed });
}

main();
