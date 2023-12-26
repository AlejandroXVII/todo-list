import { compareAsc, format } from "date-fns";  

class ToDoItem {
    ID=0;
    constructor(tittle,description,completeStatus,date,priority){
        this.tittle=tittle; 
        this.description=description;
        this.completeStatus=completeStatus;
        this.date=new Date(date);
        this.priority=priority;
    }
    edit(tittle,description,date,priority){
        this.tittle=tittle; 
        this.description=description;
        this.date=date;
        this.priority=priority;
    }
    changeStatus(){
        if (this.completeStatus) {
            this.completeStatus=false;
        }
        else{
            this.completeStatus=true;
        }
    }
    assignIndex(ID){
        this.ID=ID;
    }
}

class ToDoList {
    constructor(tittle,ID){
        this.tittle = tittle;
        this.ID = ID;
        this.toDoID=100;
        this.toDoArray = [];
    }
    edit(tittle){
        this.tittle = tittle;
    }
    getTittle(){
        return this.tittle;
    }
    getID(){
        return this.ID;
    }
    addToDo(toDo){
        this.toDoArray.push(toDo);
        toDo.assignIndex(this.toDoID);
        this.toDoID++;
    }
    eliminateToDo(ID){
        let indexToEliminate = this.toDoArray.findIndex((toDo) => toDo.ID==ID);
        this.toDoArray.splice(indexToEliminate,1);
    }
}

class ListList {
    constructor(){
        this.indexID = 300;
        this.listArray = [];
    }
    addList(listTittle){
        const todoListElement = new ToDoList(listTittle,this.indexID);
        this.listArray.push(todoListElement);

        /*if(localStorage.getItem('ToDoList') == null) {
            localStorage.setItem("ToDoList","[]");
        }
        let old_date = JSON.parse(localStorage.getItem("ToDoList"));
        old_date.push(todoListElement);
        console.log(old_date);
        localStorage.setItem("ToDoList",JSON.stringify(old_date));*/
       
        this.indexID++;
    }
    eliminateList(ID){
        let indexToEliminate = this.listArray.findIndex((list) => list.ID==ID);
        this.listArray.splice(indexToEliminate,1);
    }
    editList(NewName,ID){
        let indexToEdit = this.listArray.findIndex((list) => list.ID==ID);
        this.listArray[indexToEdit].edit(NewName);
    }
    showList(){
        console.table(this.listArray);
    }
    getLastList(){
        return this.listArray[this.listArray.length-1];
    }
    getTodoList(){
        return this.listArray;
    }
    setAll(indexID,listArray){
        this.indexID = indexID;
        this.listArray = listArray;
    }
}

export {ToDoItem,ToDoList,ListList};