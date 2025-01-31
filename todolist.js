//Selector

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

//load task

document.addEventListener ('DOMContentLoaded',loadTaskFromLocalStorgae);

//event listener

addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click',handleTaskActions);

//function

function addTask()
{
    const taskText = taskInput.value.trim(); //retrive and trim

    if(taskText === '')     // validates the input to ensure it is empty
        return;

    const taskItem = createTaskElement(taskText); //create task element using input value

    taskList.appendChild(taskItem);  //append new item to list
    saveTaskToLocalStorage(taskText,false);   //save task to local storage
    taskInput.value ='';    //clear the input value
}

function handleTaskActions(e)
{
    if(e.target.classList.contains('remove-btn')) 
    {
         const taskItem = e.target.parentElement; //Identifies associated item
         removeTaskFromLocalStorage(taskItem); //call function to remove 
         taskItem.remove(); //remove tasks from DOM
    }
    else if(e.target.type ==='checkbox')
    {
        const taskItem = e.target.parentElement; //Identifies associated new taskItem
        taskItem.classList.toggle('completed'); // Toggle complete class
    }
    updateTaskCompletionInLocalStorage(taskItem) //call update function in local storage
}
function createTaskElement (taskText, isCompleted = false)
{
    const taskItem = document.createElement('li');
    if(isCompleted) taskItem.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type ="checkbox";
    checkbox.checked = isCompleted;

    const textNode = document.createTextNode(taskText);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-btn');

    taskItem.append(checkbox,textNode,removeBtn);
    return taskItem;
}

function saveTaskToLocalStorage(taskText,isCompleted)
{
    const tasks = JSON.parse(localStorage.getItem('tasks')) ||[];
    tasks.push({text : taskText , completed: isCompleted});
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTaskFromLocalStorgae ()
{
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(({text,completed}) => 
    {
        const taskItem = createTaskElement(text, completed);
        taskList.appendChild(taskItem)
    });
}

function removeTaskFromLocalStorage(taskItem)
{
    const tasks =JSON.parse(localStorage.getItem('tasks')) || [];
    const taskText = taskItem.childNodes[1].nodeValue;
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks',JSON.stringify(updatedTasks));
}
function updateTaskCompletionInLocalStorage(taskItem)
{
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskText = taskItem.childNodes[1].nodeValue;
    const task = tasks.find (task => task.text === taskText);
    if(task)
    {
        task.completed = !task.completed;
        localStorage.setIte('tasks',JSON.stringify(tasks));
    }
}