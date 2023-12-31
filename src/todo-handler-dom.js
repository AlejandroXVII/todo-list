import { ToDoItem } from './todo-objects'; 
import { LocalStore } from './local-store-handler';

const listLocalStore = new LocalStore();

const firstLoadTodo = (todoOBJ,listOBJ) => {
    if (document.querySelector('.main-inner-container')!= null) {
        document.querySelector('.main-inner-container').remove();//*
    }
    let $mainContainer = document.querySelector('#main-container')
    let $listMainContainer = document.createElement('div');//*
    $listMainContainer.className = 'main-inner-container';//*
    $mainContainer.appendChild($listMainContainer);//*

    let listTodoOBJArray = todoOBJ.getTodoArray();
    for (let index = 0; index < listTodoOBJArray.length; index++) {
        addTodoItemToTheDoom(listTodoOBJArray[index],todoOBJ,listOBJ)
    }
}

const addTodoItemToTheDoom = (todoOBJ,todoListElement,listOBJ) => {
    function delateTodoItem(event) {
        document.querySelector("#todo-"+ todoListElement.getID() + "-" + todoOBJ.getID()).remove();
        event.stopPropagation();
        todoListElement.eliminateToDo(todoOBJ.getID());
        console.log(todoListElement);
        listLocalStore.updateLocalStore(listOBJ);
    }
    function editTodoItem(event) {
        let $editTodoDialog = document.getElementById("edit-todo-dialog");
        let todoIDNumber = todoOBJ.getID();
        let $cancelButton = document.getElementById("cancel-edit-todo");
        let $formEditList = document.querySelector('#edit-todo-form');

        $editTodoDialog.showModal();
        $editTodoDialog.className=todoIDNumber;

        let status =  document.getElementsByName('complete-status-todo-edit-input');
        let priority =  document.getElementsByName('priority-todo-edit-input');
        let todoObjAsAnArray = todoOBJ.getObjAsAnArray();
            document.querySelector('#tittle-todo-edit-input').value = todoObjAsAnArray[0];
            document.querySelector('#description-todo-edit-input').value = todoObjAsAnArray[1];
            if (todoObjAsAnArray[2]==='completed') {
                status[1].checked = true;
            }else{
                status[0].checked = true;
            }
            document.querySelector('#date-todo-edit-input').value = todoObjAsAnArray[3];
            if (todoObjAsAnArray[4]==='low') {
                priority[0].checked = true;
            }else{
                if (todoObjAsAnArray[4]==='medium') {
                    priority[1].checked = true;
                }else{
                    priority[2].checked = true;
                }
            }

        this.addEventListener("click", function () {
            $editTodoDialog.showModal();
        });
    
        $cancelButton.addEventListener("click", function () {
            $editTodoDialog.close();
        }); 

        let saveEditItem = event => {
            let formData2 = new FormData(event.target);

            todoOBJ.edit(formData2.get('tittle-todo-edit-input'),
                formData2.get('description-todo-edit-input'),
                formData2.get('complete-status-todo-edit-input'),
                formData2.get('date-todo-edit-input'),
                formData2.get('priority-todo-edit-input'));

            $editTodoDialog.close();
            listLocalStore.updateLocalStore(listOBJ);
            console.log(todoOBJ,listOBJ);
            document.querySelector('.main-inner-container').remove();
            firstLoadTodo(todoListElement,listOBJ);

            //event.stopPropagation();
            event.preventDefault();
        }

        $formEditList.addEventListener('submit',saveEditItem);
        event.stopPropagation();
    }
    //CREATE AND INSERT TODO IN THE DOM
    //select container
    const $todoContainer = document.querySelector('.main-inner-container');
    //create elements (tittle,description,completeStatus,date,priority)
    const $todoElementContainer = document.createElement('div');
    const $tittle = document.createElement('p');
    const $description = document.createElement('p');
    const $completeStatus= document.createElement('p');
    const $date = document.createElement('p');
    const $priority = document.createElement('p');
    //add properties ;
    let todoObjInArrayFormat = todoOBJ.getObjAsAnArray();
    $todoElementContainer.className = "todo-element";
    $todoElementContainer.id = "todo-"+ todoListElement.getID() + "-" + todoOBJ.getID();
    $tittle.textContent = todoObjInArrayFormat[0];
    $description.textContent = todoObjInArrayFormat[1];
    $completeStatus.textContent = todoObjInArrayFormat[2];
    $date.textContent = todoObjInArrayFormat[3];
    $priority.textContent = todoObjInArrayFormat[4];
    //insert elements on the DOM
    $todoContainer.appendChild($todoElementContainer);
    $todoElementContainer.appendChild($tittle);
    $todoElementContainer.appendChild($description);
    $todoElementContainer.appendChild($completeStatus);
    $todoElementContainer.appendChild($date);
    $todoElementContainer.appendChild($priority);
    $todoElementContainer.innerHTML += '<svg class= "edit-todo-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil-outline</title><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>';
    $todoElementContainer.innerHTML += '<svg class= "delate-todo-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>';
    //add listeners
    let $trashButton = document.querySelector("#todo-"+ todoListElement.getID() + "-" + todoOBJ.getID()+">.delate-todo-button");
    let $editButton = document.querySelector("#todo-"+ todoListElement.getID() + "-" + todoOBJ.getID()+">.edit-todo-button");
    $trashButton.addEventListener('click',delateTodoItem);
    $editButton.addEventListener('click',editTodoItem);
    //$todoElementContainer.addEventListener('click',selectList);
}
    
const addTodoItemHandler = (todoListElement,listOBJ,event) => {
    let $formTodo = document.querySelector('#add-todo-form');

    let $addTodoContainer = document.querySelector('#add-todo-container>form');
    let $inputTodo = document.querySelector('#todo-input');
    let listLocalStore = new LocalStore();

    let formData = new FormData(event.target);
    let todoOBJ = new ToDoItem(formData.get('tittle-todo-input'),
        formData.get('description-todo-input'),
        formData.get('complete-status-todo-input'),
        formData.get('date-todo-input'),
        formData.get('priority-todo-input'),
        todoListElement.getTodoID());
    //ADD TODO IN THE DOM AND IN THE LOCAL STORE
    if (String(formData.get('tittle-todo-input'))!=='') {
        addTodoItemToTheDoom(todoOBJ,todoListElement,listOBJ);
        todoListElement.addToDo(todoOBJ);
        listLocalStore.updateLocalStore(listOBJ);
    }
    
    $formTodo.reset();
    event.stopPropagation();
}

export { addTodoItemHandler,firstLoadTodo };