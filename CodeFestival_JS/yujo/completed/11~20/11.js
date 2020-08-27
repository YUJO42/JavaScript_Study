// 1부터 100까지 더하는 Code를 완성하세요.

const sum = (param) => {
  for (let i = 1; i <= 100; i++) {
    param += i;
  }
  return param;
};

// check answer

let s = 0;
console.log(sum(s));
