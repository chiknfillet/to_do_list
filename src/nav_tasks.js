import pubsub from './pub_sub.js';

export default (function() {

    (function() {
        const container = document.querySelector('.nav');
        const task_container = document.createElement("div");
        const task_title = document.createElement("h2");
        task_title.textContent = "Tasks";
        task_container.appendChild(task_title);
        const list = document.createElement('ul');
        const buttonLabels = ["All", "Completed", "Today", "Upcoming", "Missed", "Trash"];
        buttonLabels.forEach(label => {
            const button = document.createElement("li");
            button.textContent = label;
            button.addEventListener("click", () => {
                pubsub.emit("updateHeaderDisplay", `Tasks: ${label}`);
                pubsub.emit("updateContentDisplay", fetchTasks(label));
            });
            list.appendChild(button);
        });
        container.appendChild(task_container);
        container.appendChild(list);
    })();

    function fetchTasks(label) {
        if (label === "All") {
            return (JSON.parse(localStorage.getItem('tasks')) || []).filter(task => !task.isDeleted);
        } else if (label === "Completed") {
            return (JSON.parse(localStorage.getItem('tasks')) || []).filter(task => task.isCompleted && !task.isDeleted);
        } else if (label === "Today") {
            const today = new Date().toISOString().split('T')[0];
            return (JSON.parse(localStorage.getItem('tasks')) || []).filter(task => task.dueDate === today && !task.isDeleted);
        } else if (label === "Upcoming") {
            const today = new Date().toISOString().split('T')[0];
            return (JSON.parse(localStorage.getItem('tasks')) || []).filter(task => task.dueDate > today && !task.isDeleted);
        } else if (label === "Missed") {
            const today = new Date().toISOString().split('T')[0];
            return (JSON.parse(localStorage.getItem('tasks')) || []).filter(task => task.dueDate < today && !task.isCompleted && !task.isDeleted);
        } else if (label === "Trash") {
            return (JSON.parse(localStorage.getItem('tasks')) || []).filter(task => task.isDeleted);
        }
    }
})();