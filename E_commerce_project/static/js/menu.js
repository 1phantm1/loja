document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const menuList = document.querySelector('div#menulist');
    const menu = document.querySelector("")
    const search = document.querySelector("div#search");
    const body = document.querySelector("body");
    const overlay = document.querySelector("div#overlay")
    menuIcon.addEventListener('click', function() {
        menuList.classList.add('active');
        overlay.classList.add("over-active");
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        closeIcon.style.pointerEvents = "auto";
        search.style.display = "none";
        body.style.overflow = "hidden"; 
        menuList.style.overflow = "auto";
        overlay.style.display = "block";
    });

    closeIcon.addEventListener('click', function() {
        menuList.classList.remove('active');
        overlay.classList.remove("over-active");
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        search.style.display = "block";
        body.style.overflow = "auto";
        overlay.style.display = "none";
    });
});
