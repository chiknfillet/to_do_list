import pubsub from './pub_sub.js';

export default function() {
    const container = document.querySelector('.content');
    pubsub.on('updateContentDisplay', update_display);

    (function initial_display() {
        const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        update_display(allTasks);
    })();

    function update_display(tasks) {
        container.innerHTML = '';

        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');

            const completeButton = document.createElement('input');
            completeButton.type = 'checkbox';
            completeButton.checked = task.isCompleted;
            completeButton.addEventListener('change', () => {
                task.isCompleted = completeButton.checked;
                const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const taskIndex = allTasks.findIndex(t => t.id === task.id);
                if (taskIndex !== -1) {
                    allTasks[taskIndex] = task;
                    localStorage.setItem('tasks', JSON.stringify(allTasks));
                    pubsub.emit('updateContentDisplay', allTasks.filter(t => !t.isDeleted));
                }
            });
            taskItem.appendChild(completeButton);

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

            const trashButton = document.createElement("button")
            trashButton.textContent = "X"
            trashButton.addEventListener("click", () => {
                const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const taskIndex = allTasks.findIndex(t => t.id === task.id);

                if (task.isDeleted === true) {
                    allTasks.splice(taskIndex, 1)
                } else {
                    task.isDeleted = true;
                    allTasks[taskIndex] = task;
                }
                
                if (taskIndex !== -1) {
                    localStorage.setItem('tasks', JSON.stringify(allTasks));
                    pubsub.emit('updateContentDisplay', allTasks.filter(t => !t.isDeleted));
                }
            })
            taskItem.appendChild(trashButton)

            container.appendChild(taskItem);
        });
    }
};