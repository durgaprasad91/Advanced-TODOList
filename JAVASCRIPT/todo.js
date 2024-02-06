function addTask() {
  const newTaskInput = document.getElementById('newTask');
  const taskDateInput = document.getElementById('taskDate');
  const taskList = document.getElementById('taskList');
  const errorContainer = document.getElementById('errorContainer');

  const taskText = newTaskInput.value.trim();
  const taskDate = taskDateInput.value;

  if (taskText.trim() !== '') {

    errorContainer.textContent = '';
    const listItem = createTaskElement(taskText, taskDate);

    taskList.appendChild(listItem);

    newTaskInput.value = '';
    taskDateInput.value = '';

    updateLocalStorage();
  }else {
    // Show the error message next to the input box
    errorContainer.textContent = ' Please enter a  task text.';
  }
}

function createTaskElement(taskText, taskDate) {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  listItem.appendChild(checkbox);

  const taskTextSpan = document.createElement('span');
  taskTextSpan.textContent = taskText;
  listItem.appendChild(taskTextSpan);

  const taskDateSpan = document.createElement('span');
  taskDateSpan.textContent = taskDate;
  listItem.appendChild(taskDateSpan);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = function () {
    const newText = prompt('Edit task:', taskText);
    if (newText !== null) {
      taskTextSpan.textContent = newText;
      updateLocalStorage();
    }
  };
  listItem.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function () {
    listItem.remove();
    updateLocalStorage();
  };
  listItem.appendChild(deleteButton);

  checkbox.addEventListener('change', function () {
    updateLocalStorage();
  });

  return listItem;
}

function displayAllTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = taskList.getElementsByTagName('li');

  for (let i = 0; i < tasks.length; i++) {
    tasks[i].style.display = 'flex';
  }
}

function displayCompletedTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = taskList.getElementsByTagName('li');

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const checkbox = task.querySelector('input[type="checkbox"]');
    const isCompleted = checkbox.checked;

    if (isCompleted) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  }
}

function showIncompleteTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = taskList.getElementsByTagName('li');

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const checkbox = task.querySelector('input[type="checkbox"]');
    const isCompleted = checkbox.checked;

    if (!isCompleted) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  }
}


function updateLocalStorage() {
  const taskList = document.getElementById('taskList');
  const tasks = taskList.getElementsByTagName('li');
  const taskArray = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const checkbox = task.querySelector('input[type="checkbox"]');
    const taskText = task.querySelector('span').textContent;
    const taskDate = task.querySelector('span:nth-child(3)').textContent;
    const isCompleted = checkbox.checked;

    taskArray.push({ text: taskText, date: taskDate, completed: isCompleted });

    if (isCompleted) {
      task.classList.add('completed');
    } else {
      task.classList.remove('completed');
    }
  }

  localStorage.setItem('tasks', JSON.stringify(taskArray));
}

function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    const taskArray = JSON.parse(storedTasks);
    const taskList = document.getElementById('taskList');

    for (let i = 0; i < taskArray.length; i++) {
      const task = taskArray[i];
      const listItem = createTaskElement(task.text, task.date);

      listItem.querySelector('input[type="checkbox"]').checked = task.completed;

      taskList.appendChild(listItem);

      if (task.completed) {
        listItem.classList.add('completed');
      }
    }
  }
}

loadTasks();
