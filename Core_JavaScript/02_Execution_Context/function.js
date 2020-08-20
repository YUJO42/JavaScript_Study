// function A() {
//   console.log('Hello, I`m A');
// }
// A();

// const B = function () {
//   console.log('Hello, I`m B');
// };
// B();

// const C = function D() {
//   console.log('Hello, I`m C');
// };
// C();
// D();

console.log(functionDeclarationSum(1, 2));
console.log(functionExpressionSum(1, 2));

function functionDeclarationSum(a, b) {
  return a + b;
}

const functionExpressionSum = function (a, b) {
  return a + b;
};
