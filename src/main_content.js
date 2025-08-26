import pubsub from './pub_sub.js';

function displayProjects() {
    const container = document.querySelector('.nav');
    const tempContainer = ["Default", "Home", "Work", "School"];
    tempContainer.forEach(project => {
        const listItem = document.createElement("li");
        listItem.textContent = project;
        listItem.addEventListener("click", () => {
            pubsub.emit("updateCurrentDisplay", project);
        });
        container.appendChild(listItem);
    });
}