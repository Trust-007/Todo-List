/* eslint-disable */
import { loadList } from '.';
import menuicon from './menu-Icon.png';
import trashicon from './trash-icon.png';

// Add task

export const add = (form) => {
  form.onsubmit = (e) => {
    e.preventDefault();
    const getTodos = localStorage.getItem('todo');
    const todos = JSON.parse(getTodos);
    const taskList = todos || [];
    const { task } = form.elements;
    const newTask = {
      id: new Date().toString(),
      description: task.value,
      completed: false,
      index: taskList.length + 1,
    };
    taskList.push(newTask);
    localStorage.setItem('todo', JSON.stringify(taskList));
    task.value = '';
    loadList();
  };
};

// Edit 

let hasFocused = false;

export const edit = (e) => {
  const itemId = e.target.id;
  const grandParent = e.target.parentElement.parentElement;
  grandParent.children[1].src = trashicon;
  grandParent.id = itemId;
  e.target.style.backgroundColor = 'yellow';
  e.target.style.border = '1px solid black';
  grandParent.style.backgroundColor = 'yellow'
  e.target.contentEditable = 'true';
  hasFocused = true;
};

// Remove task

export const remove = (e) => {
  const itemId = e.target.parentElement.id;
  //parent.id = parent.firstChild.children[1].id
  
  if (hasFocused === true && itemId !== '') {
    const taskList = JSON.parse(localStorage.getItem('todo'));
    const filteredBooks = taskList.filter((item) => {
      if (itemId !== item.id && taskList.length !== 1) {
        return item;
      }
      return '';
    });
    // rearrage index values
    let counter = 0;
    filteredBooks.forEach((item) => {
      item.index = counter + 1;
      counter++;
    });
    localStorage.setItem('todo', JSON.stringify(filteredBooks));
    loadList();
    hasFocused = false;
  }
  hasFocused = false;
}


// update Edit in localStorage

export const checkFocus = (e) => {
  const element = e.target.parentElement.parentElement;
  element.style.backgroundColor = 'white';
  element.children[1].src = menuicon;
  e.target.contentEditable = 'false';
  const taskList = JSON.parse(localStorage.getItem('todo'));
  const updateDescription = taskList.filter((item) => {
    const itemId = element.id;
    if (item.id === itemId) {
      item.description = e.target.innerHTML;
    }
    return item;
  });
  localStorage.setItem('todo', JSON.stringify(updateDescription));
  loadList();
  hasFocused = false;
};