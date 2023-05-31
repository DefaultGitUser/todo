'use strict';

let currentTodos = [
  {id: 1, title: 'HTML', completed: true},
  {id: 2, title: 'CSS', completed: true},
  {id: 3, title: 'JavaScript', completed: false},
];

let filterType = 'all';

const root = document.querySelector('.todoapp');
render();

function render() {
  const activeTodos = currentTodos.filter(todo => !todo.completed);
  const completedTodos = currentTodos.filter(todo => todo.completed);

  const todos = {
    all: currentTodos,
    active: activeTodos,
    completed: completedTodos,
  }

  const visibleTodos = todos[filterType];
  const header = `
    <header class="header">
      <h1>todos</h1>
      <input 
        class="new-todo" 
        placeholder="What needs to be done?" 
        autofocus
        onkeydown = "handleAddTodo(event)"
      >
    </header>
  `;
  const main = `
  <section class="main">
    <span class = "toggle-all-wrapper">
      <input id="toggle-all" 
        class="toggle-all" 
        type="checkbox"
        ${!activeTodos.length ? 'checked=""' : ''}
        onchange = "toggleAll(event.target.checked)"
      >
      <label for="toggle-all">Mark all as complete</label>
    </span>
    <ul class="todo-list">
      ${visibleTodos.map( todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}"
          data-todo-id = "${todo.id}"
          ${!todo.completed && filterType === 'completed' ? 'hidden=""' : ''}
        >
          <input id="todo-${todo.id}" 
            class="toggle" 
            type="checkbox"
            ${todo.completed ? 'checked=""' : ''}"
            onchange = "toogleTodo(${todo.id}, event.target.checked)"
          >
          <label for="todo-${todo.id}">${todo.title}</label>
          <button 
            class="destroy"
            onclick = "removeTodo(${todo.id})"
          ></button>
        </li>
        `).join('')}
    </ul>
  </section>
  `;
  const footer = `
  <footer class="footer">
    <span class="todo-count">
    ${activeTodos.length} items left
    </span>
    <ul class="filters"
    >
      <li>
        <a href="#/" 
          class="${filterType === 'all' ? 'selected' : ''}" 
          onclick = "setFilterType('all')"
        >
          All
        </a>
      </li>
      <li>
        <a href="#/active" 
          class="${filterType === 'active' ? 'selected' : ''}"
          onclick = "setFilterType('active')"
        >
          Active
        </a>
      </li>
      <li>
        <a href="#/completed"
          class="${filterType === 'completed' ? 'selected' : ''}"
          onclick = "setFilterType('completed')"
        >
          Completed
        </a>
      </li>
    </ul>
    ${completedTodos.length > 0 ? `
      <button class="clear-completed"
        onclick = "clearCompleted()"
      >Clear completed</button>
    ` : ''}
  </footer>
  `;

  root.innerHTML = `
    ${header}

    ${currentTodos.length > 0 ? `
      ${main}
      ${footer}
    ` : ''}
  `;
}



// Clear completed
function clearCompleted() {
  currentTodos =  currentTodos.filter( todo => !todo.completed);

  render();
};

// Toggle all
function toggleAll(isChecked) {
  currentTodos.forEach( todo => {
    todo.completed = isChecked;
  });

  render();
};

// Add todo
function handleAddTodo(event) {
  if (event.key !== 'Enter') {
    return;
  }

  if (!event.target.value) {
    return;
  }

  const id = +new Date();
  
  currentTodos.push({
    id: id,
    title: event.target.value,
    completed: false
  });

  render();
};


function removeTodo(todoId, isChecked) {
  currentTodos = currentTodos.filter(todo => todo.id !== todoId);
  render();
}

function toogleTodo(todoId, isChecked) {
  const todo = currentTodos.find(todo => todo.id === todoId);
  todo.completed = isChecked;
  render();
};

// Filter
function setFilterType(type) {
  filterType = type;
  render();
}
