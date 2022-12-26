class Player {
  constructor(position, direction) {
    this.position = position;
    this.direction = direction;
  }

  static dirs = [
    [0, 1], // 0 - right
    [1, 0], // 1 - down
    [0, -1], // 2 - left
    [-1, 0], // 3 - up
  ];
  static dirsChar = [">", "v", "<", "^"];

  changeDirection(LR) {
    if (LR === "R") {
      this.direction = (this.direction + 1) % 4;
    } else {
      this.direction = this.direction < 1 ? 3 : this.direction - 1;
    }
  }
}

module.exports = Player;
