$(document).ready(function() {

    $('.header-slider .header-slider__inner').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    $('.section-block--campaigns .campaigns-block').slick({
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: '.slider-nav__arrow--next',
        prevArrow: '.slider-nav__arrow--prev',
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    });

    setTimeout(function() {
        $('.section-block--campaigns .slick-dots > li:first-of-type').before($('.section-block--campaigns .slider-nav .slider-nav__arrow--prev'));
        $('.section-block--campaigns .slick-dots > li:last-of-type').after($('.section-block--campaigns .slider-nav .slider-nav__arrow--next'));
        $('.section-block--campaigns .slick-dots > li:first-of-type').before('<div id="dots"></div>');
        $('.section-block--campaigns .slick-dots li').appendTo('.section-block--campaigns .slick-dots #dots');
    });

});