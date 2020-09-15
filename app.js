// var form = document.getElementById('form');
// const name = document.getElementById('name');
// const itemList = document.getElementById('item');

// // form submit event
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     checkInput();
//     addItem();
// });

// // delete event Listener 
// itemList.addEventListener('click', removeItem);

// function checkInput(){
//     const nameValue = name.value.trim();

//     if(nameValue === '' ) {
//         setErrorMessage(name, 'Please fill in the gaps');
//     } else {
//         setSucessFor(name);
//     }
// }

// function setErrorMessage (input, message) {
//     const formControl = input.parentElement;
//     const small = formControl.querySelector('small');

//     small.innerText = message;
//     formControl.className = 'form-control error';
// }

// function setSucessFor(input) {
//     const formControl = input.parentElement;
//     formControl.className = 'form-control sucess';

// }


// // add item

// function addItem() {
  
//     // get input value 
//     var newItem = document.getElementById('name').value;

//     // create new li element
//     var li = document.createElement('li');

//     // Add Class 
//     li.className = 'list-group';

//     //  add text node with input value 
//     li.appendChild(document.createTextNode(newItem));

//     // create delete button
//     var deleteBtn = document.createElement('button');

//     // add classes to delete btn
//     deleteBtn.appendChild(document.createTextNode('x'));

//     deleteBtn.className = 'delete';
//     // append button to li
//     li.appendChild(deleteBtn);
    
//     //append child
//     itemList.appendChild(li);
// }

// function removeItem(e) {
//    if(e.target.classList.contains('delete')){
//        if(confirm('Are You Sure?')) {
//            var li = e.target.parentElement;
//            itemList.removeChild(li);
//        }
//     }
// }

document.getElementById('form').addEventListener('submit', saveTodo);

function saveTodo(e) {
    // get form values
    var todoName = document.getElementById('todoName').value;
  
    if(!validateForm(todoName)){
        return false;
    }

    var todo = {
        name: todoName
    }

    // //local storage text - stores string
    // localStorage.setItem('test', 'hello world');
    // console.log(localStorage.getItem('test'));
    
    // text if todos is null
    if(localStorage.getItem('todos') === null) {
        // get array
        var todos = [];
        // add to array
        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        // get todos from local storage
        var todos = JSON.parse(localStorage.getItem('todos'));
        // add todo to array
        todos.push(todo);
        // re-set back to local storage
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    // clear form 
    document.getElementById('form').reset();

    //re-fetch todos
    fetchTodos();

    //prevent default the form from submitting
    e.preventDefault();
}
//delete todos 
function deleteTodo(name) {
    // get todos form localStorage
    var todos = JSON.parse(localStorage.getItem('todos'));

    //loop through todos
    for(var i =0; i < todos.length; i++) {
        if(todos[i].name == name){
            if(confirm('Are you sure?')){
                todos.splice(i, 1);
            }
           
        }
    }
    // re-set back to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));

    // reset todos 
    fetchTodos();
}

// fetch todos 
function fetchTodos() {

    // get todos from localStorage
    var todos = JSON.parse(localStorage.getItem('todos'));
    
    // get output id
    var todosResults = document.getElementById('todoResults');

    //build output
    todosResults.innerHTML = ' ';

    // loop through the output
    for (var i = 0; i < todos.length; i++) {
        var name = todos[i].name;

        todosResults.innerHTML += '<div class = "results"> ' + 
                                  '<h3 class= "checked">'+name+
                                  '<div class = "button-group" >' +
                                  '<button onclick ="deleteTodo(\''+name+'\')" class = "btn-danger">X</button>' +
                                  '</div>'+
                                  '</h3>' + 
                                  '</div>';
    }
}



// // complete todos 
// function completeTodo() {

//     // get todos form localStorage
//     var todos = JSON.parse(localStorage.getItem('todos'));
//     // todoResults
//     var todoResults = document.getElementById('todoResults');

//     //loop through todos
//     for(var i = 0; i < todos.length; i++) {
//         todoResults.style.textDecoration = 'line-through';
//     }
//     // re-set back to localStorage
//     localStorage.setItem('todos', JSON.stringify(todos));

//     // reset todos
//     fetchTodos();
// }

function validateForm(todoName){
      
    if(!todoName) {
        alert('please fill in the form');
        return false;
    }

    return true;
}

