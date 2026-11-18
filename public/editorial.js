const menu = document.getElementById('editorial-menu');
const openMenu = document.querySelector('.editorial-menu-open');

if (menu && openMenu && typeof menu.showModal === 'function') {
    document.documentElement.classList.add('has-editorial-menu');
    openMenu.addEventListener('click', () => menu.showModal());
    menu.addEventListener('close', () => openMenu.focus());
}
