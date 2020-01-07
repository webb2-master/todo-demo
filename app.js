let todoList = [];
let todoId = 1;

function renderTodo() {
  const todoListElement = document.querySelector("#todo-list");

  let todoOutput = "";

  todoList.forEach(todo => {
    todoOutput += `
      <li class="todo-item">
          <div onClick="removeTodo(${todo.id}, renderTodo)" class="close">
          </div>
          <form onSubmit="updateTodo(event, ${todo.id})">
            <input id="task-input" type="text" value="${todo.title}" />
          </form>
      </li>
    `;
  });

  todoListElement.innerHTML = todoOutput;
  console.log(todoList);
}

function removeTodo(id, callback) {
  const modal = confirm("Är du säker på att du vill ta bort denna task?");
  if (modal) {
    todoList.forEach((todo, index) => {
      if (todo.id === id) {
        todoList.splice(index, 1);
      }
    });
  }
  callback();
}

function updateTodo(event, id) {
  event.preventDefault();
  const newTitle = event.target.lastElementChild.value;
  if (newTitle) {
    todoList.forEach((todo, index) => {
      if (todo.id === id) {
        todoList.splice(index, 1, {
          id: id,
          title: newTitle
        });
      }
    });
  } else {
    removeTodo(id, renderTodo);
  }
  renderTodo();
}

function addTodo(todo, callback) {
  todoList.splice(0, 0, {
    id: todoId,
    title: todo
  });
  todoId++;
  callback();
}

document.querySelector(".input-form").addEventListener("submit", event => {
  event.preventDefault();
  let inputValue = event.target.lastElementChild.value;

  inputValue ? addTodo(inputValue, renderTodo) : null;

  event.target.lastElementChild.value = "";
});
