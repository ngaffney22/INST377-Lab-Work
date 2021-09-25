let slidePosition = 0;
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;

document.querySelector('.button-next').addEventListener("click", function() {
    moveNextSlide();
})
document.querySelector('.button-prev').addEventListener("click", function() {
    movePrevSlide();
})

function updateSlidePosition(){
    for (let slide of slides){
        slide.classList.remove('carousel-item--visable');
        slide.classList.add('carousel-item--hidden');
    }
    slides[slidePosition].classList.add('carousel-item--visable');
}
function moveNextSlide() {
    if (slidePosition === totalSlides - 1){
        slidePosition = 0;
    }else {
        slidePosition++;
    }

    updateSlidePosition();
}
function movePrevSlide() {
    if (slidePosition === 0){
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }

    updateSlidePosition();
}