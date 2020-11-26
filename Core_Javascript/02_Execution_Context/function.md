### 함수 선언문과 함수 표현식

- 함수 선언문(Function Declaration)과 함수 표현식(Function Expression)은 모두 함수를 새롭게 정의할 때 쓰는 방식입니다.
- **함수 선언문(Function Declaration)**은 `function`정의부만 존재하고 별도의 할당 명령이 없는 것을 의미합니다.
- **함수 표현식(Function Expression)**은 정의한 `function`을 별도의 변수에 할당하는 것을 의미합니다.
- 함수 선언문은 반드시 함수명이 정의돼 있어야 하지만, 함수 표현식은 함수명이 없어도 됩니다.
- 함수명을 정의한 함수 표현식을 '기명 함수 표현식', 정의하지 않은 것을 '익명 함수 표현식'이라고 부르기도 하는데, 일반적으로 함수 표현식은 익명 함수 표현식을 말합니다.

### 함수를 정의하는 세 가지 방식

```javascript
function A() {
  console.log('Hello, I`m A');
}
A();
> Hello, I`m A
```

- 위는 함수를 함수 선언문으로 정의하는 방식입니다.

```javascript
const B = function () {
  console.log('Hello, I`m B');
};
B();
> Hello, I`m B
```

- 위 함수는 익명 함수 표현식입니다. 변수명 B가 곧 함수명이 됩니다.

```javascript
const C = function D() {
  console.log('Hello, I`m C');
};
C();
> Hello, I`m C
D();
> ERROR : D is not defined
```

- 위 함수는 기명 함수 표현식입니다. 변수명은 C, 함수명은 D가 됩니다.

### 함수 선언문과 함수 표현식의 차이

- 함수 선언문과 함수 표현식은 언뜻 보기에는 큰 차이가 없어 보이고, 실제 사용에도 큰 차이를 느끼기 힘들수도 있습니다.
- 게다가 함수 표현식은 함수 선언문과 비교했을 때 함수를 변수에 할당해 메모리 공간을 추가로 차지하는 비효율적인 코드처럼 보이기도 합니다.
- 하지만 자바스크립트 엔진의 작동을 보면 함수 선언문을 통해 함수를 정의하는 것보다 함수 표현식을 사용해 함수를 정의하는 것이 보다 안전한 사용법임을 알 수 있습니다.

```javascript
console.log(functionDeclarationSum(1, 2));
console.log(functionExpressionSum(1, 2));

function functionDeclarationSum(a, b) {
  return a + b;
}

const functionExpressionSum = function (a, b) {
  return a + b;
};
```

- 위와 같은 코드를 작성 후 실행하게 되면 아래와 같은 실행 결과를 볼 수 있습니다.

```javascript
console.log(functionDeclarationSum(1, 2));
> 3

console.log(functionExpressionSum(1, 2));
> ERROR : Cannot access 'functionExpressionSum' before initialization

function functionDeclarationSum(a, b) {
  return a + b;
}

const functionExpressionSum = function (a, b) {
  return a + b;
};
```

- 자바스크립트 엔진은 코드를 실행할 때 정보를 수집한 후 호이스팅(hoisting)을 하게 됩니다.
- 아래의 코드는 호이스팅을 마친 상태의 코드입니다.

```javascript
function functionDeclarationSum(a, b) {
  return a + b;
}
const functionExpressionSum;
console.log(functionDeclarationSum(1, 2));
console.log(functionExpressionSum(1, 2));

functionExpressionSum = function (a, b) {
  return a + b;
};
```

- 위의 호이스팅 된 상태를 보게 되면 함수 선언식을 통해 정의한 함수의 경우 함수 전체가 맨 위로 호이스팅 되면서 함수를 선언하기 이전에 실행가능한 생태가 됩니다.
- 하지만 함수 표현식을 통해 정의한 함수의 경우 함수의 변수 선언부만 호이스팅 되기 때문에 함수가 정의되기 이전에 사용할 수 없는 상태가 됩니다.
- 함수도 하나의 값으로 취급하기 때문에 생기는 현상인데, 이게 바로 함수 선언문과 함수 표현식의 극적인 차이입니다.

---
