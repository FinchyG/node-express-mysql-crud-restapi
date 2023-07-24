// Execute in strict mode
"use strict";

// Declare a Todos object for use by the HTML view
var controller;

// Variable to store API base URL
var BASE_URL = 'http://localhost:4000/todos/';

// Variable to store HTML table object
var viewTodosTable = document.getElementById("viewTodosTable");

window.addEventListener("load", () => {
  console.log("page loaded");
  // Create the Todos object for use by the HTML view
  controller = new Todos();
});

function Todos() {
    
    // functions to return model data

    function postNewTodo(inputName, inputDesc) {
        
        function onSuccess() {
            // after adding new todo to database display it in todo table and
            // clear name and description input boxes for next todo
            viewAllTodos();
            document.getElementById("todoNameInputBox").value = "";
            document.getElementById("todoDescInputBox").value = "";
        }
        
        $.ajax(BASE_URL, { type: "POST", data: { "name": inputName, "description": inputDesc}, 
            success: onSuccess },
        );        
    }
    
    function viewAllTodos() {
 
        function onSuccess(data) {
            
            // remove currently displayed todos from table
            clearTable();

            let numOfRows = data.length;

            for(let i = 0; i < numOfRows; i++) {
                // create new Todo row
                let newRow = viewTodosTable.insertRow(viewTodosTable.rows.length);
                let cell1 = newRow.insertCell(0);
                let cell2 = newRow.insertCell(1);
                let cell3 = newRow.insertCell(2);
                let cell4 = newRow.insertCell(3);
                
                // create elements for new Todo row
                cell1.innerHTML = "<input type='text' id='todoName' />";
                cell2.innerHTML = "<input type='text' id='todoDesc' />";
                cell3.innerHTML = "<button id='delBut' onclick='controller.deleteTodo(this)'>Delete</button>";
                cell4.innerHTML = "<button id='savBut' onclick='controller.saveEdit(this)'>Save edit</button>";
                
                // set name content for todo
                document.getElementById("todoName").setAttribute("value", `${data[i].name}`);
                document.getElementById("todoName").setAttribute("id", `name${data[i].id}`);
                
                // set description content for todo
                document.getElementById("todoDesc").setAttribute("value", `${data[i].description}`);
                document.getElementById("todoDesc").setAttribute("id", `desc${data[i].id}`);
                
                // set unique id for todo delete button
                document.getElementById("delBut").setAttribute("id", `del${data[i].id}`);
                
                // set unique id for todo save edit button
                document.getElementById("savBut").setAttribute("id", `sav${data[i].id}`);
            }
        }
        
        $.ajax(BASE_URL, { type: "GET", success: onSuccess });       
    }
    
    function saveEditedTodo(clicked_object) {
        
        function onSuccess() {
            viewAllTodos();
        }
        
        let todoIdNum = clicked_object.getAttribute("id").substring(3);
        let nameData = document.getElementById("name" + todoIdNum).value;
        let descData = document.getElementById("desc" + todoIdNum).value;
        
        let URL = BASE_URL + todoIdNum;
        $.ajax(URL, { type: "PUT", data: { "name": nameData, "description": descData}, 
            success: onSuccess },
        );       
    }
    
    function deleteSelectedTodo(clicked_object) {
        
         function onSuccess() {
            viewAllTodos();
        }
        
        let todoIdNum = clicked_object.getAttribute("id").substring(3);
        
        let URL = BASE_URL + todoIdNum;
        $.ajax(URL, { type: "DELETE", success: onSuccess },
        );       
    }
    
    // CONTROLLER FUNCTIONS
    
    this.addTodo = function() {
        let inputName = document.getElementById("todoNameInputBox").value;
        let inputDesc = document.getElementById("todoDescInputBox").value;
        postNewTodo(inputName, inputDesc);
    };
    
    this.viewTodos = function() {
        viewAllTodos();
    };
    
    this.saveEdit = function(clicked_object) {
        saveEditedTodo(clicked_object);
    };
    
    this.deleteTodo = function(clicked_object) {
        deleteSelectedTodo(clicked_object);
    };    
    
    // HELPER FUNCTIONS
    
    function clearTable() {
        while(viewTodosTable.rows.length > 0) {
            viewTodosTable.deleteRow(-1);
        }       
    }
}