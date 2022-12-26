const Point3D = require("../../utils/point3d");
const utils = require("../../utils/utils");

async function main() {
  const points = (await utils.readLinesFromFile("./data.txt")).map((line) => {
    const [x, y, z] = line.split(",").map(Number);
    return new Point3D(x, y, z);
  });

  const maxX = Math.max(...points.map((p) => p.x)) + 1;
  const maxY = Math.max(...points.map((p) => p.y)) + 1;
  const maxZ = Math.max(...points.map((p) => p.z)) + 1;

  console.log({ maxX, maxY, maxZ });

  points.includes = (se) => points.some((e) => e.isEqual(se));

  // BFS
  function canItEscape(point) {
    const visited = [];
    const queue = [];

    visited.push(point);
    queue.push(point);

    while (queue.length > 0) {
      const p = queue.shift();
      if (
        p.x >= maxX ||
        p.x <= 0 ||
        p.y >= maxY ||
        p.y <= 0 ||
        p.z >= maxZ ||
        p.z <= 0
      )
        return true;
      const neighbors = p.getImmediateNeighbors().filter((n) => {
        if (!points.includes(n)) return true;

        visited.push(n);
      });
      neighbors.forEach((n) => {
        if (!visited.some((e) => e.isEqual(n))) {
          visited.push(n);
          queue.push(n);
        }
      });
    }

    return false;
  }

  let result = 0;

  points.forEach((point) => {
    const neighbors = point
      .getImmediateNeighbors()
      .filter((n) => points.every((e) => !e.isEqual(n)));

    const r = neighbors.reduce((ac, n) => {
      if (canItEscape(n)) ac += 1;
      return ac;
    }, 0);

    result += r;
  });

  console.log(result);
}

main();
