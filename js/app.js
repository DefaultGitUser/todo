'use strict';

const root = document.querySelector('.todoapp');
const newTodoField = root.querySelector('.new-todo');
const itemList = root.querySelector('.todo-list');

function updateInfo() {
  const counter = root.querySelector('.todo-count');
  
  const nonCompletedTogglers = root.querySelectorAll('.toggle:not(:checked)')
  
  counter.innerHTML = `${nonCompletedTogglers.length} items left`;
}
// console.log(root);
newTodoField.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') {
    return;
  }

  if (!newTodoField.value) {
    return;
  }

  const id = +new Date();

  itemList.insertAdjacentHTML('beforeend', `
    <li class="todo-item">
      <input id="todo-${id}" class="toggle" type="checkbox">
      <label for="todo-${id}">${newTodoField.value}</label>
      <button class="destroy"></button>
    </li>
  `);

  newTodoField.value = '';
  updateInfo();
})


itemList.addEventListener('click', (e) => {
  if (!e.target.matches('.destroy')) {
    return;
  }

  e.target.closest('.todo-item').remove();
  updateInfo();
});

itemList.addEventListener('change', (e) => {
  if (!e.target.matches('.toggle')) {
    return;
  }

  e.target.closest('.todo-item').classList.toggle('completed', e.target.checked);
  updateInfo();
});