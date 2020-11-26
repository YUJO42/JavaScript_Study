// const outer = () => {
//   let a = 1;
//   const inner = () => {
//     console.log(++a);
//   };
//   inner();
// };

// outer();

// let outer = (() => {
//   let a = 1;
//   const inner = () => {
//     return ++a;
//   };
//   return inner;
// })();

// console.log(outer());
// console.log(outer());
// outer = null;

// (function () {
//   let a = 0;
//   let intervalId = null;
//   let inner = () => {
//     if (++a >= 10) {
//       clearInterval(intervalId);
//       inner = null;
//     }
//     console.log(a);
//   };
//   intervalId = setInterval(inner, 1000);
// })();

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
