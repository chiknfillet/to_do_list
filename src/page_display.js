import header from './header.js';
import navTasks from './nav_tasks.js';
import navProjects from './nav_projects.js';
import projectForm from './project_form.js'
import taskForm from './task_form.js'
import mainContent from './main_content.js';

const defaultProject = {name: "Default", id: "01", color: "#000000"}
const projects = JSON.parse(localStorage.getItem('projects'))
console.log(projects)
if (!projects) {
    localStorage.setItem("projects", JSON.stringify([defaultProject]))
    console.log(localStorage.getItem("projects"))
}

header();
navTasks();
navProjects();
projectForm();
taskForm();
mainContent();