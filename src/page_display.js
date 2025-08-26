import './header.js';
import './nav_tasks.js';
import nav_projects from './nav_projects.js';
import './project_form.js'

nav_projects();

function storeProjects() {
    const projects = ["Default", "Home", "Work", "School"];
    localStorage.setItem('projects', JSON.stringify(projects));
}
