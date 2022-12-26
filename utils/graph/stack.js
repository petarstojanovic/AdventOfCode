class Stack {
  constructor() {
    this.items = [];
  }

  add(value) {
    this.items.push(value);
  }

  remove() {
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

module.exports = Stack;
