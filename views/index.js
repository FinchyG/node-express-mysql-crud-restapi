// Execute in strict mode
"use strict";

// Declare a Todos object for use by the HTML view
var controller;

// Variable to store HTML table object
var table = document.getElementById("viewTodosTable");
var data = {
    "id": 23
};

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
        
        // remove currently displayed todos from table
        clearTable();
        
        let numOfRows = 3;
        
        for(let i = 0; i < numOfRows; i++) {
            let newRow = table.insertRow(table.rows.length);
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            let cell4 = newRow.insertCell(3);
            let cell5 = newRow.insertCell(4);
            cell1.innerText = "id";
            cell2.innerText = "name";
            cell3.innerText = "description";
            cell4.innerHTML = "<button onclick='controller.deleteTodo(this)'>Delete</button>";
            cell5.innerHTML = "<button onclick='controller.saveEdit(this)'>Save edit</button>";
        }
    }
    
    this.saveEdit = function(clicked_object) {
        clicked_object.setAttribute("name", data.id);
        clicked_object.setAttribute("id", "s1");
        alert(clicked_object.getAttribute("name"));
        alert(clicked_object.getAttribute("id"));
    }
    
    this.deleteTodo = function(clicked_object) {
        clicked_object.setAttribute("name", data.id);
        clicked_object.setAttribute("id", "d1");
        alert(clicked_object.getAttribute("name"));
        alert(clicked_object.getAttribute("id"));
    }    
    
    // HELPER FUNCTIONS
    
    function clearTable() {
        while(table.rows.length > 0) {
            table.deleteRow(-1);
        }       
    }
}