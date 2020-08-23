/* 별 찍기
   
    input = 5;

    output

*/

const makeStar = (num) => {
  for (let i = 1; i <= num; i++) {
    let line = '';
    for (let j = 1; j <= num - i; j++) {
      line += ' ';
    }
    for (let k = 1; k <= 2 * i - 1; k++) {
      line += '*';
    }
    console.log(line);
  }
};

// check answer

makeStar(5);
makeStar(10);
