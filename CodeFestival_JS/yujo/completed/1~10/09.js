/* 다음 소스코드를 완성하여 날짜와 시간을 출력하시오.
    const year = '2020';
    const month = '08';
    const day = '23';
    const hour = '20';
    const minute = '51';
    const second = '17';

    const result = ''; // pass

    console.log(result);    
*/

/* my answer : const result1 = `${year}/${month}/${day} ${hour}:${minute}:${second}`; // pass
            const result2 = year.concat(
                            '/',
                            month,
                            '/',
                            day,
                            ' ',
                            hour,
                            ':',
                            minute,
                            ':',
                            second,
                          );
*/
// check answer

const year = '2020';
const month = '08';
const day = '23';
const hour = '20';
const minute = '51';
const second = '17';

const result1 = `${year}/${month}/${day} ${hour}:${minute}:${second}`; // pass
const result2 = year.concat(
  '/',
  month,
  '/',
  day,
  ' ',
  hour,
  ':',
  minute,
  ':',
  second,
);

console.log(result1);
console.log(result2);

// 1이 더 직관적인거 같은데 concat을 많이 쓰나?
