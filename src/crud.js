/* eslint-disable */
import { loadList } from '.';
import menuIcon from './menu-icon.png';
import trashIcon from './trash-icon.png';

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

// Edit or Remove

let hasFocused = false;
export const edit = (e) => {
  const itemId = e.target.id;
  const specific = e.target;
  if (hasFocused === false) {
    e.target.src = trashIcon;
    const parent = e.target.parentElement;
    parent.id = itemId
    parent.style.backgroundColor = 'yellow';
    parent.firstChild.children[1].contentEditable = 'true';
    parent.firstChild.children[1].style.border = '1px solid black';
    hasFocused = true;
  } else if (hasFocused === true && specific.parentElement.id !== '') {
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
};

// update Edit in localStorage

export const checkFocus = (e) => {
  const element = e.target.parentElement;
  e.target.parentElement.id = e.target.id;
  element.style.backgroundColor = 'white';
  element.children[1].src = menuIcon;
  e.target.contentEditable = 'false';
  const taskList = JSON.parse(localStorage.getItem('todo'));
  const updateDescription = taskList.filter((item) => {
    const itemId = e.target.parentElement.id;
    if (item.id === itemId) {
      item.description = e.target.innerHTML;
    }
    return item;
  });
  localStorage.setItem('todo', JSON.stringify(updateDescription));
  loadList();
  hasFocused = false;
};