/*  랜덤한 숫자 n이 주어집니다.
    3의 배수라면 '짝', 아니라면 n을 출력하세요.
*/

const checker = (param) => {
  if (param % 3 === 0) return console.log('짝');
  else return console.log(param);
};

// check answer

checker(3);
checker(2);
