/* eslint-disable */
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const taskList = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Brush your teeth',
    completed: false,
    index: 2,
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Take your bath',
    completed: false,
    index: 1,
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Read your book',
    completed: false,
    index: 4,
  },
  {
    id: '4',
    description: 'Eat some food',
    completed: false,
    index: 3,
  },
];

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

const taskListSection = document.getElementById('task-list');

taskList.map((item) => {
  const list = document.createElement('li');
  const mainList = document.createElement('div');
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
  option.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
  list.appendChild(option);
  return taskListSection.appendChild(list);
});