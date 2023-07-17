// Execute in strict mode
"use strict";

// Declare a Todos object for use by the HTML view
var controller;

window.addEventListener("load", () => {
  console.log("page loaded");
  // Create the Todos object for use by the HTML view
  controller = new Todos();
});

function Todos() {
    
    // functions to return model data

    function postNewTodo(inputName, inputDesc) {
        
        function onSuccess() {
            console.log("Todo added.")
        }
        $.ajax('http://localhost:4000/todos', { type: "POST", data: { "name": inputName, "description": inputDesc}, 
            success: onSuccess },
        );        
    }    
    
    // CONTROLLER FUNCTIONS
    
    this.addTodo = function() {
        let inputName = document.getElementById("todoNameInputBox").value;
        let inputDesc = document.getElementById("todoDescInputBox").value;
        postNewTodo(inputName, inputDesc);
    }
    
    this.viewTodos = function() {
        let table = document.getElementById("viewTodosTable");
        let newRow = table.insertRow(table.rows.length);
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        cell1.innerText = "id";
        cell2.innerText = "name";
        cell3.innerText = "description";
    }
    
    
}