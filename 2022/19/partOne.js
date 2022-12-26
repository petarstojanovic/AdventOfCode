const Point3D = require("../../utils/point3d");
const utils = require("../../utils/utils");

async function main() {
  const points = (await utils.readLinesFromFile("./data.txt")).map((line) => {
    const [x, y, z] = line.split(",").map(Number);
    return new Point3D(x, y, z);
  });

  const result = points.reduce((ac, point) => {
    ac += point.getImmediateNeighbors().reduce((ac, n) => {
      if (!points.some((e) => e.isEqual(n))) ac += 1;
      return ac;
    }, 0);
    return ac;
  }, 0);

  console.log(result);
}

main();
