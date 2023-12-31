import { addListTodoItemToTheDoom } from './list-handler-dom';
import { LocalStore } from './local-store-handler';

const loadListElements = () => {
    const listLocalStore = new LocalStore();
    let listList = listLocalStore.getListList(); 
    let todoList = listList.getTodoList();
    for (let index = 0; index < todoList.length; index++) {
        addListTodoItemToTheDoom(todoList[index],listList);
    }
}

export { loadListElements }