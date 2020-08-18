### 불변 객체란?
- 불변 객체(Immutable Object)는 최근 React, Vue 등의 라이브러리나 프레임워크 뿐만 아니라 함수형 프로그래밍, 디자인 패턴 등에서도 매우 중요한 기초 개념입니다. 
### 불변 객체가 필요한 순간
값으로 전달받은 객체를 변경 하더라도 원본 객체가 변하지 않아야 하는 경우에 불변 객체가 필요합니다.
```javascript
const user = {
  name: 'yujo',
  gender: 'male',
};

const changeName = (user, newName) => {
  const newUser = user;
  newUser.name = newName;
  return newUser;
};

const user2 = changeName(user, 'YUJO');

if (user !== user2) {
  console.log('User information has changed.');
}

console.log(`USER1 : ${user.name}`);
console.log(`USER2 : ${user2.name}`);
console.log(`USER1 === USER2? ${user === user2}`);

```
- 위의 코드를 실행하게 되면 출력값은 다음과 같습니다.
```javascript
USER1 : YUJO
USER2 : YUJO
USER1 === USER2 ? true
```
- 위 코드는 객체의 가변성으로 인한 문제점을 보여주는 예시입니다. 만약 위의 코드에서```if (user !== user2)``` 이 조건이 성립했다면 ```User information has changed.```라는 문자열이 콘솔에 출력되야 하지만 실제 작동시 출력없이 해당 조건문을 통과하게 됩니다.
- 만약 정보가 바뀐 시점에 알람을 보내야 하거나 바뀌기 전의 정보와 바뀐 후의 정보를 보여주기 위한 기능을 구현할 때는 이와 같은 가변성은 문제가 됩니다. 해당 문제를 해결하기 위해 아래와 같이 코드를 변경할 수 있습니다.
```javascript
const user = {
  name: 'yujo',
  gender: 'male',
};

const changeName = (user, newName) => {
  return {
    name: newName,
    gender: user.gender,
  };
};

const user2 = changeName(user, 'YUJO');

if (user !== user2) {
  console.log('User information has changed.');
}

console.log(`USER1 : ${user.name}`);
console.log(`USER2 : ${user2.name}`);
console.log(`USER1 equal USER2 ? ${user === user2}`);

```
- 위의 코드를 실행시키면 아래와 같은 출력값이 나옵니다.
```javascript
User information has changed.
USER1 : yujo
USER2 : YUJO
USER1 equal USER2 ? false
```
- 위와 같이 ```changeName```함수가 새로운 객체를 반환하도록 수정하게 되면 ```user```과```user2```는 서로 다른 객체이므로 안전하게 변경 전과 변경 후를 비교할 수 있습니다.
### 조금 더 우아하게 만들기
- ```changeName```함수가 새로운 객체를 반환하도록 변경한 것만으로도 기존 객체의 불변성을 유지하며 새로운 객체를 만들 수 있었습니다. 다만 새로운 객체를 만들면서 변경할 필요가 없는 기존 객체의 프로퍼티(gender)를 하드코딩으로 입력했습니다. 이런 식으로는 객체에 담긴 프로퍼티의 개수가 많아질수록 입력해야하는 코드가 길어집니다.
- 아래와 같이 프로퍼티 개수와 상관없이 모든 프로퍼티르 복사하는 함수를 만들어서 조금 더 편하게 코드를 작성할 수 있습니다.
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
  gender: 'male',
};

const user2 = copyObject(user);
user2.name = 'YUJO';

if (user !== user2) {
  console.log('User information has changed.');
}

console.log(`USER1 : ${user.name}`);
console.log(`USER2 : ${user2.name}`);
console.log(`USER1 equal USER2 ? ${user === user2}`);
```
- 출력값
```javascript
User information has changed.
USER1 : yujo
USER2 : YUJO
USER1 equal USER2 ? false
```
- 새로 만든 ```copyObject``` 함수를 통해 간단하게 객체를 복사하고 내용을 수정하는데 성공했습니다. 다만 협업하는 모든 사람들과 객체 내부의 변경이 필요할 때 ```copyObject```함수를 사용하기로 협의하고 그 규칙을 준수해야만 ```user```객체를 불변 객체로 볼 수 있습니다.
- 하지만 현실적으로는 어려운 일이므로 규칙을 따르지 않고는 프로퍼티 변경이 불가능하도록 ```immer.js```, ```immutable.js```, ```baobab.js```등의 라이브러리를 많이 사용합니다.
___
- 공부하면서 알게 된 내용을 정리한 글입니다.
- 궁금한 점이 있으시거나 잘못된 내용이 있다면 댓글로 알려주시면 감사하겠습니다.


[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fvelog.io%2F%40yujo%2FJS%25EB%25B6%2588%25EB%25B3%2580-%25EA%25B0%259D%25EC%25B2%25B4Immutable-Object-%25EB%25A7%258C%25EB%2593%25A4%25EA%25B8%25B0)](https://hits.seeyoufarm.com)
