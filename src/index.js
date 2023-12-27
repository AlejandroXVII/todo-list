import _ from 'lodash';
import './style.css';
import { addListTodoItemButtonsHandler } from './list-handler-dom';
import { loadListElements } from './first-load';

loadListElements();
addListTodoItemButtonsHandler();
