const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const deletedTaskList = document.getElementById("deletedTaskList");
const completedTaskList = document.getElementById("completedTaskList");
const allTaskList = document.getElementById("allTaskList");

let allTask = [];
let deletedTasks = [];
let completedTasks = [];

function addTask() { //para agregar nueva tarea
  const taskInputValue = taskInput.value;
  allTask.push({ task: taskInputValue, completed: false, modifiedAt: new Date() });
  taskInput.value = "";
  updateTaskList();
}

function deleteTask(index) { //para eliminar
  deletedTasks.push(allTask[index]);
  allTask.splice(index, 1);
  updateTaskList();
  updateDeletedTaskList();
}

function markTaskAsCompleted(index) {//para marcar como hecha
  completedTasks.push(allTask[index]);
  allTask[index].completed = true;
  updateTaskList();
  updateCompletedTaskList();
}

function showDeletedTasks() {//para mostrar las tareas borradas
  deletedTaskList.style.display = "block";
}

function showCompletedTasks() {//para mostrar las tareas completadas
  completedTaskList.style.display = "block";
}

function showAllTasks() {//para mostrar todas las tareas
  allTaskList.style.display = "block";
  updateAllTaskList();
}

function updateTaskList() {//para que se actualice la parte donde se agregan las nueva stareas  una vez que se elimina o marca como hecha
  allTask.sort((a, b) => b.modifiedAt - a.modifiedAt);

  taskList.innerHTML = "";

  const pendingTasks = allTask.filter(task => !task.completed);

  pendingTasks.forEach(function (task, index) {
    const li = createTaskElement(task.task, index);
    taskList.appendChild(li);
  });
}

function createTaskElement(task, index) {//para agregar la nueva tarea , quedaria como una pendiente que despues se puede eliminar o marcar como hecha
  const li = document.createElement("li");
  li.style.display = "flex";
  li.style.flexDirection = "row";
  li.style.justifyContent = "space-between";
  li.style.backgroundColor = "white";
  li.style.marginTop = "10px";
  li.style.height = "5vh";
  li.style.borderRadius = "10px";
  li.style.padding = "10px";
  li.style.color = "rgb(255, 0, 85)";

  const taskText = document.createElement("p");
  taskText.textContent = task;

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";

  const deleteButton = createButton('<i class="fas fa-trash"></i>', () => deleteTask(index));
  deleteButton.style.background = "transparent";
  deleteButton.style.border = "none";
  deleteButton.style.marginRight = "10px";

  const completeButton = createButton('<i class="fas fa-check custom-color"></i>', () => markTaskAsCompleted(index));

  completeButton.style.background = "transparent";
  completeButton.style.border = "none";
  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(completeButton);

  li.appendChild(taskText);
  li.appendChild(buttonContainer);

  return li;
}

function createButton(html, onClick) {
  const button = document.createElement("button");
  button.innerHTML = html;
  button.addEventListener("click", onClick);
  return button;
}

function updateDeletedTaskList() { //actualiza la lista de tareas borradas
  deletedTaskList.innerHTML = "";
  deletedTasks.forEach(function (task) {
    const li = document.createElement("li");
    li.textContent = task.task;
    deletedTaskList.appendChild(li);
  });
}

function updateCompletedTaskList() { //actualiza la lista de tareas hechas
  completedTaskList.innerHTML = "";
  completedTasks.forEach(function (task) {
    const li = document.createElement("li");
    li.textContent = task.task;
    completedTaskList.appendChild(li);
  });
}

function updateAllTaskList() { //actualizala lista de todas las tareas
  const uniqueTasks = new Set();
  allTask.forEach(task => uniqueTasks.add(task.task));
  deletedTasks.forEach(task => uniqueTasks.add(task.task));
  completedTasks.forEach(task => uniqueTasks.add(task.task));

  const allTasksArray = Array.from(uniqueTasks);

  allTaskList.innerHTML = "";

  allTasksArray.forEach(function (task) {
    const li = document.createElement("li");
    li.textContent = task;
    allTaskList.appendChild(li);
  });
}
