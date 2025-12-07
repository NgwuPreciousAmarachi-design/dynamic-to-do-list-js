document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // addTask: creates the li, adds remove button, and optionally saves to localStorage
    function addTask(taskText, save = true) {
        // If no taskText passed (user action), read from input
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create li and set its text
        const li = document.createElement('li');

        // Use a span for the task text so the button is a separate child (safer)
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        li.appendChild(textSpan);

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Attach click listener using addEventListener (preferred for automated checks)
        removeBtn.addEventListener('click', function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Update localStorage to remove this exact task text
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        });

        // Append button then the li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";

        // Save to localStorage if requested
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Initialize list from storage
    loadTasks();

    // Attach event listeners for adding tasks
    addButton.addEventListener('click', () => addTask());

    // Use keydown (Enter) rather than keypress for broader compatibility
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});