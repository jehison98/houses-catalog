const allCarousels = document.querySelectorAll('.catalog-carousel');

/* Index View JavaScript */
allCarousels.forEach(carousel => {
    const allOlLi = carousel.querySelectorAll('.carousel-indicators li');
    const carouselItems = carousel.querySelectorAll('.carousel-inner .carousel-item');

    if (allOlLi.length > 0) {
        allOlLi[0].classList.add('active');
    }

    if (carouselItems.length >= 0) {
        carouselItems[0].classList.add('active');
    }

});


