const fs = require("fs");
const readline = require("readline");

const UPPERCASE_CHAR_CODE_START = "A".charCodeAt();
const LOWERCASE_CHAR_CODE_START = "a".charCodeAt();

const findIntersection = (...args) => {
  return args.reduce((ac, cur) => {
    if (ac.length === 0) return cur.split("");

    const intersection = [
      ...new Set(ac.filter((value) => cur.includes(value))),
    ];
    return intersection;
  }, []);
};

const getPriority = (char) => {
  if (char.charCodeAt() < LOWERCASE_CHAR_CODE_START) {
    return (char.charCodeAt() % UPPERCASE_CHAR_CODE_START) + 27;
  } else {
    return (char.charCodeAt() % LOWERCASE_CHAR_CODE_START) + 1;
  }
};

const partOne = async () => {
  const fileStream = fs.createReadStream("./data.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let sum = 0;

  for await (const line of rl) {
    const part1 = line.slice(0, line.length / 2);
    const part2 = line.slice(line.length / 2);

    const intersection = [];
    for (const char of part1) {
      if (part2.includes(char)) {
        // we found intersection
        const priority = getPriority(char);
        sum += priority;

        break;
      }
    }
  }

  console.log(sum);
};

const partTwo = async () => {
  const fileStream = fs.createReadStream("./data2.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let sum = 0;
  let group = [];

  for await (const line of rl) {
    group.push(line);

    if (group.length === 3) {
      const intersection = findIntersection(...group);
      const badge = intersection[0];

      const priority = getPriority(badge);
      sum += priority;
      // clear the group
      group = [];
    }
  }

  console.log(sum);
};

partTwo();
