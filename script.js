const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');

let slideWidth = slides[0].getBoundingClientRect().width;

// Function to arrange slides next to each other
function arrangeSlides() {
  slideWidth = slides[0].getBoundingClientRect().width; // Recalculate slide width
  slides.forEach((slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
  });
}

// Arrange the slides initially
arrangeSlides();

let currentIndex = 0;

// Function to move to the next slide
function moveToNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

// Function to move to the previous slide
function moveToPrevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

// Event listeners for navigation buttons
nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);

// Auto-scroll functionality
let autoScrollInterval = setInterval(moveToNextSlide, 3000); // Adjust interval as needed

// Stop auto-scroll on button hover
[nextButton, prevButton].forEach(button => {
  button.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  button.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(moveToNextSlide, 3000);
  });
});

// Adjust carousel on window resize
window.addEventListener('resize', () => {
  arrangeSlides(); // Rearrange slides
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`; // Adjust current slide position
});

