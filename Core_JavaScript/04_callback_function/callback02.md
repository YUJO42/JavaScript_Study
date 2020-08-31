### 콜백 지옥(callback hell)
- **콜백 지옥(callback hell)**은 콜백 함수를 익명 함수로 전달하는 과정이 반복되어 코드의 들여쓰기 수준이 감당하기 힘들정도로 깊어지는 현상을 얘기합니다. 주로 이벤트 처리나 서버 통신과 같은 비동기적인 작업을 수행하기 위해 이런 형태가 자주 등장하는데, 가독성이 떨어지면서 코드를 수정하기 어렵습니다.
>**동기(synchronous)적 방식** : 현재 실행 중인 코드가 완료된 후 다음 코드를 실행
>**비동기(asynchronous)적 방식** : 현재 실행중인 코드의 완료 여부와 무관하게 즉시 다음 코드로 넘어가서 실행.
___
### 콜백 지옥 예시
```javascript
setTimeout(
  (name) => {
    let coffeeList = name;
    console.log(coffeeList);

    setTimeout(
      (name) => {
        coffeeList += ', ' + name;
        console.log(coffeeList);

        setTimeout(
          (name) => {
            coffeeList += ', ' + name;
            console.log(coffeeList);

            setTimeout(
              (name) => {
                coffeeList += ', ' + name;
                console.log(coffeeList);
              },
              500,
              'Latte',
            );
          },
          500,
          'Mocha',
        );
      },
      500,
      'Americano',
    );
  },
  500,
  'Espresso',
);
```
- 위 코드는 0.5초마다 커피 목록을 수집하고 출력합니다. 
```javascript
> 출력값
Espresso (0.5초)
Espresso, Americano (1.0초)
Espresso, Americano, Mocha (1.5초)
Espresso, Americano, Mocha, Latte (2.0초)
```
- 각 콜백은 커피 이름을 전달하고 목록에 이름을 추가합니다. 정상적으로 실행되지만 들여쓰기 수준이 과도하게 깊어지고 값이 아래에서 위로 전달되어 가독성이 떨어집니다.

### 콜백 지옥 탈출 1. 기명함수
- 가독성 문제와 어색함을 동시에 해결하는 가장 간단한 방법은 익명의 콜백 함수를 모두 기명함수로 전환하는 것입니다.
```javascript
let coffeeList = '';

const addEspresso = (name) => {
  coffeeList = name;
  console.log(coffeeList);
  setTimeout(addAmericano, 500, 'Americano');
};

const addAmericano = (name) => {
  coffeeList += ', ' + name;
  console.log(coffeeList);
  setTimeout(addMocha, 500, 'Mocha');
};

const addMocha = (name) => {
  coffeeList += ', ' + name;
  console.log(coffeeList);
  setTimeout(addLatte, 500, 'Latte');
};

const addLatte = (name) => {
  coffeeList += ', ' + name;
  console.log(coffeeList);
};

setTimeout(addEspresso, 500, 'Espresso');
```
- 위 코드는 익명함수를 모두 기명함수로 변경한 코드입니다. 이 방식은 코드의 가독성을 높일 수 있고 함수 선언과 함수 호출만 구분할 수 있다면 위에서부터 아래로 순서대로 읽는데 어려움이 없습니다.
- 하지만 일회성 함수를 전부 변수에 할당하는 것은 코드명을 일일이 따라다녀야 하기 때문에 오히려 헷갈림을 유발할 소지가 있습니다. 
- ES6에도입 된 ```Promise```, ```Generator```, ES2017에 도입된 ```async/await```를 통해서 콜백 지옥을 해결할 수도 있습니다.
### 콜백 지옥 탈출 2. Promise
```javascript
new Promise((resolve) => {
  setTimeout(() => {
    let name = 'Espresso';
    console.log(name);
    resolve(name);
  }, 500);
})
  .then((prevName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let name = prevName + ', Americano';
        console.log(name);
        resolve(name);
      }, 500);
    });
  })
  .then((prevName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let name = prevName + ', Mocha';
        console.log(name);
        resolve(name);
      }, 500);
    });
  })
  .then((prevName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let name = prevName + ', Latte';
        console.log(name);
        resolve(name);
      }, 500);
    });
  });
```
- 위 코드는 ES6의 ```Promise```를 이용한 방식입니다. 
- new 연산자와 함께 호출한 ```Promise```의 인자로 넘겨주는 콜백 함수는 호출할 때 바로 실행되지만 그 내부에 ```resolve``` 또는 ```reject```함수를 호출하는 구문이 있을 경우 둘 중 하나가 실행되기 전까지는 ```then```또는 ```catch```로 넘어가지 않습니다. 따라서 비동기 작업이 완료될 때 ```resolve``` 또는 ```reject```를 호출하는 방법으로 비동기 작업의 동기적 표현이 가능해집니다.

```javascript
const addCoffee = (name) => {
  return (prevName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newName = prevName ? `${prevName}, ${name}` : name;
        console.log(newName);
        resolve(newName);
      }, 500);
    });
  };
};

addCoffee('Espresso')()
  .then(addCoffee('Americano'))
  .then(addCoffee('Mocha'))
  .then(addCoffee('Latte'));
```
- 위와 같이 반복적인 내용을 함수화해서 짧게 표현할 수도 있습니다.
### 콜백 지옥 탈출 3. Generator
```javascript
const addCoffee = (prevName, name) => {
  setTimeout(() => {
    coffeeMaker.next(prevName ? `${prevName}, ${name}` : name);
  }, 500);
};

const coffeeGenerator = function* () {
  const espresso = yield addCoffee('', 'Espresso');
  console.log(espresso);
  const americano = yield addCoffee(espresso, 'Americano');
  console.log(americano);
  const mocha = yield addCoffee(americano, 'Mocha');
  console.log(mocha);
  const latte = yield addCoffee(mocha, 'Latte');
  console.log(latte);
};

const coffeeMaker = coffeeGenerator();
coffeeMaker.next();
```
- 위 코드는 ES6의 ```Generator```를 이용했습니다. ```function* ()```이런 형식으로 작성된 함수가```Generator```함수입니다. ```Generator```함수를 실행하면 ```Iterator```가 반환되는데 ```Iterator```는 ```next```메서드를 가지고 있습니다. 이 ```next```메서드를 호출하면 앞서 멈췄던 부분부터 시작해서 그다음에 등장하는 ```yield```에서 함수의 실행을 멈춥니다. 
- 따라서 비동기 작업이 완료되는 시점마다 ```next```메서드를 호출하면 ```Generator```함수 내부의 소스가 위에서부터 아래로 순차적으로 진행됩니다.
### 콜백 지옥 탈출 4. Promise + async/await
```javascript
const addCoffee = (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, 500);
  });
};

const coffeeMaker = async () => {
  let coffeeList = '';
  let _addCoffee = async (name) => {
    coffeeList += (coffeeList ? ', ' : '') + (await addCoffee(name));
  };
  await _addCoffee('Espresso');
  console.log(coffeeList);
  await _addCoffee('Americano');
  console.log(coffeeList);
  await _addCoffee('Mocha');
  console.log(coffeeList);
  await _addCoffee('Latte');
  console.log(coffeeList);
};

coffeeMaker();
```
- 위 코드는 ES2017애서 추가 된 ```async/await```를 이용한 코드입니다.
- 비동기 작업을 수행하고자 하는 함수 앞에 ```async```를 표기하고, 함수 내부에서 실직적인 비동기 작업이 필요한 위치마다 ```await```를 표기하는 것만으로 뒤의 내용을 ```Promise```로 자동 전환하고 해당 내용이 ```resolve```된 이후에야 다음으로 진행됩니다. 

### 정리
- 비동기적인 작업을 수행하기 위해 콜백함수를 익명함수로 전달하는 과정에서 생기는 콜백 지옥을 ```Promise```, ```Generator```, ```async/await```등을 사용해서 방지할 수 있다.

___
- 공부하면서 알게 된 내용을 정리한 글입니다.
- 궁금한 점이 있으시거나 잘못된 내용이 있다면 댓글로 알려주시면 감사하겠습니다.
