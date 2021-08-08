/* House View JavaScript */
const galleryCarousel = document.querySelectorAll('#galleryCarousel .carousel-inner .carousel-item');

if (galleryCarousel.length > 0) {
    galleryCarousel[0].classList.add('active');
}

/***** House custom carousel JS code *****/
//consts
const slider = document.getElementById('img-container');
const imgsContent = document.querySelectorAll('#img-container .carousel-img-container');
const lastImg = imgsContent[imgsContent.length - 1];
const arrowLeft = document.querySelector('.arrow-left');
const arrowright = document.querySelector('.arrow-right');
const imgs = document.querySelectorAll('#img-container .carousel-img-container img');
const imgsGallery = document.querySelectorAll('#galleryCarousel .carousel-inner .carousel-item');
const body = document.getElementsByTagName('body')[0];
const imgsOverlay = document.querySelectorAll('#carouselOverlay .carousel-inner .carousel-item');
const fullOverlay = document.getElementById('full-overlay');
const carouselOverlay = document.getElementById('carouselOverlay');
const closeCarouselBtn = document.getElementById('closeCarousel');
const overlayLeft = document.getElementById('overlayLeft');
const overlayRight = document.getElementById('overlayRight');

if (imgs.length > 0) {
    imgs[0].classList.add('active');
}
if (imgsOverlay.length > 0) {
    imgsOverlay[0].classList.add('active');
}

/* Verify wich img was clicked */
let overlayOpen = false;
imgsGallery.forEach(element => {
    element.addEventListener('click', () => {
        body.style.overflow = 'hidden';
        fullOverlay.style.display = 'block';
        carouselOverlay.style.transform = 'scale(1)';
        carouselOverlay.style.transition = 'transform 0.3s ease';
        overlayOpen = true;
        setTimeout(() => {
            carouselOverlay.classList.add('slide');
        }, 1);

    });
});

fullOverlay.addEventListener('click', carouselOverlayClose)
closeCarouselBtn.addEventListener('click', carouselOverlayClose);

function carouselOverlayClose() {
    body.style.overflow = 'initial';
    fullOverlay.style.display = 'none';
    carouselOverlay.style.transform = 'scale(0)';
    carouselOverlay.classList.remove('slide');
    overlayOpen = false;
}

window.onkeyup = (e) => {
    if (overlayOpen) {

        if (e.keyCode == 39) {
            overlayRight.click();
        }
        else if (e.keyCode == 37) {
            overlayLeft.click();
        }
        else if (e.keyCode == 27) {
            closeCarouselBtn.click();
        }
    } 
}

//Events to change the slider images showing
arrowright.addEventListener('click', nextImg);
arrowLeft.addEventListener('click', prevImg);

//vars to count the elements are overflow on X
let imagesCounter;
//this count if the user click on next or prev
let currentImage;
/* Evits bugs when the screen are resizing */
sliderInit();
/* restart the variables and verify how many imgs are overflowing on X */
function sliderInit() {
    imagesCounter = 0;
    currentImage = 0;
    imgsContent.forEach(element => {
        if (isOverflowX(element)) imagesCounter++;
        element.style.transform = 'translateX(0%)';
    });
}

/* Detect when secreen are resizing */
window.addEventListener('resize', sliderInit);

/* Verify how many elements are overflowing on X */
function isOverflowX(element) {
    return element.offsetLeft >= slider.offsetWidth;
}

/* show the next img */
function nextImg() {

    /* verify if there are images to show  */
    if (currentImage < (imagesCounter * 100)) {

        /* add the counter +100*/
        currentImage += 100;
        /* traslate all the images to new X position */
        imgsContent.forEach(element => {
            element.style.transform = `translateX(-${currentImage}%)`;
            element.style.transition = 'transform 0.3s';
        });

    }
    else {

        /* if not are more img make a animation that indicate there no more imgs */

        /* move 50% on X the images for few moments */
        imgsContent.forEach(element => {
            element.style.transform = `translateX(-${(currentImage) + 50}%)`;
            element.style.transition = 'transform 0.3s';
        });
        /* return the img to the position */
        setTimeout(() => {
            imgsContent.forEach(element => {
                element.style.transform = `translateX(-${currentImage}%)`;
            });
        }, 300);

    }

}

/* Its the same that in nextImg but this change the direction */
function prevImg() {

    if (currentImage > 0) {

        currentImage -= 100;
        imgsContent.forEach(element => {
            element.style.transform = `translateX(-${currentImage}%)`;
            element.style.transition = 'transform 0.3s';
        });

    }
    else {

        imgsContent.forEach(element => {
            element.style.transform = `translateX(${(currentImage) + 50}%)`;
            element.style.transition = 'transform 0.3s';
        });

        setTimeout(() => {
            imgsContent.forEach(element => {
                element.style.transform = `translateX(${currentImage}%)`;
            });
        }, 300);

    }

}

/* Add active class to img are selected */
imgs.forEach(element => {
    element.addEventListener('click', () => {
        delteActiveClass();
        element.classList.add('active');
    });
});

/* Delete the active class on the image that have the active class */
function delteActiveClass() {
    imgs.forEach(element => {
        if (element.classList.contains('active'))
            element.classList.remove('active');
    })
}
