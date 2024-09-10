let tasks = [];

const addTask = () => {
  const inputTask = document.getElementById("inputTask");
  const text = inputTask.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    inputTask.value = "";
    updateTaskList();
  }
};

const toggleTestComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  console.log(tasks);
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
