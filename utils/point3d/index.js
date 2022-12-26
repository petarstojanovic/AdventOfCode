class Point3D {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getNeighbors() {
    const neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          neighbors.push(new Point(this.x + i, this.y + j, this.z + k));
        }
      }
    }
    return neighbors;
  }

  getImmediateNeighbors() {
    const positions = [
      [-1, 0, 0],
      [1, 0, 0],
      [0, -1, 0],
      [0, 1, 0],
      [0, 0, -1],
      [0, 0, 1],
    ];
    const neighbors = positions.map(
      (p) => new Point3D(this.x + p[0], this.y + p[1], this.z + p[2])
    );
    return neighbors;
  }

  isEqual(p) {
    return this.x === p.x && this.y === p.y && this.z === p.z;
  }
}

module.exports = Point3D;
