const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addButton");
const todolist = document.getElementById("todoList");
const completedBtn = document.querySelector(".completed")
const getButton = document.querySelector("#GetButton")
let edittodo = null;

// this will add items to todo list
addBtn.addEventListener(
  "click",
  (add = () => {
    const inputText = inputBox.value.trim();

    // this if will run if there is nothing in the input text
    if (inputText.length <= 0) {
      alert("Add something!!!");
    }
    //this will run if we want to edit the inputtext
    if (addBtn.value == "Edit") {
      editlocaltodos(
        edittodo.target.previousElementSibling.previousElementSibling.innerHTML
      );
      edittodo.target.previousElementSibling.previousElementSibling.innerHTML =
        inputText;
      addBtn.value = "Add";
      inputBox.value = "";
    }
    //this will add an item into the todo list
    else {
      todos = JSON.parse(localStorage.getItem("todos1"));
      let repeated = todos.filter((e) => {
        return e === inputText;
      });
      if (repeated.length > 0) {
        alert("repeated");
        return;
      }
      // if (localStorage.getItem("todos1") != null && repeated.length>0) {
      //     alert("repeated")
      //     return
      // }
      savelocaltodos(inputText);
      getlocallasttodo();
    }

    // document.addEventListener('DOMContentLoaded', getlocaltodos)
    // getlocaltodos()
  })
);

//this event listner will remove an element from the todo list
todolist.addEventListener(
  "click",
  (remove = (e) => {
    // remove a task
    if (e.target.innerHTML == "Remove") {
      todolist.removeChild(e.target.parentElement);
      deletelocaltodos(e.target.parentElement);
    }
    //edit the predefined task
    else if (e.target.innerHTML == "Edit") {
      inputBox.value =
        e.target.previousElementSibling.previousElementSibling.innerHTML;
      inputBox.focus();
      addBtn.value = "Edit";
      edittodo = e;
    }
    else if (e.target.innerHTML == "Completed") {
      console.log(e.target.parentElement)
    }

  })
);


//created a function savelocaltodos that will save the tasks into the local storage
const savelocaltodos = (inputText) => {
  let todos = [];
  // if (localStorage.getItem("todos1").includes(inputText) == true) {
  //     alert("repeated")
  //     return
  // } else {
  if (localStorage.getItem("todos1") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos1"));
  }
  todos.push(inputText);
  localStorage.setItem("todos1", JSON.stringify(todos));

  // }
};

//created a function getlocaltodos that will display todos array into the preview panel
const getlocaltodos = () => {
  let todos;

  if (localStorage.getItem("todos1") === null) {
    todos = [];
  } else {
    //parse will convert the string value of todos1 into array

    todos = JSON.parse(localStorage.getItem("todos1"));

    //foreach will iterate through the todos array
    todos.forEach((todo) => {
      //Creating p tag
      let addli = document.createElement("li");
      let addp = document.createElement("p");
      addp.classList.add("paragraph");
      addp.textContent = todo;
      addli.appendChild(addp);
      todolist.append(addli);
      addli.classList.add("liElements", "forCompleted");
      for (let i in todos) {
        addli.setAttribute("id", i);
      }
      //Creating delete button
      const adddel = document.createElement("button");
      adddel.classList.add("delete");
      adddel.textContent = "Remove";
      addli.append(adddel);

      //Creating Edit button
      const addedit = document.createElement("button");
      addedit.textContent = "Edit";
      addedit.classList.add("Edit");
      addli.append(addedit);
      inputBox.value = "";

      const CompletedBtn = document.createElement("button");
      CompletedBtn.classList.add("completed");
      CompletedBtn.textContent = "Completed";
      addli.append(CompletedBtn);
    });
  }
};

const getlocallasttodo = () => {
  todos = JSON.parse(localStorage.getItem("todos1"));
  let lastElement = todos[todos.length - 1];

  let addli = document.createElement("li");

  let addp = document.createElement("p");
  addp.classList.add("paragraph");
  addp.textContent = lastElement;
  addli.appendChild(addp);
  todolist.append(addli);
  addli.classList.add("liElements");
  for (let i in todos) {
    addli.setAttribute("id", i);
  }

  //Creating delete button
  const adddel = document.createElement("button");
  adddel.classList.add("delete");
  adddel.textContent = "Remove";
  addli.append(adddel);

  //Creating Edit button
  const addedit = document.createElement("button");
  addedit.textContent = "Edit";
  addedit.classList.add("Edit");
  addli.append(addedit);
  inputBox.value = "";

  const CompletedBtn = document.createElement("button");
  CompletedBtn.classList.add("completed");
  CompletedBtn.textContent = "Completed";
  addli.append(CompletedBtn);
};

//created a function that will delete a task from the local storage when we click the remove button
const deletelocaltodos = (todo) => {
  let todos = [];

  if (localStorage.getItem("todos1") === null) {
    localStorage.removeItem("todos1");
  }
  //
  else {
    todos = JSON.parse(localStorage.getItem("todos1"));
  }

  let todoText = todo.firstElementChild.innerHTML;
  let todoindex = todos.indexOf(todoText);
  todos.splice(todoindex, 1);
  localStorage.setItem("todos1", JSON.stringify(todos));
};

const editlocaltodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos1"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos1", JSON.stringify(todos));
  // todos = replaceditem
  // localStorage.setItem('todos1', JSON.stringify(todos))
};

getButton.addEventListener('click', getvalue = async (e) => {
  // let totalPrice = getjson.reduce((total, element)=>{
    //   // console.log(element.price)
    //   return total += element.price
    
    // },0)
    // console.log(totalPrice)
    // console.log(totalPrice.toFixed(2))
    let randomNumber = random(1, 20)
    let getjson = await apiCall(`https://fakestoreapi.com/products/${randomNumber}`)
    console.log(getjson)
})

const random = (min, max) => {
  let randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber
}

const apiCall = async (url) => {
  let response = await axios.get(url)
  return response.data
}
document.addEventListener("DOMContentLoaded", getlocaltodos);

