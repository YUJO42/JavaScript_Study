### this

- **`this`**는 자바스크립트에서 혼란스러운 개념 중 하나입니다.
- 대부분의 객체지향 언어에서 `this`는 클래스로 생성한 인스턴스 객체를 의미합니다. 또한 `this`를 클래스에서만 사용할 수 있기 때문에 혼란의 여지가 상대적으로 적습니다.
- 하지만 자바스크립트의 `this`는 어디서든 사용할 수 있습니다. 상황에 따라 `this`가 가리키는 대상이 달라지는데 어떤 이유로 그 대상을 가리키고 있는지 확인하기 힘든 경우도 있고 예상과 다른 대상을 가리키고 있는 경우도 있습니다.
- 자바스크립트의 함수는 객체처럼 취급되기 때문에(구분이 느슨하기 때문에) `this`는 실질적으로 이 둘을 구분하는 거의 유일한 기능입니다.

### method 내부의 this

- `this`에는 호출한 주체에 대한 정보가 담깁니다. 어떤 함수를 method로 호출하는 경우 호출 주체는 함수명(프로퍼티0앞의 객체입니다. 점(.) 표기법의 경우 마지막 점 앞에 명시된 객체가 곧 `this`가 됩니다.

```javascript
const obj = {
  methodA: function () {
    console.log(this);
  },
  inner: {
    methodB: function () {
      console.log(this);
    },
  },
};

obj.methodA();
> {
  	methodA: [Function: methodA],
  	inner: { methodB: [Function: methodB] }
  }

obj['methodA']();
> {
 	 methodA: [Function: methodA],
  	 inner: { methodB: [Function: methodB] }
  }

obj.inner.methodB();
> { methodB: [Function: methodB] }

obj.inner['methodB']();
> { methodB: [Function: methodB] }

obj['inner'].methodB();
> { methodB: [Function: methodB] }

obj['inner']['methodB']();
> { methodB: [Function: methodB] }
```
