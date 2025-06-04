function dummyFunc(s) {
  return s
};

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  const word = line.trim();
  console.log(dummyFunc(word));
  rl.close();
});