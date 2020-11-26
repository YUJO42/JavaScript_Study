### 콜백 함수란?
- 콜백 함수(Callback Function)은 다른 코드의 인자로 넘겨주는 함수입니다. 콜백 함수를 넘겨받은 코드는 이 콜백 함수를 필요에 따라 적절한 시점에 실행합니다.
### 제어권
```javascript
let count = 0;
const timer = setInterval(() => {
  console.log(count);
  if (++count > 4) clearInterval(timer);
}, 300);
```
- ```setInterval```을 호출하면서 두개의 매개변수를 전달했습니다. 첫 째는 익명함수, 두 번째는 300이라는 숫자입니다.

```const intervalID = scope.setInterval(func, delay[, param1, param2, ...]``` 
- ```setInterval```의 구조는 위와 같습니다 ```scope```에서는 ```Window```객체 또는 ```Worker```의 인스턴스가 들어올 수 있습니다. 두 객체 모두 ```setInterval```메서드를 제공합니다. 
- ```setInterval```메서드의 매개변수로 func, delay값을 필수로 전달해야 하며 세 번째 매개변수부터는 선택적으로 전달할 수 있습니다.
```javascript
let count = 0;
const callbackFunction = () => {
  console.log(count);
  if (++count > 4) clearInterval(timer);
};

const timer = setInterval(callbackFunction, 300);
-> 실행결과
0 (0.3초)
1 (0.6초)
2 (0.9초)
3 (1.2초)
4 (1.5초)
```
- 다시 위와 같은 함수가 있을 때 ```timer```변수에는 ```setInterval```의 ID값이 담깁니다. ```setInterval```에 전달한 첫 번째 인자인 ```callbackFunction```은 0.3초마다 자동으로 실행됩니다. 콜백 함수 내부에서는 ```count```를 1씩 증가시킨 다음 값이 4보다 크면 반복 실행이 종료됩니다.
- ```setIntereval```이라는 다른 코드에 첫번째 인자로 ```callbackFunction```을 넘겨주고 제어권을 받은 ```setInterval```의 판단에 의해 적절한 시점에 익명함수가 실행되는 것입니다.
- 이처럼 콜백함수의 제어권을 넘겨받은 코드는 콜백 함수 호출 시점에 대한 제어권을 가집니다.
