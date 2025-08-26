import pubsub from './pub_sub.js';

export default function createNavProjects() {
    const container = document.querySelector('.nav');
    const project_container = document.createElement("div");
    const project_title = document.createElement("h2");
    project_title.textContent = "Projects";
    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "+";
    addProjectButton.addEventListener("click", () => {
        pubsub.emit("showProjectForm");
    });
    project_container.appendChild(project_title);
    project_container.appendChild(addProjectButton);

    container.appendChild(project_container);
}