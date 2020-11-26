// const obj = {
//   methodA: function () {
//     console.log(this);
//   },
//   inner: {
//     methodB: function () {
//       console.log(this);
//     },
//   },
// };

// obj.methodA();
// obj['methodA']();

// console.log('-----------------------------------');

// obj.inner.methodB();
// obj.inner['methodB']();
// obj['inner'].methodB();
// obj['inner']['methodB']();

const obj1 = {
  outer: function () {
    console.log(`${this}`);
    const innerFunc = function () {
      console.log(this);
    };
    innerFunc();

    const obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod();
  },
};

obj1.outer();
