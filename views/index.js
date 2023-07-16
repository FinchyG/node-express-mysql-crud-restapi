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
    
    
}