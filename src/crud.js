import { loadList } from ".";

export const add = (form) => {
  form.onsubmit = (e) => {
    e.preventDefault();
    const getTodos = localStorage.getItem('todo');
    const todos = JSON.parse(getTodos);
    let taskList = todos || [];
    const { task } = form.elements;
    const newTask = {
      id: new Date().toString(),
      description: task.value,
      completed: false,
      index: taskList.length + 1,
    }
    taskList.push(newTask);
    localStorage.setItem('todo', JSON.stringify(taskList));
    task.value = '';
    loadList();
  };
}

let hasFocused = false;
export const edit = (e) => {
  const itemId = e.target.id;
  if (hasFocused === false) {
    e.target.innerHTML = 'T';
    const parent = e.target.parentElement;
    parent.style.backgroundColor = 'salmon';
    parent.firstChild.children[1].contentEditable = "true";
    //parent.firstChild.children[1].focus();
    hasFocused = true;
  } else {
    const taskList = JSON.parse(localStorage.getItem('todo'));
    const filteredBooks = taskList.filter((item) => {
      if (itemId !== item.id && taskList.length !== 1) {
        console.log(item)
        return item;
      }
      return '';
    });
    //rearrage index values
    localStorage.setItem('todo', JSON.stringify(filteredBooks));
    loadList();
    hasFocused = false;
  }
}

export const checkFocus = (e) => {
  const element = e.target.parentElement.parentElement;
  element.style.backgroundColor = 'white';
  element.children[1].innerHTML = 'i';
  e.target.contentEditable = "false";
  hasFocused = false;
}