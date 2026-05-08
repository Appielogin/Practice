const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskError = document.getElementById("taskError");
const taskStats = document.getElementById("taskStats");
const clearAllBtn = document.getElementById("clearAllBtn");
const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const pendingBtn = document.getElementById("pendingBtn");

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

//add button
addBtn.addEventListener("click", addTask);

function addTask() {      //To add task
    const taskText = taskInput.value.trim();
    
    if (taskText === ""){
        taskError.textContent = "Cannot Be empty!";
        return;
    } else {
        taskError.textContent = "";
        createTask(taskText);
        saveTasks();

        //clear input
        taskInput.value = "";
    }
}

//create task
function createTask(taskText, isCompleted = false){
        
    //create li
    const li = document.createElement("li");

    //create span
    const span = document.createElement("span");
    span.textContent = taskText;

    if (isCompleted){
        span.classList.add("completed");
    }

    //toggle complete when clicking text only
    span.addEventListener("click", function() {
        span.classList.toggle("completed");
        updateStats();
        saveTasks();
    });

    //Create delect button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&times;";

    //delect task when clicked
    deleteBtn.addEventListener("click", function(){
        li.remove();
        updateStats();
        saveTasks();
    });

    //append span + button inside li
    li.appendChild(span);
    li.appendChild(deleteBtn);

    //append to list
    taskList.appendChild(li);
    updateStats();
}

//live task counter
function updateStats(){
    const allTasks = taskList.querySelectorAll("li");
    const completedTasks = taskList.querySelectorAll(".completed");

    const total = allTasks.length;
    const completed = completedTasks.length;
    const pending = total - completed;

    taskStats.textContent = `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;

    const emptyMessage = document.getElementById("emptyMessage");
    emptyMessage.style.display = total === 0 ? "block" : "none";
}

//to save task in local storage
function saveTasks() {
    const tasks = [];

    taskList.querySelectorAll("li").forEach(li => {
        const text = li.querySelector("span").textContent.trim();
        const isCompleted = li.querySelector("span").classList.contains("completed");

        tasks.push({
            text: text, completed: isCompleted
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//load tasks on page load
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    storedTasks.forEach(task => {
        createTask(task.text, task.completed);
    });
}

window.addEventListener("DOMContentLoaded", loadTasks);

clearAllBtn.addEventListener("click", function() {
    taskList.innerHTML = "";  //remove all task from UI
    localStorage.removeItem("tasks");  // clear storage
    updateStats(); //reset counter
});

//to filter tasks
function filterTasks(type) {
    const tasks = taskList.querySelectorAll("li");
    
    tasks.forEach(li => {
        const span = li.querySelector("span");
        const isCompleted = span.classList.contains("completed");

        if (type === "all") {
            li.style.display = "flex";
        }
        else if (type === "completed") {
            li.style.display = isCompleted ? "flex" : "none";
        }
        else if (type === "pending") {
            li.style.display = !isCompleted ? "flex" : "none";
        }
    });
}

//set active filter button
function setActiveButton(activeBtn) {
    [allBtn, completedBtn, pendingBtn].forEach(btn =>
        btn.classList.remove("active")
    );
    activeBtn.classList.add("active");
}

//all button
allBtn.addEventListener("click", function() {
    filterTasks("all");
    setActiveButton(allBtn);
});

//completed button
completedBtn.addEventListener("click", function() {
    filterTasks("completed");
    setActiveButton(completedBtn);
});

//pending button
pendingBtn.addEventListener("click", function() {
    filterTasks("pending");
    setActiveButton(pendingBtn);
});