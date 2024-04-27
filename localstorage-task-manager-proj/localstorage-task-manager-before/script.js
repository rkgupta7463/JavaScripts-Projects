const inputEle = document.querySelector('#input');
const delBtnEle = document.querySelector('#delete');
const outputEle = document.querySelector('#list-container');
const form = document.querySelector('form');

//2. get item from localstorage
const getItems = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Initialize tasks as an empty array if local storage doesn't have it

    // Display to DOM
    let output;
    const allTasks = tasks.map((task) => {
        return `
            <li id="item">
                <span>${task.title}</span>
                <button onclick="removeTask('${task.id}')" id="delete">X</button>
            </li>
        `;
    });
    // console.log("Before join.........");
    // console.log(allTasks);
    output = allTasks.join("");
    // console.log("After join.........");
    // console.log(output);
    outputEle.innerHTML = output;
};

getItems();

//1. Add Task and save into localstorage

const addTask = (e) => {
    e.preventDefault();
    // check if empty input
    if (inputEle.value === '') {
        alert('Please enter a task');
    }
    // get the item
    const task = inputEle.value;
    if (task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Initialize tasks as an empty array if local storage doesn't have it
        tasks.unshift({
            id: Date.now(),
            title: task
        });
        // Save into local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Clear input
        inputEle.value = '';
    }
    getItems();
};


//3. remove items from localstorage

const removeTask = id => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => {
        return task.id !== +id;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    getItems();
};

//4.Event Listener on form
form.addEventListener('submit', addTask);