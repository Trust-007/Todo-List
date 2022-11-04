/* eslint-disable */
import { loadList } from '.';

// mark as completed

export const taskCompleted = (e) => {
  const isChecked = e.target.checked;
  const grandParent = e.target.parentElement.parentElement;
  grandParent.id = e.target.id;
  if (isChecked) {
    e.target.nextSibling.style.textDecoration = 'line-through';
    const taskList = JSON.parse(localStorage.getItem('todo'));
    const filteredTask = taskList.filter((item) => {
      if (item.id === grandParent.id) {
        item.completed = true;
      }
      return item;
    });
    localStorage.setItem('todo', JSON.stringify(filteredTask));
  } else {
    e.target.nextSibling.style.textDecoration = 'none';
    const taskList = JSON.parse(localStorage.getItem('todo'));
    const filteredTask = taskList.filter((item) => {
      if (item.id === grandParent.id) {
        item.completed = false;
      }
      return item;
    });
    localStorage.setItem('todo', JSON.stringify(filteredTask));
  }
};

// clear all completed tasks

export const clearCompleted = () => {
  const taskList = JSON.parse(localStorage.getItem('todo'));
  const unCompletedTasks = taskList.filter((item) => {
    if (item.completed !== true) {
      return item;
    }
    return '';
  });
  let counter = 0;
  unCompletedTasks.forEach((item) => {
    item.index = counter + 1;
    counter++;
  });
  localStorage.setItem('todo', JSON.stringify(unCompletedTasks));
  loadList();
};

// Refresh lists

export const refresh = () => {
  localStorage.setItem('todo', JSON.stringify([]));
  loadList();
};