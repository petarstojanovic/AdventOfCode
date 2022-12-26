class Queue {
  constructor() {
    this.items = [];
  }

  add(value) {
    this.items.push(value);
  }

  remove() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

module.exports = Queue;
