// const obj = {
//   outer: function () {
//     console.log(this);
//     const innerFunc1 = function () {
//       console.log(this);
//     };
//     innerFunc1();

//     const self = this;
//     const innerFunc2 = function () {
//       console.log(self);
//     };
//     innerFunc2();
//   },
// };

// obj.outer();

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
