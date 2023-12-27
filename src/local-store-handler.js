import { ToDoList,ListList, ToDoItem } from './todo-objects';

class LocalStore{
    constructor(){
        this.listList = new ListList();
        this.emptyListStatus = false; //TRUE if it's empty FALSE if it has any element
        if(localStorage.getItem('ListList') == null) {
            this.emptyListStatus = true; 
        }
        else{
            let list = JSON.parse(localStorage.getItem("ListList"));
            let todoList = [];

            for (let index = 0; index <  list.listArray.length; index++) {
                let todoListArray = [];
                for (let index2 = 0; index2 <  list.listArray[index].toDoArray.length; index2++) {
                    let todoItem = new ToDoItem(list.listArray[index].toDoArray[index2].tittle,
                        list.listArray[index].toDoArray[index2].description,
                        list.listArray[index].toDoArray[index2].completeStatus,
                        list.listArray[index].toDoArray[index2].date,
                        list.listArray[index].toDoArray[index2].priority);
                    todoListArray.push(todoItem);
                }
                
                todoList.push(new ToDoList(list.listArray[index].tittle,
                    list.listArray[index].ID,
                    list.listArray[index].toDoID,
                    todoListArray));
            }
            console.log(todoList);
            this.listList.setAll(list.indexID,todoList);
        }
    }
    checkEmptyListStatus(){
        return this.emptyListStatus;
    }
    updateLocalStore(updateListList){
        localStorage.setItem("ListList",JSON.stringify(updateListList));
    }
    getListList(){
        return this.listList;
    }
}

export { LocalStore }