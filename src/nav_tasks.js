import pubsub from './pub_sub.js';

export default (function() {
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
            pubsub.emit("updateCurrentDisplay", `Tasks: ${label}`);
        });
        list.appendChild(button);
    });
    container.appendChild(task_container);
    container.appendChild(list);
})();