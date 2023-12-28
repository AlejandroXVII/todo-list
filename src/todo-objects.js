import { compareAsc, format } from "date-fns";  

class ToDoItem {
    constructor(tittle,description,completeStatus,date,priority,ID){
        this.tittle=tittle; 
        this.description=description;
        this.completeStatus=completeStatus;
        this.date=format(new Date(date), "yyyy-MM-dd");
        this.priority=priority;
        this.ID=ID;
    }
    edit(tittle,description,completeStatus,date,priority){
        this.tittle=tittle; 
        this.description=description;
        this.completeStatus=completeStatus;
        this.date=date;
        this.priority=priority;
    }
    getObjAsAnArray(){
        let arrayObj = [];
        arrayObj.push(this.tittle);
        arrayObj.push(this.description);
        arrayObj.push(this.completeStatus);
        arrayObj.push(this.date);
        arrayObj.push(this.priority);
        arrayObj.push(this.ID);

        return arrayObj;
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
    getID(){
        return this.ID;
    }
}

class ToDoList {
    constructor(tittle,ID,toDoID,toDoArray){
        this.tittle = tittle;
        this.ID = ID;
        this.toDoID=toDoID;
        this.toDoArray = toDoArray;
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
    getTodoID(){
        return this.toDoID;
    }
    getTodoArray(){
        return this.toDoArray;
    }
    addToDo(toDo){
        this.toDoArray.push(toDo);
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
        const todoListElement = new ToDoList(listTittle,this.indexID,100,[]);
        this.listArray.push(todoListElement);
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

       /*if(localStorage.getItem('ToDoList') == null) {
            localStorage.setItem("ToDoList","[]");
        }
        let old_date = JSON.parse(localStorage.getItem("ToDoList"));
        old_date.push(todoListElement);
        console.log(old_date);
        localStorage.setItem("ToDoList",JSON.stringify(old_date));*/