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

export {ToDoItem,ToDoList};