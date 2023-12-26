import _ from 'lodash';
//import { compareAsc, format } from "date-fns";  
import './style.css';
//import { ToDoItem,ToDoList } from './todo-objects';
import { addListTodoItemButtonsHandler,addListTodoItemToTheDoom } from './list-handler-dom';
import { loadListElements } from './first-load';

loadListElements();
addListTodoItemButtonsHandler();
