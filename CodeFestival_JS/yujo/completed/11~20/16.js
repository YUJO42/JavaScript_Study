// 문장이 입력되면 거꾸로 출력하기.

const reverse = (str) => {
  return str.split('').reverse().join('');
};

// check answer

console.log(reverse('거꾸로'));
console.log(reverse('a b c d e'));
