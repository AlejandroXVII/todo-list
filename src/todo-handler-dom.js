import { ToDoItem } from './todo-objects'; 
import { LocalStore } from './local-store-handler';

const addTodoItemHandler = (todoListElement,listOBJ) => {
    const $addTodoContainer = document.querySelector('#add-todo-container>form');
    const $addTodoButton = document.querySelector('#add-todo-button');
    const $inputTodo = document.querySelector('#todo-input');
    const $cancelButton = document.querySelector('#cancel-new-todo');
    const $formTodo = document.querySelector('#add-todo-form');
    let $addTodoDialog = document.getElementById("add-todo-dialog");
    const listLocalStore = new LocalStore();

    function showAddTodoDialog() {
        $addTodoDialog.showModal();
    }

    function hideAddTodoDialog() {
        $addTodoDialog.close();
        $formTodo.reset();
    }

    const saveTodoItem = event => {
        const formData = new FormData(event.target);
        //const TodoItem = formData.get('todo-Todo-input');
        
        //if (TodoItem!=='') { //HERE IS WHERE ACTUALLY SAVE ITEMS
            //$inputTodo.style.outline = 'none';
            hideAddTodoDialog()

            let todoOBJ = new ToDoItem(formData.get('tittle-todo-input'),
                formData.get('description-todo-input'),
                formData.get('complete-status-todo-input'),
                formData.get('date-todo-input'),
                formData.get('priority-todo-input'));
            
            todoListElement.addToDo(todoOBJ);
            listLocalStore.updateLocalStore(listOBJ);
            //TodoOBJ.showTodo();
            //TodoLocalStore.updateLocalStore(TodoOBJ);
            //addTodoTodoItemToTheDoom(TodoOBJ.getLastTodo(),TodoOBJ);
        //}else{
            //$inputTodo.style.outline = '1.5px solid red';
        //}
        $formTodo.reset();
        event.preventDefault();
    }
    
    $addTodoButton.addEventListener('click',showAddTodoDialog);
    $cancelButton.addEventListener('click',hideAddTodoDialog);
    $formTodo.addEventListener('submit', saveTodoItem);
    //event.stopPropagation();
}

export { addTodoItemHandler };