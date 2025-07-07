// Basic Slider
const basicSlides = document.querySelectorAll(".basic-slider .slide");
const basicPrevBtn = document.querySelector(".basic-slider .prev");
const basicNextBtn = document.querySelector(".basic-slider .next");
let basicCurrentIndex = 0;

function showBasicSlide(index) {
  basicSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

basicPrevBtn.addEventListener("click", () => {
  basicCurrentIndex = (basicCurrentIndex - 1 + basicSlides.length) % basicSlides.length;
  showBasicSlide(basicCurrentIndex);
});

basicNextBtn.addEventListener("click", () => {
  basicCurrentIndex = (basicCurrentIndex + 1) % basicSlides.length;
  showBasicSlide(basicCurrentIndex);
});

// Fade Slider
const fadeSlides = document.querySelectorAll(".fade-slider .slide");
const fadePrevBtn = document.querySelector(".fade-slider .prev");
const fadeNextBtn = document.querySelector(".fade-slider .next");
const fadeDotsContainer = document.querySelector(".fade-slider .dots");
let fadeCurrentIndex = 0;

// Create dots
fadeSlides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    fadeCurrentIndex = i;
    showFadeSlide(fadeCurrentIndex);
  });
  fadeDotsContainer.appendChild(dot);
});

const fadeDots = document.querySelectorAll(".fade-slider .dot");

function showFadeSlide(index) {
  fadeSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  
  fadeDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

fadePrevBtn.addEventListener("click", () => {
  fadeCurrentIndex = (fadeCurrentIndex - 1 + fadeSlides.length) % fadeSlides.length;
  showFadeSlide(fadeCurrentIndex);
});

fadeNextBtn.addEventListener("click", () => {
  fadeCurrentIndex = (fadeCurrentIndex + 1) % fadeSlides.length;
  showFadeSlide(fadeCurrentIndex);
});

// Slide Transition Slider
const slideTransitionSlides = document.querySelector(".slide-transition-slider .slides");
const slideTransitionPrevBtn = document.querySelector(".slide-transition-slider .prev");
const slideTransitionNextBtn = document.querySelector(".slide-transition-slider .next");
let slideTransitionCurrentIndex = 0;
const slideCount = document.querySelectorAll(".slide-transition-slider .slide").length;

function updateSlideTransition() {
  slideTransitionSlides.style.transform = `translateX(-${slideTransitionCurrentIndex * 100}%)`;
}

slideTransitionPrevBtn.addEventListener("click", () => {
  slideTransitionCurrentIndex = (slideTransitionCurrentIndex - 1 + slideCount) % slideCount;
  updateSlideTransition();
});

slideTransitionNextBtn.addEventListener("click", () => {
  slideTransitionCurrentIndex = (slideTransitionCurrentIndex + 1) % slideCount;
  updateSlideTransition();
});

// Autoplay Slider
const autoplaySlides = document.querySelectorAll(".autoplay-slider .slide");
const autoplayPrevBtn = document.querySelector(".autoplay-slider .prev");
const autoplayNextBtn = document.querySelector(".autoplay-slider .next");
const autoplayDotsContainer = document.querySelector(".autoplay-slider .dots");
const playPauseBtn = document.querySelector(".autoplay-slider .play-pause");
let autoplayCurrentIndex = 0;
let autoplayInterval;
let isPlaying = true;

// Create dots
autoplaySlides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    autoplayCurrentIndex = i;
    showAutoplaySlide(autoplayCurrentIndex);
  });
  autoplayDotsContainer.appendChild(dot);
});

const autoplayDots = document.querySelectorAll(".autoplay-slider .dot");

function showAutoplaySlide(index) {
  autoplaySlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  
  autoplayDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function nextAutoplaySlide() {
  autoplayCurrentIndex = (autoplayCurrentIndex + 1) % autoplaySlides.length;
  showAutoplaySlide(autoplayCurrentIndex);
}

function startAutoplay() {
  autoplayInterval = setInterval(nextAutoplaySlide, 3000);
}

function toggleAutoplay() {
  if (isPlaying) {
    clearInterval(autoplayInterval);
    playPauseBtn.textContent = "Play";
  } else {
    startAutoplay();
    playPauseBtn.textContent = "Pause";
  }
  isPlaying = !isPlaying;
}

autoplayPrevBtn.addEventListener("click", () => {
  autoplayCurrentIndex = (autoplayCurrentIndex - 1 + autoplaySlides.length) % autoplaySlides.length;
  showAutoplaySlide(autoplayCurrentIndex);
  if (isPlaying) {
    clearInterval(autoplayInterval);
    startAutoplay();
  }
});

autoplayNextBtn.addEventListener("click", () => {
  autoplayCurrentIndex = (autoplayCurrentIndex + 1) % autoplaySlides.length;
  showAutoplaySlide(autoplayCurrentIndex);
  if (isPlaying) {
    clearInterval(autoplayInterval);
    startAutoplay();
  }
});

playPauseBtn.addEventListener("click", toggleAutoplay);

// Initialize autoplay
startAutoplay();