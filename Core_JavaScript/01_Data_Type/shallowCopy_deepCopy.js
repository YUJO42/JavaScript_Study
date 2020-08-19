// const copyObject = function (target) {
//   const result = {};
//   for (let props in target) {
//     result[props] = target[props];
//   }
//   return result;
// };

// const copyObject = function (target) {
//   const result = {};
//   if (typeof target === 'object' && target !== null) {
//     for (let props in target) {
//       result[props] = copyObject(target[props]);
//     }
//   } else {
//     resut = target;
//   }
//   return result;
// };

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

user.urls.github = 'https://github.com/1234';
console.log(user.urls.github === user2.urls.github);

user2.urls.blog = '';
console.log(user.urls.blog === user2.urls.blog);

console.log(user);
console.log(user2);
