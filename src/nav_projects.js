import pubsub from './pub_sub.js';

export default (function () {
    const container = document.querySelector('.nav');
    pubsub.on('newProjectAdded', updateProjectList);

    (function initial_display() {
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

        const list = document.createElement('ul');
        list.classList.add('project-list');

        container.appendChild(project_container);
        container.appendChild(list);

        updateProjectList(JSON.parse(localStorage.getItem('projects')) || []);
    })();

    function updateProjectList(projects) {
        const list = document.querySelector('.project-list');
        list.innerHTML = '';
        projects.forEach(project => {
            const listItem = document.createElement("li");
            listItem.textContent = project.name;
            listItem.style.color = project.color || 'black';
            listItem.addEventListener("click", () => {
                pubsub.emit("updateCurrentDisplay", `Project: ${project.name}`);
            });
            list.appendChild(listItem);
        });
    }
})();