const { readLinesFromFile } = require("../../utils/utils");

class Node {
  constructor(key, value, leaf) {
    this.key = key;
    this.value = value;
    this.isLeaf = leaf;
    this.parent = null;
    this.children = [];
  }
}

class FS {
  constructor(root) {
    this.root = root;
  }

  calcValues() {
    this.getValue(this.root);
  }

  getValue(node) {
    if (node.isLeaf) return node.value;

    for (const child of node.children) {
      const value = this.getValue(child);
      node.value += value;
    }

    return node.value;
  }

  bfs(node) {
    const queue = [node];
    let sum = 0;

    while (queue.length > 0) {
      const n = queue.pop();

      queue.push(...n.children.filter((n) => !n.isLeaf));

      if (n.value < 100000) sum += n.value;
    }

    return sum;
  }

  getNodesLargerThan(node, value) {
    const queue = [node];
    const nodes = [];

    while (queue.length > 0) {
      const n = queue.pop();

      queue.push(...n.children.filter((n) => !n.isLeaf));

      if (n.value > value) nodes.push(n);
    }

    return nodes;
  }
}

async function partOne() {
  const data = await readLinesFromFile("./data.txt");

  const root = new Node("/", 0, false);
  const fs = new FS(root);
  data.splice(0, 2);

  let current = root;

  for (const line of data) {
    if (line.startsWith("$ ls")) continue;

    if (line.startsWith("$ cd")) {
      const dirName = line.split("$ cd ")[1];

      if (dirName === "..") {
        current = current.parent;
      } else {
        current = current.children.find((node) => node.key === dirName);
      }

      continue;
    }

    if (line.startsWith("dir")) {
      const dirName = line.split(" ")[1];
      const node = new Node(dirName, 0, false);
      node.parent = current;
      current.children.push(node);

      continue;
    }

    const [fileSize, fileName] = line.split(" ");
    const node = new Node(fileName, Number(fileSize), true);
    node.parent = current;
    current.children.push(node);
  }

  fs.calcValues();

  console.log("Part one: " + fs.bfs(fs.root));

  const freeSpace = 70000000 - fs.root.value;
  const minRequiredToDelete = 30000000 - freeSpace;

  const minNode = fs
    .getNodesLargerThan(fs.root, minRequiredToDelete)
    .sort((a, b) => a.value - b.value)[0];
  console.log("Part two: " + minNode.value);
}

async function start() {
  await partOne();
}

start();
