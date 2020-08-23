/* 다음 코드의 출력 값으로 알맞은 것은?
    
    let a = 10;
    let b = 2;

    for (let i = 1; i < 5; i += 2){
        a += i;
    }

    console.log(a + b);
*/

// my answer : 16

// check answer

let a = 10;
let b = 2;

for (let i = 1; i < 5; i += 2) {
  a += i;
  console.log(`current value of 'a' : ${a}`);
}

console.log(a + b);
