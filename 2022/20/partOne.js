const utils = require("../../utils/utils");
const CircularLinkedList = require("../../utils/linked-list/circular");

async function main() {
  const values = (await utils.readLinesFromFile("./data.txt")).map(Number);

  const list = new CircularLinkedList();
  const nodes = [];

  values.forEach((v) => {
    nodes.push(list.append(v));
  });

  while (nodes.length > 0) {
    const node = nodes.shift();

    const moves = node.value % (list.length - 1);
    if (moves === 0) continue;

    let moveForward = 0;

    if (moves < 0) {
      moveForward = list.length + moves - 1;
    } else {
      moveForward = moves;
    }

    if (moveForward === 0 || moveForward === list.length - 1) {
      continue;
    }

    const idxNode = list.goForward(node, moveForward);

    list.moveAfter(idxNode, node);
  }

  const zeroNode = list.findNode(0);
  const node1 = list.goForward(zeroNode, 1000);
  const node2 = list.goForward(node1, 1000);
  const node3 = list.goForward(node2, 1000);
  const result = node1.value + node2.value + node3.value;

  console.log(result);
}

main();
