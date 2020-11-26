const fruits = ['apple', 'banana', 'tomato'];
const $ul = document.createElement('ul');

fruits.forEach((fruit) => {
  const $li = document.createElement('li');
  $li.innerText = fruit;
  $li.addEventListener('click', () => {
    alert(`your choice is ${fruit}`);
  });
  $ul.appendChild($li);
});

document.body.appendChild($ul);
