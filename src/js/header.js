$(document).ready(function() {
    $('.header .hamburger').click(function() {
        $(this).toggleClass('is-active');
        $('.side-menu').toggleClass('show');
    });
    $('.side-menu .hamburger').click(function() {
        $('.side-menu').toggleClass('show');
        $('.header .hamburger').removeClass('is-active');
    });
    $('.header__search-button').click(function() {
        $('.header__inner').addClass('hide');
        $('.header__search').addClass('show');
    });
    $('.header__search i.fa.fa-close').click(function() {
        $('.header__search').removeClass('show');
        $('.header__inner').removeClass('hide');
    });
});