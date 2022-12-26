const utils = require("../../utils/utils");
const BinaryTree = require("./binaryTree");

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

const rightInverseOperations = {
  "+": (res, b) => res - b,
  "-": (res, b) => b - res,
  "*": (res, b) => res / b,
  "/": (res, b) => b / res,
};

const leftInverseOperations = {
  "+": (res, b) => res - b,
  "-": (res, b) => res + b,
  "*": (res, b) => res / b,
  "/": (res, b) => res * b,
};

async function main() {
  const lines = await utils.readLinesFromFile("./data.txt");

  const nodes = lines.map((line) => {
    const [key, rest] = line.split(": ");
    let value,
      operation,
      left = null,
      right = null;
    if (key === "root") {
      const [l, op, r] = rest.split(" ");
      left = l;
      right = r;
      value = (a, b) => a === b;
    } else if (key === "humn") {
      value = () => "x";
    } else if (isNaN(Number(rest))) {
      const [l, op, r] = rest.split(" ");
      operation = op;
      left = l;
      right = r;
      value = operations[op];
    } else {
      value = () => Number(rest);
    }
    return {
      key,
      left,
      right,
      value,
      operation,
    };
  });

  const tree = new BinaryTree("root", (a, b) => a === b);

  function insertInTree(parentKey) {
    const node = nodes.find((n) => n.key === parentKey);

    if (node.left && node.right) {
      const left = nodes.find((n) => n.key === node.left);
      tree.insert(parentKey, left.key, {
        fn: left.value,
        op: left.operation,
      });
      insertInTree(node.left);
      const right = nodes.find((n) => n.key === node.right);
      tree.insert(parentKey, right.key, {
        fn: right.value,
        op: right.operation,
      });
      insertInTree(node.right);
    }
  }

  insertInTree("root");

  function calcRes(node) {
    if (node.left && node.right) {
      const left = calcRes(node.left);
      const right = calcRes(node.right);

      if (left instanceof Object || left === "x") {
        return {
          left,
          right,
          value: leftInverseOperations[node.value.op],
        };
      }

      if (right instanceof Object || right === "x") {
        return {
          left,
          right,
          value: rightInverseOperations[node.value.op],
        };
      }

      return node.value.fn(left, right);
    }

    return node.value.fn();
  }

  const left = calcRes(tree.root.left);
  const right = calcRes(tree.root.right);

  function calc(node, rez) {
    if (node.left instanceof Object) {
      const res = node.value(rez, node.right);
      calc(node.left, res);
    }
    if (node.right instanceof Object) {
      const res = node.value(rez, node.left);
      calc(node.right, res);
    }
    if (node.left === "x") {
      console.log(node.value(rez, node.right));
    }
    if (node.right === "x") {
      console.log(node.value(rez, node.left));
    }
  }

  if (left instanceof Object) {
    calc(left, right);
  } else {
    calc(right, left);
  }
}

main();
