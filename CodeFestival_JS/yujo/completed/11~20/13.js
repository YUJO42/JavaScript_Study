/* 숫자를 입력하면 그 숫자에 해당하는 행성이름을 출력해주세요.
   행성은 8개입니다 수성 금성 지구 화성 목성 토성 천왕성 해왕성
*/

const printPlanet = (param) => {
  const planet = [
    '',
    '수성',
    '금성',
    '지구',
    ' 화성',
    '목성',
    '토성',
    ' 천왕성',
    '해왕성',
  ];

  console.log(planet[param]);
};

// check answer

printPlanet(1);
