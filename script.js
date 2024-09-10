let tasks = [];

const addTask = () => {
  const inputTask = document.getElementById("inputTask");
  const text = inputTask.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    inputTask.value = "";
    updateTaskList();
    updateStats();
  }
};

const toggleTestComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats();
};

const onDelete = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
};

const onEdit = (index) => {
  const inputValue = document.getElementById("inputTask");
  inputValue.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
};

const updateStats = () => {
  const completedTask = tasks.filter((task) => task.completed).length;
  const totalTask = tasks.length;
  const progress = (completedTask / totalTask) * 100;
  const progressBar = document.getElementById("progress");

  progressBar.style.width = `${progress}%`;

  document.getElementById(
    "numbers"
  ).innerText = `${completedTask} / ${totalTask}`;
};

const updateTaskList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
     <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${
            task.completed ? "checked" : ""
          }/>
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <i class="fa-solid fa-trash" onClick="onDelete(${index})"></i>
          <i class="fa-regular fa-pen-to-square" onClick="onEdit(${index})"></i>
        </div>
      </div>`;
    const checkbox = listItem.querySelector(".checkbox");
    checkbox.addEventListener("change", () => toggleTestComplete(index));
    taskList.append(listItem);
  });
};

document.getElementById("newTask").addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});
