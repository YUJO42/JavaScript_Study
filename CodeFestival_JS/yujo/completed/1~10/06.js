/* 다음 중 Javascript에서 False로 취급하지 않는 것은
    
    1) NaN
    2) 1
    3) ""
    4) 0
    5) undefined
*/

// my answer : 2) 1

// check answer

const isTrue = (param) => {
  if (param) {
    console.log(`${param} is true`);
  } else {
    console.log(`${param} is false`);
  }
};

isTrue(NaN);
isTrue(1);
isTrue('');
isTrue(0);
isTrue(undefined);
