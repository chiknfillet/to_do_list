import pubsub from './pub_sub.js';

export default (function() {
    const container = document.querySelector('.content');
    pubsub.on('updateContentDisplay', update_display);

    (function initial_display() {
        const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        update_display(allTasks);
    })();

    function update_display(tasks) {
        container.innerHTML = '';

        // if (String.isString(tasks) === true) {
        //     fetchAllTasks(tasks);
        // }
        // else if (Array.isArray(tasks) === false) {
        //     tasks = [tasks];
        // }

        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');

            const taskTitle = document.createElement('h3');
            taskTitle.textContent = task.name;
            taskItem.appendChild(taskTitle);

            const taskDesc = document.createElement('p');
            taskDesc.textContent = task.description;
            taskItem.appendChild(taskDesc);

            const taskDue = document.createElement('p');
            taskDue.textContent = `Due: ${task.dueDate}`;
            taskItem.appendChild(taskDue);

            const taskPriority = document.createElement('p');
            taskPriority.textContent = `Priority: ${task.priority}`;
            taskItem.appendChild(taskPriority);

            container.appendChild(taskItem);
        });
    }
})();