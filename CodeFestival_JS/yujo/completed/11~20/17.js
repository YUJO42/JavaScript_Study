// 매개변수 값이 150이 넘으면 yes, 아니면 no를 출력

const checkHeight = (height) => {
  if (height > 150) return console.log('YES');
  return console.log('NO');
};

// check answer

checkHeight(200);
checkHeight(100);
