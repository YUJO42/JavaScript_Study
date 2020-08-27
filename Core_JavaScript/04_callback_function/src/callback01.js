let count = 0;
const timer = setInterval(() => {
  console.log(count);
  if (++count > 4) clearInterval(timer);
}, 300);
