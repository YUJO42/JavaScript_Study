// let count = 0;
// const timer = setInterval(() => {
//   console.log(count);
//   if (++count > 4) clearInterval(timer);
// }, 300);

let count = 0;
const callbackFunction = () => {
  console.log(count);
  if (++count > 4) clearInterval(timer);
};

const timer = setInterval(callbackFunction, 300);
