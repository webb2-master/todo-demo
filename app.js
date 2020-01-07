let todoList = [];
let todoId = 1;


// Funktion som loopar igenom todoList arrayen och skriver ut innehållet på sidan
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
}

// Funktion som tar bort en ToDo från todoList arrayen
// Parameter 1 = idet på ToDo som ska tas bort
// Parameter 2 = callback funktionen som ska köras
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

// Funktion som redigerar titeln på en ToDO i todoList arrayen
// Parameter 1 = event handlern som ger mig tillgång till den uppdaterade datan som användaren skickar med
// Parameter 2 = idet på ToDo som ska redigeras
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

// Funktion som lägger till en ToDo i todoList arrayen
// Parameter 1 = titeln på ToDo
// Parameter 2 = callback funktionen som ska köras
function addTodo(todo, callback) {
  todoList.splice(0, 0, {
    id: todoId,
    title: todo
  });
  todoId++;
  callback();
}

// Eventlistener som lyssnar efter en submit på elementet med klassen .input-form
document.querySelector(".input-form").addEventListener("submit", e => {

  // Förhindrar refresh på submit
  e.preventDefault();
  let inputValue = e.target.lastElementChild.value;

  // Ternary operator (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
  // En enkel if-sats
  inputValue ? addTodo(inputValue, renderTodo) : null;
  e.target.lastElementChild.value = "";
});
