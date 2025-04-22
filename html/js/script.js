window.onload = function () {
    let preloader = document.getElementById('preload');
    preloader.style.display = 'none';
};
const headerFloatMenu = document.getElementById('headerFloatMenu');
$(document).ready(function () {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    /*
    window.addEventListener('scroll', function () {
        if (window.scrollY >= 200) {
            headerFloatMenu.classList.add('sticky');
        } else {
            headerFloatMenu.classList.remove('sticky');
        }
    });*/
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            if (icon.classList.contains('open')) {

            }
            icon.classList.toggle("open");
        });
    });
});