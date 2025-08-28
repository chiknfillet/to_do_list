import pubsub from './pub_sub.js';

export default function () {
    const container = document.querySelector('.nav');
    pubsub.on('newProjectAdded', updateProjectList);

    (function initial_display() {
        const project_container = document.createElement("div");
        project_container.classList.add("project-container");
        const project_title = document.createElement("h2");
        project_title.textContent = "Projects";
        const addProjectButton = document.createElement("button");
        addProjectButton.textContent = "+";
        addProjectButton.addEventListener("click", () => {
            pubsub.emit("showProjectForm");
        });
        project_container.appendChild(project_title);
        project_container.appendChild(addProjectButton);

        const list = document.createElement('ul');
        list.classList.add('project-list');

        container.appendChild(project_container);
        container.appendChild(list);

        updateProjectList(JSON.parse(localStorage.getItem('projects')));
    })();

    function updateProjectList(projects) {
        const list = document.querySelector('.project-list');
        list.innerHTML = '';
        projects.forEach(project => {
            const listItem = document.createElement("li");
            const color = document.createElement("div");
            color.classList.add("project-color");
            color.style.backgroundColor = project.color || 'black';
            listItem.appendChild(color);
            const name = document.createElement("span");
            name.textContent = project.name;
            listItem.appendChild(name);
            listItem.addEventListener("click", () => {
                handleProjectClick(project);
            });
            list.appendChild(listItem);
        });
    }

    function handleProjectClick(project) {
        pubsub.emit("updateHeaderDisplay", `Project: ${project.name}`);
        pubsub.emit("updateContentDisplay", (JSON.parse(localStorage.getItem('tasks')) || []).filter(task => task.id === project.id && !task.isDeleted));
    }
};