### 함수 내부의 this

- 어떤 함수를 함수로서 호출할 경우에는 `this`가 지정되지 않습니다. `this`에는 호출한 주체의 정보가 담기는데, 함수로서 호출하는 것은 호출 주체를 명시하지 않고 개발자가 코드에 관여하여 실행한 것이기 때문에 호출 주체의 정보를 알 수 없습니다.
- 실행 컨텍스트가 활성화될 때 `this`는 전역 객체를 바라봅니다. 따라서 함수에서의 `this`는 전역 객체를 가리키게 됩니다.

### 메서드의 내부함수에서의 this

```javascript
const obj1 = {
  outer: function () {
    console.log(this); // --------- (1)
    const innerFunc = function () {
      console.log(this); // ------- (2)(3)
    };
    innerFunc();

    const obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod();
  },
};

obj1.outer();
```

- 위 함수를 실행하게 되면 (1)에서 가장 먼저 호출되어 `this`에 마지막 점 앞의 객체인 `obj1`이 바인딩 되어 다음과 같이 출력됩니다.

```
[object Object]
```

- 그 다음 `outer`안에 `innerFunc`가 호출되어 `this`가 출력됩니다. 이 때는 `this`를 함수로서 호출한 것이므로 자동으로 스코프 체인상의 최상위 객체인 전역객체가 바인딩 되어 다음과 같이 출력됩니다.

```
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Function (anonymous)]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Function (anonymous)]
  }
}
```

- 마지막으로 `obj2.innerMethod()`가 호출되면서 다시 `this`가 출력됩니다 이 때의 `this`는`innerMethod`앞에 바인딩 되어있으므로 `this`는 객체인 `obj2`를 바인딩하고 다음과 같이 출력하게 됩니다.

```
{ innerMethod: [Function: innerFunc] }
```

- this 바인딩에 관해서는 함수를 실행하는 당시의 주변 환경이 중요하지 않고 오로지 해당 함수를 호출하는 구문 앞에 점 또는 대괄호 표기가 있는지 없는지가 관건이 됩니다.

### 메서드 내부 함수에서 this를 우회하는 방법(ES5)

- 이렇게 되면 `this`에 대한 구분은 명확히 할 수 있지만 그 결과 `this`라는 단어가 주는 직관적인 인상과는 달라져 버립니다. 호출 주체가 없을 때는 자동으로 전역객체를 바인딩 하지 않고 주변환경의 `this`를 상속받아 사용하면 좋겠지만 언어가 가지는 고유한 특성상 별다른 수는 없습니다.
- 다만 다행히 이를 우회할 방법이 있습니다. ES5 버전의 대표적인 방법은 변수를 활용하는 것입니다.

```javascript
const obj = {
  outer: function () {
    console.log(this); // ------------ (1)
    const innerFunc1 = function () {
      console.log(this); // ---------- (2)
    };
    innerFunc1();

    const self = this;
    const innerFunc2 = function () {
      console.log(self); // ---------- (3)
    };
    innerFunc2();
  },
};
obj.outer();
```

- 위 코드에서 `innerFunc1`의 내부에서 `this`는 전역객체를 가리킵니다. 하지만 `outer` 스코프에서 `self`라는 변수에 `this`를 저장한 상태에서 호출하는 `innerFunc2`의 경우인 (3)에서는 객체 `obj`가 출력됩니다.
- 다소 허무할 수도 있는 방법이지만 기대에 부합합니다. `this`를 변수를 통해 우회하는 경우 `_this`, `that`, `self`등 다양한 변수명을 사용하는데 `self`가 가장 많이 쓰입니다.

### this를 바인딩하지 않는 함수

- ES6에서는 함수 내부의 `this`가 전역객체를 바라보는 문제를 보완하기 위해서 화살표 함수(Arrow Function)를 도입했습니다. 화살표 함수는 실행 컨텍스트를 생성할 때 `this`바인딩 자체가 빠지게 되어 상위 스코프의 `this`를 그대로 활용할 수 있습니다.

```javascript
const obj = {
  outer: function () {
    console.log(this);
    const innerFunc = () => {
      console.log(this);
    };
    innerFunc();
  },
};

obj.outer();
```

---

- 공부하면서 알게 된 내용을 정리한 글입니다.
- 궁금한 점이 있으시거나 잘못된 내용이 있다면 댓글로 알려주시면 감사하겠습니다.
