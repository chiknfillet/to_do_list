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

function createNavTasks() {
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
            pubsub.emit("updateCurrentDisplay", label);
        });
        list.appendChild(button);
    });
    container.appendChild(task_container);
    container.appendChild(list);
}

function createNavProjects() {
    const container = document.querySelector('.nav');
    const project_container = document.createElement("div");
    const project_title = document.createElement("h2");
    project_title.textContent = "Projects";
    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "+";
    addProjectButton.addEventListener("click", () => {
        pubsub.emit("showAddProjectForm");
    });
    project_container.appendChild(project_title);
    project_container.appendChild(addProjectButton);

    container.appendChild(project_container);
}

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

function createAddProjectForm() {
    const container = document.querySelector('body');
    const form = document.createElement('form');

    const fields = [{ type: 'text', name: 'projectName', placeholder: 'Project Name' },
                    { type: 'color', name: 'projectColor', placeholder: 'Project Color' }
                ];

    fields.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        form.appendChild(formGroup);
        const label = document.createElement('label');
        label.textContent = field.placeholder;
        label.setAttribute('for', field.name);
        formGroup.appendChild(label);
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        input.placeholder = field.placeholder
        formGroup.appendChild(input);
    });

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        form.reset();
        form.style.display = 'none';
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Project';
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const projectName = form.projectName.value;
        const projectColor = form.projectColor.value;
        if (projectName) {
            pubsub.emit('createProject', { name: projectName, color: projectColor });
            form.reset();
            form.style.display = 'none';
        }
    });
    
    form.appendChild(cancelButton);
    form.appendChild(submitButton);
    container.appendChild(form);
    form.style.display = 'none';
}

function storeProjects() {
    const projects = ["Default", "Home", "Work", "School"];
    localStorage.setItem('projects', JSON.stringify(projects));
}

export default (function initPageDisplay() {
    createSidebar();
    createHeader();
    createNavTasks();
    createNavProjects();
    displayProjects();
    showAddProjectForm();
    pubsub.on('projectsUpdated', displayProjects);
})();