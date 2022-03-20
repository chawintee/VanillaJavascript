// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Function

function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  // newTodo.innerText = 'hey';
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //ADD TODO TO LOCALSTORAGE
  saveLocalTodos(todoInput.value)
  //CHECK MARK BUTTON
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  //CHECK trash BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //APPEND TODO LIST
  todoList.appendChild(todoDiv);
  //Clear Todo INPUT VALUE
  todoInput.value = "";

  // console.log(todoInput);
}

function deleteCheck(e) {
  // console.log(e.target);
  const item = e.target;
  // console.log(todoItem);
  // console.log(item.classList);
  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    // item.remove();
    const todo = item.parentElement;
    //Animation
    todo.classList.toggle("fall");

    removeLocalTodos(todo);

    todo.addEventListener("transitionend", () => todo.remove());

    // todo.remove();
  }

  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
//   console.log(todos);
//   console.log(e.target.value);
  todos.forEach((todo) => {
    //   console.log(todo.classList.contains('completed'));
    //   console.log(todo.style);
    const todoStyle = todo.style
    if(todoStyle != undefined && todoStyle != null){
        switch (e.target.value) {
            case "all":
              todo.style.display = "flex";
              break;
            case "completed":
              if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
              } else {
                todo.style.display = "none";
              }
              break;
            case "uncompleted":
              if (!todo.classList.contains("completed")){
                  todo.style.display = "flex";
              } else {
                  todo.style.display = "none";
              }
              break;
        }    
    }
  });
}

function saveLocalTodos(todo){
    // console.log(localStorage.getItem("todos"));
    //CHECK---HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem("todos") == null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos = [...todos,todo]
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    //CHECK---HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem("todos") == null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach( todo => {

            //Todo DIV
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            //Create LI
            const newTodo = document.createElement("li");
            // newTodo.innerText = 'hey';
            newTodo.innerText = todo;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);
            //CHECK MARK BUTTON
            const completeButton = document.createElement("button");
            completeButton.innerHTML = '<i class="fas fa-check"></i>';
            completeButton.classList.add("complete-btn");
            todoDiv.appendChild(completeButton);
            //CHECK trash BUTTON
            const trashButton = document.createElement("button");
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);
            //APPEND TODO LIST
            todoList.appendChild(todoDiv);

        });

    }

}

function removeLocalTodos (todo){
    //CHECK---HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem("todos") == null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    console.log(todos);
    // console.log(todo.children[0].innerText);
    const todoIndex = todo.children[0].innerText
    // console.log(todos?.indexOf('a'));
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos))
}


// #Note
// const todos = ['apple','john','donut', 'babyboy']
// const johnIndex = todos.indexOf('john')
// todos.splice(johnIndex,1)
// console.log(todos);