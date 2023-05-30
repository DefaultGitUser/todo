'use strict';

let currentTodos = [
  {id: 1, title: 'HTML', completed: true},
  {id: 2, title: 'CSS', completed: true},
  {id: 3, title: 'JavaScript', completed: false},
];

const root = document.querySelector('.todoapp');
const newTodoField = root.querySelector('.new-todo');
const itemList = root.querySelector('.todo-list');
const allToggler = root.querySelector('#toggle-all');
const clearCompletedButton = root.querySelector('.clear-completed');
const filter = root.querySelector('.filters');

function initTodos(todos) {
  for (const todo of todos) {
    itemList.insertAdjacentHTML('beforeend', `
    <li class="todo-item ${todo.completed ? 'completed' : ''}"
      data-todo-id = "${todo.id}"
    >
      <input id="todo-${todo.id}" 
        class="toggle" 
        type="checkbox"
        ${todo.completed ? 'checked=""' : ''}"
      >
      <label for="todo-${todo.id}">${todo.title}</label>
      <button class="destroy"></button>
    </li>
  `);
  }

  updateInfo();
}

initTodos(currentTodos);

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
  const toggleAllWrapper = root.querySelector('.toggle-all-wrapper');
  const footer = root.querySelector('.footer');
  
  counter.innerHTML = `${nonCompletedTogglers.length} items left`;
  allToggler.checked = !nonCompletedTogglers.length;
  clearCompletedButton.hidden = !completedTogglers.length;

  const isTasks = !completedTogglers.length && !nonCompletedTogglers.length;

  toggleAllWrapper.hidden = isTasks;
  footer.hidden = isTasks;

  console.log(currentTodos);
}

// Clear completed
clearCompletedButton.addEventListener('click', () => {
  const completedTogglers = root.querySelectorAll('.toggle:checked');

  for (const toggle of completedTogglers) { 
    toggle.closest('.todo-item').remove();
  }

  currentTodos =  currentTodos.filter( todo => !todo.completed);
  updateInfo();
});

// Toggle all
allToggler.addEventListener('change', (e) => {
  const togglers = root.querySelectorAll('.toggle'); 

  for (const toggle of togglers) {
    toggle.checked = allToggler.checked;
    toggle.closest('.todo-item').classList.toggle('completed', allToggler.checked);
  }

  currentTodos.forEach( todo => {
    todo.completed = allToggler.checked;
  });

  updateInfo();
});

//Add todo
newTodoField.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') {
    return;
  }

  if (!newTodoField.value) {
    return;
  }

  const id = +new Date();
  
  currentTodos.push({
    id: id,
    title: newTodoField.value,
    completed: false
  });

  itemList.insertAdjacentHTML('beforeend', `
    <li class="todo-item"
      data-todo-id = "${id}"
    >
      <input id="todo-${id}" class="toggle" type="checkbox">
      <label for="todo-${id}">${newTodoField.value}</label>
      <button class="destroy"></button>
    </li>
  `);

  newTodoField.value = '';
  updateInfo();
})

// Remove todo
itemList.addEventListener('click', (e) => {
  if (!e.target.matches('.destroy')) {
    return;
  }

  const item = e.target.closest('.todo-item');
  item.remove();

  currentTodos = currentTodos.filter( todo => todo.id !== +item.dataset.todoId );

  updateInfo();
});

itemList.addEventListener('change', (e) => {
  if (!e.target.matches('.toggle')) {
    return;
  }

  const item = e.target.closest('.todo-item');
  item.classList.toggle('completed', e.target.checked);
  const selectedTodo = currentTodos.find( todo => todo.id === +item.dataset.todoId );
  
  selectedTodo.completed = e.target.checked;
  
  updateInfo();
});
