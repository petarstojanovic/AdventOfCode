const utils = require("../../utils/utils");
const CircularLinkedList = require("../../utils/linked-list/circular");

async function main() {
  const values = (await utils.readLinesFromFile("./data.txt")).map(
    (a) => Number(a) * 811589153
  );

  const list = new CircularLinkedList();
  const nodes = [];

  values.forEach((v) => {
    nodes.push(list.append(v));
  });

  for (let k = 0; k < 10; k++) {
    for (let idx = 0; idx < nodes.length; idx++) {
      const node = nodes[idx];

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
  }

  const zeroNode = list.findNode(0);
  const node1 = list.goForward(zeroNode, 1000);
  const node2 = list.goForward(node1, 1000);
  const node3 = list.goForward(node2, 1000);
  const result = node1.value + node2.value + node3.value;

  console.log(result);
}

main();
