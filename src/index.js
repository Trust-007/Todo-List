/* eslint-disable */
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import { add, edit, checkFocus, remove } from './crud';
import { taskCompleted, clearCompleted, refresh } from './completed';
import menuicon from './menu-Icon.png';

const taskListSection = document.getElementById('task-list');
const form = document.getElementById('form');
add(form);

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
    mainList.className = 'main-list';
    const checkBox = document.createElement('input');
    checkBox.id = item.id;
    checkBox.onchange = taskCompleted;
    checkBox.type = 'checkbox';
    mainList.appendChild(checkBox);
    const listDescription = document.createElement('div');
    listDescription.innerHTML = item.description;
    listDescription.id = item.id;
    listDescription.onclick = edit;
    listDescription.addEventListener('focusout', checkFocus);
    mainList.appendChild(listDescription);
    list.appendChild(mainList);
    const menu = document.createElement('img');
    menu.className = 'info';
    menu.src = menuicon;
    menu.onclick = remove;
    list.appendChild(menu);
    return taskListSection.appendChild(list);
  });
}
loadList();

// get clear tasks button

const clearTasksBtn = document.getElementById('clear-tasks');

clearTasksBtn.onclick = clearCompleted;

// get refresh button

const refreshBtn = document.getElementById('refresh');

refreshBtn.onclick = refresh;
