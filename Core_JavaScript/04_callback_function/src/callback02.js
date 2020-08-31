// @ callback hell
// setTimeout(
//   (name) => {
//     let coffeeList = name;
//     console.log(coffeeList);

//     setTimeout(
//       (name) => {
//         coffeeList += ', ' + name;
//         console.log(coffeeList);

//         setTimeout(
//           (name) => {
//             coffeeList += ', ' + name;
//             console.log(coffeeList);

//             setTimeout(
//               (name) => {
//                 coffeeList += ', ' + name;
//                 console.log(coffeeList);
//               },
//               500,
//               'Latte',
//             );
//           },
//           500,
//           'Mocha',
//         );
//       },
//       500,
//       'Americano',
//     );
//   },
//   500,
//   'Espresso',
// );

// let coffeeList = '';

// const addEspresso = (name) => {
//   coffeeList = name;
//   console.log(coffeeList);
//   setTimeout(addAmericano, 500, 'Americano');
// };

// const addAmericano = (name) => {
//   coffeeList += ', ' + name;
//   console.log(coffeeList);
//   setTimeout(addMocha, 500, 'Mocha');
// };

// const addMocha = (name) => {
//   coffeeList += ', ' + name;
//   console.log(coffeeList);
//   setTimeout(addLatte, 500, 'Latte');
// };

// const addLatte = (name) => {
//   coffeeList += ', ' + name;
//   console.log(coffeeList);
// };

// setTimeout(addEspresso, 500, 'Espresso');

// new Promise((resolve) => {
//   setTimeout(() => {
//     let name = 'Espresso';
//     console.log(name);
//     resolve(name);
//   }, 500);
// })
//   .then((prevName) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         let name = prevName + ', Americano';
//         console.log(name);
//         resolve(name);
//       }, 500);
//     });
//   })
//   .then((prevName) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         let name = prevName + ', Mocha';
//         console.log(name);
//         resolve(name);
//       }, 500);
//     });
//   })
//   .then((prevName) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         let name = prevName + ', Latte';
//         console.log(name);
//         resolve(name);
//       }, 500);
//     });
//   });

// const addCoffee = (name) => {
//   return (prevName) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const newName = prevName ? `${prevName}, ${name}` : name;
//         console.log(newName);
//         resolve(newName);
//       }, 500);
//     });
//   };
// };

// addCoffee('Espresso')()
//   .then(addCoffee('Americano'))
//   .then(addCoffee('Mocha'))
//   .then(addCoffee('Latte'));

// const addCoffee = (prevName, name) => {
//   setTimeout(() => {
//     coffeeMaker.next(prevName ? `${prevName}, ${name}` : name);
//   }, 500);
// };

// const coffeeGenerator = function* () {
//   const espresso = yield addCoffee('', 'Espresso');
//   console.log(espresso);
//   const americano = yield addCoffee(espresso, 'Americano');
//   console.log(americano);
//   const mocha = yield addCoffee(americano, 'Mocha');
//   console.log(mocha);
//   const latte = yield addCoffee(mocha, 'Latte');
//   console.log(latte);
// };

// const coffeeMaker = coffeeGenerator();
// coffeeMaker.next()

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
