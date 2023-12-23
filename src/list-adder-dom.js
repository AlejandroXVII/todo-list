import { ToDoItem,ToDoList } from './todo-objects';

const addListTodoItemToTheDoom = (todoListElement) => {
    const $listContainer = document.querySelector('#list-container');
    const $listElementContainer = document.createElement('div');
    $listElementContainer.className = "secondary-button hover-button temporal-button";
    
    $listContainer.appendChild($listElementContainer);

    const $nameElement = document.createElement('p');
    $nameElement.textContent = todoListElement.getTittle();
    $listElementContainer.appendChild($nameElement);

    $listElementContainer.innerHTML += '<svg id="'+ todoListElement.getID() +'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil-outline</title><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>';
    $listElementContainer.innerHTML += '<svg id="'+ todoListElement.getID() +'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>';
}

const addListTodoItemButtonsHandler = () => {
    const $addListContainer = document.querySelector('#add-list-container>form');
    const $addListButton = document.querySelector('#add-list');
    const $inputList = document.querySelector('#todo-list-input');
    const $cancelButton = document.querySelector('#cancel-button');
    const $formList = document.querySelector('#add-list-form');
    const todoListArray = [];
    let indexID=200;
    const todoListOBJ = new ToDoList('todo List OBJ array',1);
    const todoOBJ = new ToDoItem('tittle','description','completeStatus','date','priority');

    function showAddListContainer() {
        $inputList.style.outline = 'none';
        $addListContainer.style.display = "grid";
    }

    function hideAddListContainer() {
        $addListContainer.style.display = "none";
        $formList.reset();
    }

    const saveListItem = event => {
        const formData = new FormData(event.target);

        const listItem = formData.get('todo-list-input');
        if (listItem!=='') { //HERE IS WHERE ACTUALLY SAVE ITEMS
            $inputList.style.outline = 'none';
            const todoListElement = new ToDoList(listItem,indexID);
            todoListArray.push(todoListElement);
            console.table(todoListArray);
            addListTodoItemToTheDoom(todoListElement);
            hideAddListContainer();
            indexID++;
        }else{
            $inputList.style.outline = '1.5px solid red';
        }
        $formList.reset();
        event.preventDefault();
    }

    $cancelButton.addEventListener('click',hideAddListContainer);
    $formList.addEventListener('submit', saveListItem);
    $addListButton.addEventListener('click',showAddListContainer);
}

export {addListTodoItemButtonsHandler};