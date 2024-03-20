document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const menuList = document.querySelector('.menu-list');
    const search = document.querySelector("div#search")

    menuIcon.addEventListener('click', function() {
        menuList.classList.add('active');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        closeIcon.style.pointerEvents = "auto";
        search.style.display = "none";
    });

    closeIcon.addEventListener('click', function() {
        menuList.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        search.style.display = "block";
    });
});
