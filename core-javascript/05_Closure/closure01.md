### 클로저(Closure)
- **클로저(Closure)**는 자바스크립트 고유의 개념은 아닌 여러 함수형 프로그래밍 언어에 등장하는 보편적인 특성입니다.

```javascript
const outer = () => {
  let a = 1;
  const inner = () => {
    return ++a;
  };
  return inner;
};

let outer2 = outer();
console.log(outer2());
> 2
console.log(outer2());
> 3
```
- 위의 코드를 실행해 보면 ```outer2()``` 함수가 한번 실행 된 이후에도 a의 값이 가비지 콜렉터에 의해 수집되지 않고 그대로 남아 다시 ```outer2()```를 호출했을 때 값이 2 -> 3으로 증가하는 것을 확인할 수 있습니다.
- 이를 이해하기 위해서는 가비지 컬렉터의 동작 방식을 알아야 합니다. 가비지 컬렉터는 어떤 값을 참조하는 변수가 하나라도 있다면 그 값은 수집 대상에 포함시키지 않습니다.
- 위의 코드를 보면 ```outer()```함수는 종료 시점에서 ```inner()```함수를 반환합니다. 외부함수인 ```outer()```가 종료되더라도 내부함수인 ```inner()```함수는 ```outer2()```함수에 의해 호출될 가능성이 생긴 것입니다. 언젠가 다시 호출되어 ```inner()```함수의 실행 컨텍스트가 활성화되면 ```outer()```함수의 ```LexicalEnvironment```를 필요로 하므로 수집 대상에서 제외됩니다.
- #### 즉 클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상을 말합니다.

### 클로저와 메모리 관리
- 클로저는 객체지향과 함수형 모두를 아우르는 중요한 개념입니다. '메모리 누수'를 이유로 클로저 사용을 지양하는 사람도 있습니다. 하지만 '메모리 누수'란 개발자의 의도와 달리 어떤 값의 참조 카운트가 0이 되지 않아 가비지 콜렉터의 수거 대상이 되지 않을 때 사용하는 표현입니다. 개발자가 의도적으로 참조 카운트를 0이 되지 않게 설계하는 경우는 '누수'라고 할 수 없습니다.
- 클로저는 필요에 의해 의도적으로 함수의 지역변수를 메모리에 할당합니다. 따라서 메모리를 관리하기 위해서는 필요가 사라진 시점에 메모리를 소모하지 않게 해주면 됩니다.
- 다음과 같은 방법들로 메모리를 해제할 수 있습니다.
#### return에 의한 클로저의 메모리 해제
```javascript
let outer = (() => {
  let a = 1;
  const inner = () => {
    return ++a;
  };
  return inner;
})();

console.log(outer());
console.log(outer());
outer = null;
```
#### setInterval에 의한 클로저의 메모리 해제
```javascript
(function () {
  let a = 0;
  let intervalId = null;
  let inner = () => {
    if (++a >= 10) {
      clearInterval(intervalId);
      inner = null;
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();
```
#### eventListener에 의한 클로저의 메모리 해제
```javascript
(function () {
  let count = 0;
  let button = document.createElement('button');
  button.innerText = 'click';

  let clickHandler = () => {
    console.log(++count, 'times clicked');
    if (count >= 10) {
      button.removeEventListener('click', clickHandler);
      clickHandler = null;
    }
  };
  button.addEventListener('click', clickHandler);
  document.body.appendChild(butto);
})();
```
___
