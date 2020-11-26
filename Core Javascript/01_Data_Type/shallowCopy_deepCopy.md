### 얕은 복사와 깊은 복사

- **얕은 복사(Shallow Copy)** 는 바로 아래 단계의 값만 복사하는 방법.
- **깊은 복사(Deep Copy)** 는 내부의 모든 값을 찾아서 전부 복사하는 방법.

### 얕은 복사

```javascript
const copyObject = function (target) {
  const result = {};
  for (let props in target) {
    result[props] = target[props];
  }
  return result;
};

const user = {
  name: 'yujo',
  urls: {
    github: 'https://github.com/YUJO42',
    blog: 'https://velog.io/@yujo',
  },
};

const user2 = copyObject(user);

user2.name = 'YUN HO';
console.log(user.name === user2.name);
> false

user.urls.github = 'https://github.com/1234';
console.log(user.urls.github === user2.urls.github);
> true

user2.urls.blog = '';
console.log(user.urls.blog === user2.urls.blog);
> true
```

- 위와 같이 `copyObject`함수를 이용하게 되면 얕은 복사만 수행 하게 됩니다. 얕은 복사만 수행하게 되면 중첩된 객체에서 참조형 데이터가 저장된 프로퍼티를 복사할 때 주소값만 복사한다는 의미입니다.
- 이렇게 된다면 해당 프로퍼티에 대한 원본과 사본이 모두 동일한 참조형 데이터의 주소를 가르키게 돼서 사본을 바꾸면 원본이 바뀌고 원본이 바뀌면 사본도 바뀌게 됩니다.
- 위의 코드의 `user`정보를 console로 확인해 보면 아래와 같이 나오게 됩니다.

```javascript
console.log(user);
> { name: 'yujo',
    urls: { github: 'https://github.com/1234', blog: '' }
  }

console.log(user2);
> { name: 'YUN HO',
    urls: { github: 'https://github.com/1234', blog: '' }
  }
```

- 이전의 코드에서 사본인 user2의 name 프로퍼티를 `user2.name = 'YUN HO';`이와 같이 변경하더라도 원본인 user의 name 프로퍼티는 변경되지 않습니다.
- 그러나 user2의 `urls` 프로퍼티를 `user2.urls.blog = '';`와 같이 변경했을 때는 원본인 user의 값도 같이 바뀐 것을 확인할 수 있습니다.
- 이는 user객체에 직접 속한 프로퍼티에 대해서는 `copyObject`함수를 통해 완전히 새로운 데이터가 만들어진 반면 한 단계 더 들어간 `urls`의 내부 프로퍼티들은 기존 데이터를 그대로 참조하게 돼서 생기는 일입니다. 이런 현상이 발생하지 않게 하려면 `user.urls`프로퍼티에 대해서도 불변 객체로 만들어줄 필요가 있습니다.

### 깊은 복사

- 위와 같은 문제를 해결하고 중첩된 객체에 대한 깊은 복사를 수행하기 위해 다음의 코드를 작성할 수 있습니다.

```javascript
const user2 = copyObject(user);
user2.urls = copyObject(user.urls);

user2.name = 'YUN HO';
console.log(user.name === user2.name);
> false

user.urls.github = 'https://github.com/1234';
console.log(user.urls.github === user2.urls.github);
> false

user2.urls.blog = '';
console.log(user.urls.blog === user2.urls.blog);
> false
```

- 위와 같이 copyObject를 다시 한번 사용해 사본인 user2의 `urls` 프로퍼티를 다시 한번 복사해 새로운 데이터를 만들어서 할당했습니다.
- 즉 어떤 객채를 복사해서 새로운 데이터를 만들 때 원복 객체의 프로퍼티 중 그 값이 **기본형 데이터일 경우에는 그대로 복사**가 되지만 **참조형 데이터는 다시 내부의 프로퍼티를 복사**해야 합니다.
- 이 개념을 바탕으로 `copyObject`함수를 아래와 같이 다시 작성할 수 있습니다.

```javascript
const copyObject = function (target) {
  const result = {};
  if (typeof target === 'object' && target !== null) {
    for (let props in target) {
      result[props] = target[props];
    }
  } else {
    resut = target;
  }
  return result;
};
```

- 위와 같이 함수를 작성하게 되면 매개변수로 들어오는 `target`이 객체인 경우 재귀적으로 `copyObject`를 호출하면서 깊은 복사가 이뤄지게 됩니다. 이 함수를 이용한다면 객체의 원본과 사본이 서로 다른 주소값을 가리키며 원본과 사본이 서로 영향을 주지 않게 됩니다.

```javascript
const copyObject = function (target) {
  const result = {};
  if (typeof target === 'object' && target !== null) {
    for (let props in target) {
      result[props] = copyObject(target[props]);
    }
  } else {
    resut = target;
  }
  return result;
};

const user = {
  name: 'yujo',
  urls: {
    github: 'https://github.com/YUJO42',
    blog: 'https://velog.io/@yujo',
  },
};

const user2 = copyObject(user);

user2.name = 'YUN HO';
console.log(user.name === user2.name);
> false

user.urls.github = 'https://github.com/1234';
console.log(user.urls.github === user2.urls.github);
> false

user2.urls.blog = '';
console.log(user.urls.blog === user2.urls.blog);
> false
```

### 조금 더 우아하게 깊은 복사하기

- 재귀적으로 함수를 작성해 객체를 복사하는 방법말고 다른 방법이 하나 더 있습니다. 객체를 `JSON`문법으로 표현된 문자열로 전환 후 다시 `JSON`객체로 만드는 방법입니다.

```javascript
const copyObjectViaJSON = (target) => {
  return JSON.parse(JSON.stringify(target));
};
```

- 이 방법은 메서드나 숨겨진 프로퍼티인 `__proto__`나 `getter`, `setter`와 같은 `JSON`으로 변경할 수 없는 프로퍼티들은 모두 무시하지만 `httpRequest`로 받은 데이터를 저장한 객체를 복사할 때 등 순수한 정보만을 다룰 때 활용하기 좋습니다.

```javascript
const copyObjectViaJSON = (target) => {
  return JSON.parse(JSON.stringify(target));
};

const user = {
  name: 'yujo',
  urls: {
    github: 'https://github.com/YUJO42',
    blog: 'https://velog.io/@yujo',
  },
};

const user2 = copyObjectViaJSON(user);

user2.name = 'YUN HO';
console.log(user.name === user2.name);
> false

user.urls.github = 'https://github.com/1234';
console.log(user.urls.github === user2.urls.github);
> false

user2.urls.blog = '';
console.log(user.urls.blog === user2.urls.blog);
> false
```

---
