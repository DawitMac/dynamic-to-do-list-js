document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = [];

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks;
        tasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText, save = true) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        removeButton.onclick = function() {
            taskList.removeChild(taskItem);
            tasks = tasks.filter(task => task !== taskText);
            if (save) {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        if (save) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        taskInput.value = '';
    }

    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
        } else {
            alert('Please enter a task.');
        }
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
            } else {
                alert('Please enter a task.');
            }
        }
    });

    loadTasks();
});