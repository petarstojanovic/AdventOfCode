const mathjs = require("mathjs");

async function partOne() {
  const monkeys = [
    {
      items: [75, 75, 98, 97, 79, 97, 64],
      operation: (old) => old * 13,
      test: (item) => (item % 19 === 0 ? 2 : 7),
      iterations: 0,
    },
    {
      items: [50, 99, 80, 84, 65, 95],
      operation: (old) => old + 2,
      test: (item) => (item % 3 === 0 ? 4 : 5),
      iterations: 0,
    },
    {
      items: [96, 74, 68, 96, 56, 71, 75, 53],
      operation: (old) => old + 1,
      test: (item) => (item % 11 === 0 ? 7 : 3),
      iterations: 0,
    },
    {
      items: [83, 96, 86, 58, 92],
      operation: (old) => old + 8,
      test: (item) => (item % 17 === 0 ? 6 : 1),
      iterations: 0,
    },
    {
      items: [99],
      operation: (old) => old * old,
      test: (item) => (item % 5 === 0 ? 0 : 5),
      iterations: 0,
    },
    {
      items: [60, 54, 83],
      operation: (old) => old + 4,
      test: (item) => (item % 2 === 0 ? 2 : 0),
      iterations: 0,
    },
    {
      items: [77, 67],
      operation: (old) => old * 17,
      test: (item) => (item % 13 === 0 ? 4 : 1),
      iterations: 0,
    },
    {
      items: [95, 65, 58, 76],
      operation: (old) => old + 5,
      test: (item) => (item % 7 === 0 ? 3 : 6),
      iterations: 0,
    },
  ];

  const ROUNDS = 20;

  for (let i = 0; i < ROUNDS; i++) {
    let count = monkeys.length;
    for (let index = 0; index < count; index++) {
      const monkey = monkeys[index];

      for (let itemIdx = 0; itemIdx < monkey.items.length; itemIdx++) {
        const item = monkey.items[itemIdx];
        monkey.iterations += 1;

        const currentWorryLevel = Math.floor(monkey.operation(item) / 3);

        const toIdx = monkey.test(currentWorryLevel);
        monkey.items.splice(itemIdx, 1);
        monkeys[toIdx].items.push(currentWorryLevel);
        itemIdx--;
      }
    }
  }

  const [max, secondMax] = monkeys
    .map((m) => m.iterations)
    .sort(function (a, b) {
      return b - a;
    });

  console.log(max * secondMax);
}

async function partTwo() {
  // const monkeys = [
  //   {
  //     items: [75, 75, 98, 97, 79, 97, 64].map((n) => mathjs.bignumber(n)),
  //     operation: (old) => mathjs.multiply(old, mathjs.bignumber(13)),
  //     test: (item) => (mathjs.mod(item, mathjs.bignumber(19)) == 0 ? 2 : 7),
  //     iterations: 0,
  //   },
  //   {
  //     items: [50, 99, 80, 84, 65, 95].map((n) => mathjs.bignumber(n)),
  //     operation: (old) => mathjs.add(old, mathjs.bignumber(2)),
  //     test: (item) => (mathjs.mod(item, mathjs.bignumber(3)) == 0 ? 4 : 5),
  //     iterations: 0,
  //   },
  //   {
  //     items: [96, 74, 68, 96, 56, 71, 75, 53].map((n) => mathjs.bignumber(n)),
  //     operation: (old) => mathjs.add(old, mathjs.bignumber(1)),
  //     test: (item) => (mathjs.mod(item, mathjs.bignumber(11)) == 0 ? 7 : 3),
  //     iterations: 0,
  //   },
  //   {
  //     items: [83, 96, 86, 58, 92].map((n) => mathjs.bignumber(n)),
  //     operation: (old) => mathjs.add(old, mathjs.bignumber(8)),
  //     test: (item) => (mathjs.mod(item, mathjs.bignumber(17)) == 0 ? 6 : 1),
  //     iterations: 0,
  //   },
  //   {
  //     items: [99].map((n) => mathjs.bignumber(n)),
  //     operation: (old) => mathjs.multiply(old, old),
  //     test: (item) => (mathjs.mod(item, mathjs.bignumber(5)) == 0 ? 0 : 5),
  //     iterations: 0,
  //   },
  //   {
  //     items: [60, 54, 83].map((n) => mathjs.bignumber(n)),
  //     operation: (old) => mathjs.add(old, mathjs.bignumber(4)),
  //     test: (item) => (mathjs.mod(item, mathjs.bignumber(2)) == 0 ? 2 : 0),
  //     iterations: 0,
  //   },
  //   {
  //     items: [77, 67].map((n) => mathjs.bignumber(n)),
  //     operation: (old) => mathjs.multiply(old, mathjs.bignumber(17)),
  //     test: (item) => (mathjs.mod(item, mathjs.bignumber(13)) == 0 ? 4 : 1),
  //     iterations: 0,
  //   },
  //   {
  //     items: [95, 65, 58, 76].map((n) => mathjs.bignumber(n)),
  //     operation: (old) => mathjs.add(old, mathjs.bignumber(5)),
  //     test: (item) => (mathjs.mod(item, mathjs.bignumber(7)) == 0 ? 3 : 6),
  //     iterations: 0,
  //   },
  // ];

  const monkeys = [
    {
      items: [79, 98].map((n) => mathjs.bignumber(n)),
      operation: (old) => mathjs.multiply(old, mathjs.bignumber(19)),
      test: (item) => (mathjs.mod(item, mathjs.bignumber(23)) == 0 ? 2 : 3),
      iterations: 0,
    },
    {
      items: [54, 65, 75, 74].map((n) => mathjs.bignumber(n)),
      operation: (old) => mathjs.add(old, mathjs.bignumber(6)),
      test: (item) => (mathjs.mod(item, mathjs.bignumber(19)) == 0 ? 2 : 0),
      iterations: 0,
    },
    {
      items: [79, 60, 97].map((n) => mathjs.bignumber(n)),
      operation: (old) => mathjs.multiply(old, old),
      test: (item) => (mathjs.mod(item, mathjs.bignumber(13)) == 0 ? 1 : 3),
      iterations: 0,
    },
    {
      items: [74].map((n) => mathjs.bignumber(n)),
      operation: (old) => mathjs.add(old, mathjs.bignumber(3)),
      test: (item) => (mathjs.mod(item, mathjs.bignumber(17)) == 0 ? 0 : 1),
      iterations: 0,
    },
  ];

  const ROUNDS = 10000;

  for (let i = 0; i < ROUNDS; i++) {
    console.log("ROUND: ", i);
    let count = monkeys.length;
    for (let index = 0; index < count; index++) {
      const monkey = monkeys[index];

      while (monkey.items.length > 0) {
        const item = monkey.items.shift();
        monkey.iterations += 1;

        const currentWorryLevel = monkey.operation(item);

        const toIdx = monkey.test(currentWorryLevel);
        monkeys[toIdx].items.push(currentWorryLevel);
      }
    }
  }

  const [max, secondMax] = monkeys
    .map((m) => m.iterations)
    .sort(function (a, b) {
      return b - a;
    });

  console.log(monkeys);
  console.log(max * secondMax);
}

async function main() {
  await partOne();
  await partTwo();
}

main();
