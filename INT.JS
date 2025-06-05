const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", loadTasks);
addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);
  saveTask(taskText);
  taskInput.value = "";
}

function createTaskElement(text) {
  const li = document.createElement("li");

  li.textContent = text;
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(deleteBtn);
  return li;
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ text, completed }) => {
    const li = createTaskElement(text);
    if (completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}

function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({ text: li.firstChild.textContent, completed: li.classList.contains("completed") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
