/* eslint-disable */
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import { add, edit, checkFocus } from './crud';
import menuIcon from './menu-icon.png';

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
    //list.id = item.id;
    const mainList = document.createElement('div');
    mainList.className = 'main-list';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    mainList.appendChild(checkBox);
    const listDescription = document.createElement('div');
    listDescription.addEventListener('focusout', checkFocus);
    listDescription.innerHTML = item.description;
    listDescription.id = item.id;
    mainList.appendChild(listDescription);
    list.appendChild(mainList);
    const menu = document.createElement('img');
    menu.className = 'info';
    //const icon = document.createElement('p');
    menu.src = menuIcon;
    //icon.className = 'fa-solid fa-ellipsis-vertical';
   // option.appendChild(icon);
    menu.id = item.id
    menu.onclick = edit;
    list.appendChild(menu);
    return taskListSection.appendChild(list);
  });
}
loadList();