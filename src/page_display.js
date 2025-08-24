import logoSrc from './logos/list-box-outline.svg';
import pubsub from './pub_sub.js';

function createSidebar() {
    const container = document.querySelector('.side-bar');
    const logo = document.createElement('img');
    logo.src = logoSrc;
    logo.alt = "Logo";
    const name = document.createElement('h1');
    name.textContent = "To-Do List";
    container.appendChild(logo);
    container.appendChild(name);
}

function createHeader() {
    const container = document.querySelector('.header');
    const title = document.createElement('h2');
    title.textContent = "Tasks: ";
    const current_display = document.createElement('h2');
    pubsub.on('updateCurrentDisplay', newDisplay => {
        current_display.textContent = newDisplay;
    });
    container.appendChild(title);
    container.appendChild(current_display);
}

function createNav() {
    const container = document.querySelector('.nav');
    const task_title = document.createElement("h2");
    task_title.textContent = "Tasks";
    const list = document.createElement('ul');
    const buttonLabels = ["All", "Completed", "Today", "Upcoming", "Missed", "Trash"];
    buttonLabels.forEach(label => {
        const button = document.createElement("li");
        button.textContent = label;
        button.addEventListener("click", () => {
            pubsub.emit("updateCurrentDisplay", label);
        });
        list.appendChild(button);
    });
    container.appendChild(task_title);
    container.appendChild(list);
}

export default (function initPageDisplay() {
    createSidebar();
    createHeader();
    createNav();
})();