import { ToDoList,ListList } from './todo-objects';

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
                todoList.push(new ToDoList(list.listArray[index].tittle,list.listArray[index].ID));
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