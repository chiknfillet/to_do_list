import pubsub from './pub_sub.js';

export default (function() {
    pubsub.on('showTaskForm', showForm);

    (function initial_display() {
        const container = document.querySelector('body');
        const form = document.createElement('form');
        form.classList.add('task-form');

        const fields = [{ type: 'text', name: 'taskName', placeholder: 'Task Name' },
                        { type: 'text', name: 'taskDescription', placeholder: 'Task Description' },
                        { type: 'dropdown', name: 'taskPriority', placeholder: 'Priority', options: ['Low', 'Medium', 'High'] },
                        { type: 'date', name: 'taskDueDate', placeholder: 'Due Date' },
                        { type: 'dropdown', name: 'taskProject', placeholder: 'Project', options: JSON.parse(localStorage.getItem('projects')) || [] }
                    ];

        fields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            form.appendChild(formGroup);
            const label = document.createElement('label');
            label.textContent = field.placeholder;
            label.setAttribute('for', field.name);
            formGroup.appendChild(label);
            let input;
            if (field.type === 'dropdown') {
                input = document.createElement('select');
                input.name = field.name;
                field.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    if (typeof option === 'string') {
                        optionElement.value = option;
                        optionElement.textContent = option;
                    } else if (typeof option === 'object' && option.name) {
                        optionElement.value = option.name;
                        optionElement.textContent = option.name;
                    }
                    input.appendChild(optionElement);
                });
            } else {
                input = document.createElement('input');
                input.type = field.type;
                input.name = field.name;
                input.placeholder = field.placeholder;
            }
            formGroup.appendChild(input);
        });

        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            hideForm();
        });     

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Add Task';        
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const taskName = form.taskName.value;
            const taskDescription = form.taskDescription.value;
            const taskPriority = form.taskPriority.value;
            const taskDueDate = form.taskDueDate.value;
            const taskProject = form.taskProject.value;

            if (taskName) {
                let projects = JSON.parse(localStorage.getItem('projects')) || [];
                let project = projects.find(p => p.name === taskProject);
                if (project) {
                    project.tasks = project.tasks || [];
                    project.tasks.push({ name: taskName, description: taskDescription, priority: taskPriority, dueDate: taskDueDate, isCompleted: false });
                    localStorage.setItem('projects', JSON.stringify(projects));
                    pubsub.emit('updateContentDisplay', project.tasks);
                } else {
                    alert('Selected project does not exist.');
                }
                hideForm();
            } else {
                alert('Task name is required.');
            }
        });
        form.appendChild(cancelButton);
        form.appendChild(submitButton);

        container.appendChild(form);
        hideForm();
    })();

    function showForm() {
        const form = document.querySelector('.task-form');
        form.style.display = 'block';

        const projectSelect = form.querySelector('select[name="taskProject"]');
        projectSelect.innerHTML = ''; 

        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.forEach(project => {
            const optionElement = document.createElement('option');
            optionElement.value = project.name;
            optionElement.textContent = project.name;
            projectSelect.appendChild(optionElement);
        });
    }

    function hideForm() {
        const form = document.querySelector('.task-form');
        form.style.display = 'none';
    }
})();