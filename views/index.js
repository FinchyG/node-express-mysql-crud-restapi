// Execute in strict mode
"use strict";

// Declare a Todos object for use by the HTML view
var controller;

// Variable to store API base URL
var BASE_URL = 'http://localhost:4000/todos/';

// Variables to store references to HTML objects
var todosTable = document.getElementById("todosTable");
var todoNameInputBox = document.getElementById("todoNameInputBox");
var todoDescInputBox = document.getElementById("todoDescInputBox");

window.addEventListener("load", () => {
  // Create the Todos object for use by the HTML view
  controller = new Todos();
});

function Todos() {

  // Functions to return model data

  function postNewTodo(inputName, inputDesc) {

    function onSuccess() {
      // after adding new todo to database display it in todosTable and
      // clear name and description input boxes for next todo
      viewAllTodos();
      todoNameInputBox.value = "";
      todoDescInputBox.value = "";
    }

    $.ajax(BASE_URL, {type: "POST", data: {"name": inputName, "description": inputDesc},
      success: onSuccess},
            );
  }

  function viewAllTodos() {

    function onSuccess(data) {

      // Remove currently displayed todos from table
      clearTable();

      // Calculate number of needed rows for amount of todos
      let numOfRows = data.length;

      // Create a new row for each todo, displaying its name and description
      // and creating uniquely identifiable buttons based on its id to edit and delete it
      for (let i = 0; i < numOfRows; i++) {
        let newRow = todosTable.insertRow(todosTable.rows.length);
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);

        cell1.innerHTML = "<input type='text' id='todoName' />";
        cell2.innerHTML = "<input type='text' id='todoDesc' />";
        cell3.innerHTML = "<button id='delBut' onclick='controller.deleteTodo(this)'>Delete</button>";
        cell4.innerHTML = "<button id='savBut' onclick='controller.saveEdit(this)'>Save edit</button>";

        document.getElementById("todoName").setAttribute("value", `${data[i].name}`);
        document.getElementById("todoName").setAttribute("id", `name${data[i].id}`);

        document.getElementById("todoDesc").setAttribute("value", `${data[i].description}`);
        document.getElementById("todoDesc").setAttribute("id", `desc${data[i].id}`);

        document.getElementById("delBut").setAttribute("id", `del${data[i].id}`);

        document.getElementById("savBut").setAttribute("id", `sav${data[i].id}`);
      }
    }

    $.ajax(BASE_URL, {type: "GET", success: onSuccess});
  }

  function saveEditedTodo(clicked_object) {

    function onSuccess() {
      // Update table to show change and inform user change has been saved
      viewAllTodos();
      alert("Changes saved.");
    }

    let todoIdNum = clicked_object.getAttribute("id").substring(3);
    let nameData = document.getElementById("name" + todoIdNum).value;
    let descData = document.getElementById("desc" + todoIdNum).value;

    let URL = BASE_URL + todoIdNum;
    $.ajax(URL, {type: "PUT", data: {"name": nameData, "description": descData},
      success: onSuccess},
            );
  }

  function deleteSelectedTodo(clicked_object) {

    function onSuccess() {
      // Update table to show deletion and inform user deletion has occurred
      viewAllTodos();
      alert("Todo deleted.")
    }

    let todoIdNum = clicked_object.getAttribute("id").substring(3);

    let URL = BASE_URL + todoIdNum;
    $.ajax(URL, {type: "DELETE", success: onSuccess},
            );
  }

  // CONTROLLER FUNCTIONS

  this.addTodo = function () {
    // Store user data from view
    let inputName = todoNameInputBox.value;
    let inputDesc = todoDescInputBox.value;
    postNewTodo(inputName, inputDesc);
  };

  this.viewTodos = function () {
    viewAllTodos();
  };

  this.saveEdit = function (clicked_object) {
    // Ensure user wants to save their todo edit
    if (confirm("Save changes to todo?") == true) {
      saveEditedTodo(clicked_object);
    } else {
      alert("Changes not saved.");
    }
  };

  this.deleteTodo = function (clicked_object) {
    // Ensure user wants to delete todo
    if (confirm("Delete todo?") == true) {
      deleteSelectedTodo(clicked_object);
    } else {
      alert("Todo not deleted.");
    }
  };

  // HELPER FUNCTIONS

  function clearTable() {
    while (todosTable.rows.length > 0) {
      todosTable.deleteRow(-1);
    }
  }
}