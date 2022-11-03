/* eslint-disable */
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import { add, edit, checkFocus } from './crud';

const taskListSection = document.getElementById('task-list');
const form = document.getElementById('form');
add(form)

export const loadList = () => {
  const taskList = JSON.parse(localStorage.getItem('todo')) || [];
  for (let i = 0; i < taskList.length; i++) {
    const min = taskList[i];
    for (let j = i + 1; j < taskList.length; j++) {
      if (taskList[j].index < min.index) {
        const hi = taskList[j];
        taskList[j] = taskList[i];
        taskList[i] = hi;
      }
    }
  }
  taskListSection.replaceChildren();
  taskList.map((item) => {
    const list = document.createElement('li');
    const mainList = document.createElement('div');
    mainList.addEventListener('focusout', checkFocus)
    mainList.className = 'main-list';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    mainList.appendChild(checkBox);
    const listDescription = document.createElement('div');
    listDescription.innerHTML = item.description;
    mainList.appendChild(listDescription);
    list.appendChild(mainList);
    const option = document.createElement('div');
    option.className = 'info';
    //const icon = document.createElement('p');
    option.innerHTML = 'i';
    //icon.className = 'fa-solid fa-ellipsis-vertical';
   // option.appendChild(icon);
    option.id = item.id
    option.onclick = edit;
    list.appendChild(option);
    return taskListSection.appendChild(list);
  });
}
loadList();