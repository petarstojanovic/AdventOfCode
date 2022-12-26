const fs = require("fs");
const readline = require("readline");

const partOne = async () => {
  const fileStream = fs.createReadStream("./data.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let count = 0;

  for await (const line of rl) {
    let [first, second] = line.split(",");
    const [A, B] = first.split("-").map(Number);
    const [X, Y] = second.split("-").map(Number);

    if ((A >= X && B <= Y) || (A <= X && B >= Y)) {
      count++;
    }
  }

  console.log(count);
};

function areOverlapping(A, B) {
  if (B[0] <= A[0]) {
    return B[1] >= A[0];
  } else {
    return B[0] <= A[1];
  }
}

const partTwo = async () => {
  const fileStream = fs.createReadStream("./data.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let count = 0;

  for await (const line of rl) {
    let [first, second] = line.split(",");
    const A = first.split("-").map(Number);
    const B = second.split("-").map(Number);

    if (areOverlapping(A, B)) {
      count++;
    }
  }

  console.log(count);
};

partOne();
partTwo();
