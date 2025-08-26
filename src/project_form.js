import pubsub from './pub_sub.js';

export default (function() {
    pubsub.on('showProjectForm', showForm);

    (function initial_display() {
        const container = document.querySelector('body');
        const form = document.createElement('form');
        form.classList.add('project-form');

        const fields = [{ type: 'text', name: 'projectName', placeholder: 'Project Name' },
                        { type: 'color', name: 'projectColor', placeholder: 'Project Color' }
                    ];

        fields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            const label = document.createElement('label');
            label.textContent = field.placeholder;
            label.setAttribute('for', field.name);
            formGroup.appendChild(label);
            const input = document.createElement('input');
            input.type = field.type;
            input.name = field.name;
            input.placeholder = field.placeholder
            formGroup.appendChild(input);
            form.appendChild(formGroup);
        });

        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            hideForm();
        });

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Add Project';
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const projectName = form.projectName.value;
            const projectColor = form.projectColor.value;
            if (projectName) {
                let projects = JSON.parse(localStorage.getItem('projects')) || [];
                projects.push({ name: projectName, color: projectColor, tasks: []});
                localStorage.setItem('projects', JSON.stringify(projects));

                pubsub.emit('newProjectAdded', projects);
                hideForm();
            } else {
                alert('Project name is required.');
            }
        });
        
        form.appendChild(cancelButton);
        form.appendChild(submitButton);
        container.appendChild(form);
        hideForm();
    })();

    function showForm() {
        const form = document.querySelector('.project-form');
        form.reset();
        form.style.display = 'block';
    }

    function hideForm() {
        const form = document.querySelector('.project-form');
        form.reset();
        form.style.display = 'none';
    }
})();