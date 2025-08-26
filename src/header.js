import logoSrc from './logos/list-box-outline.svg';
import pubsub from './pub_sub.js';

export default (function createHeader() {
    pubsub.on('updateCurrentDisplay', update_header_display);

    (function initial_display() {
        const side_container = document.querySelector('.side-bar');
        const logo = document.createElement('img');
        logo.src = logoSrc;
        logo.alt = "Logo";
        const name = document.createElement('h1');
        name.textContent = "To-Do List";
        side_container.appendChild(logo);
        side_container.appendChild(name);

        const main_container = document.querySelector('.header');
        const title = document.createElement('h2');
        title.textContent = "Tasks: All";
        main_container.appendChild(title);
    })();

    function update_header_display(message_display) {
        const container = document.querySelector('.header>h2');
        container.textContent = message_display;
    }
})();

