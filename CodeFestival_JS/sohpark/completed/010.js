const readline = require("readline");

function solution(num) {
	for (let i = num; i > 0; i--) {
		console.log(' '.repeat(i) + '*'.repeat(2 * (num - i) + 1) + ' '.repeat(i));
	}
}

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

r1.prompt();

r1.on("line", (input) => {
  solution(input);
  r1.close();
}).on("close", function () {
  process.exit();
});