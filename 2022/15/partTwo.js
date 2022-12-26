const utils = require("../../utils.js");

function getLine(d1, d2) {
  const k = (d2.col - d1.col) / (d2.row - d1.row);
  const n = d1.col - k * d1.row;

  return {
    k,
    n,
  };
}

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

  const posLines = [];
  const negLines = [];

  lines.forEach((line) => {
    const sensor = line[0];
    const beacon = line[1];

    const distance = utils.getDistance(sensor, beacon);

    const top = new utils.Point(sensor.row - distance, sensor.col);
    const down = new utils.Point(sensor.row + distance, sensor.col);
    const left = new utils.Point(sensor.row, sensor.col - distance);
    const right = new utils.Point(sensor.row, sensor.col + distance);

    posLines.push(getLine(left, down));
    posLines.push(getLine(top, right));

    negLines.push(getLine(top, left));
    negLines.push(getLine(right, down));
  });

  const posPairs = [];
  for (let i = 0; i < posLines.length; i++) {
    const line = posLines[i];

    posLines.forEach((l) => {
      if (Math.abs(l.n - line.n) === 2) {
        const dir = (l.n - line.n) / 2;
        const posLine = { k: l.k, n: l.n - dir };
        if (posPairs.findIndex((p) => p.n !== posLine.n))
          posPairs.push(posLine);
      }
    });
  }

  const negPairs = [];
  for (let i = 0; i < negLines.length; i++) {
    const line = negLines[i];

    negLines.forEach((l) => {
      if (Math.abs(l.n - line.n) === 2) {
        const dir = (l.n - line.n) / 2;
        const posLine = { k: l.k, n: l.n - dir };
        if (negPairs.findIndex((p) => p.n !== posLine.n))
          negPairs.push(posLine);
      }
    });
  }
  const { k: k1, n: n1 } = posPairs[0];
  const { k: k2, n: n2 } = negPairs[0];

  const x = (n2 - n1) / (k1 - k2);
  const y = k1 * x + n1;

  console.log(y * 4000000 + x);
}

main();
