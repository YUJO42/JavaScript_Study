// const user = {
//   name: 'yujo',
//   gender: 'male',
// };

// const changeName = (user, newName) => {
//   const newUser = user;
//   newUser.name = newName;
//   return newUser;
// };

// const user2 = changeName(user, 'YUJO');

// if (user !== user2) {
//   console.log('User information has changed.');
// }

// const user = {
//   name: 'yujo',
//   gender: 'male',
// };

// const changeName = (user, newName) => {
//   return {
//     name: newName,
//     gender: user.gender,
//   };
// };

// const user2 = changeName(user, 'YUJO');

// if (user !== user2) {
//   console.log('User information has changed.');
// }

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
