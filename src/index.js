import _ from 'lodash';
//import { compareAsc, format } from "date-fns";  
import './style.css';
import { ToDoItem,ToDoList } from './todo-objects';
import { addListTodoItemButtonsHandler,addListTodoItemToTheDoom } from './list-adder-dom';

console.log(localStorage.getItem("ToDoList"))
addListTodoItemButtonsHandler();
//addListTodoItemToTheDoom();
