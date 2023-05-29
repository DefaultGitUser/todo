'use strict';

const root = document.querySelector('.todoapp');
const newTodoField = root.querySelector('.new-todo');
const itemList = root.querySelector('.todo-list');
const allToggler = root.querySelector('#toggle-all');
const clearCompleetedButton = root.querySelector('.clear-completed');
const filter = root.querySelector('.filters');

filter.addEventListener('click', (e) => {
  if (!e.target.dataset.filter) {
    return;
  }

  const togglers = root.querySelectorAll('.toggle');

  const filterButtons = root.querySelectorAll('[data-filter]'); 

  for (const button of filterButtons) {
    button.classList.toggle('selected', button === e.target);
  }

  for (const toggler of togglers) {
    const item = toggler.closest('.todo-item');

    switch (e.target.dataset.filter) {
      case 'all':
        item.hidden = false;
        break;
      case 'active':
        item.hidden = toggler.checked;
        break;
      case 'completed':
        item.hidden = !toggler.checked;
        break;
    }
  }
});

function updateInfo() {
  const counter = root.querySelector('.todo-count');
  const completedTogglers = root.querySelectorAll('.toggle:checked');
  const nonCompletedTogglers = root.querySelectorAll('.toggle:not(:checked)')
  
  counter.innerHTML = `${nonCompletedTogglers.length} items left`;
  allToggler.checked = !nonCompletedTogglers.length;
  clearCompleetedButton.hidden = !completedTogglers.length;
}

clearCompleetedButton.addEventListener('click', () => {
  const completedTogglers = root.querySelectorAll('.toggle:checked');

  for (const toggle of completedTogglers) { 
    toggle.closest('.todo-item').remove();
  }

  updateInfo();
});

allToggler.addEventListener('change', (e) => {
  const togglers = root.querySelectorAll('.toggle'); 

  for (const toggle of togglers) {
    toggle.checked = allToggler.checked;
    toggle.closest('.todo-item').classList.toggle('completed', allToggler.checked);
  }

  updateInfo();
});

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