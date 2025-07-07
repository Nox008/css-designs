// Enhanced Slider Showcase JavaScript
class SliderManager {
  constructor() {
    this.sliders = new Map();
    this.initializeAllSliders();
  }

  initializeAllSliders() {
    this.initBasicSlider();
    this.initFadeSlider();
    this.initSlideTransitionSlider();
    this.initAutoplaySlider();
    this.initCarousel3DSlider();
    this.initVerticalSlider();
  }

  // Utility function to create dots
  createDots(container, count, clickHandler) {
    const dotsContainer = container.querySelector('.dots');
    if (!dotsContainer) return null;
    
    dotsContainer.innerHTML = '';
    const dots = [];
    
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => clickHandler(i));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
    
    return dots;
  }

  // Utility function to update dots
  updateDots(dots, activeIndex) {
    if (!dots) return;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  // Basic Slider
  initBasicSlider() {
    const slider = document.querySelector('.basic-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    let currentIndex = 0;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    };

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });

    this.sliders.set('basic', { currentIndex, showSlide, nextSlide, prevSlide });
  }

  // Fade Slider
  initFadeSlider() {
    const slider = document.querySelector('.fade-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    let currentIndex = 0;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      this.updateDots(dots, index);
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    };

    // Create dots
    const dots = this.createDots(slider, slides.length, (index) => {
      currentIndex = index;
      showSlide(currentIndex);
    });

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const touchDiff = touchStartX - touchEndX;
      
      if (Math.abs(touchDiff) > 50) {
        if (touchDiff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    });

    this.sliders.set('fade', { currentIndex, showSlide, nextSlide, prevSlide });
  }

  // Slide Transition Slider
  initSlideTransitionSlider() {
    const slider = document.querySelector('.slide-transition-slider');
    if (!slider) return;

    const slidesContainer = slider.querySelector('.slides');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    let currentIndex = 0;

    const updateSlidePosition = () => {
      const translateX = -currentIndex * 100;
      slidesContainer.style.transform = `translateX(${translateX}%)`;
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlidePosition();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlidePosition();
    };

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);

    this.sliders.set('slideTransition', { currentIndex, updateSlidePosition, nextSlide, prevSlide });
  }

  // Autoplay Slider
  initAutoplaySlider() {
    const slider = document.querySelector('.autoplay-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const playPauseBtn = slider.querySelector('.play-pause-btn');
    let currentIndex = 0;
    let autoplayInterval;
    let isPlaying = true;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      this.updateDots(dots, index);
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    };

    const startAutoplay = () => {
      autoplayInterval = setInterval(nextSlide, 4000);
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    const toggleAutoplay = () => {
      if (isPlaying) {
        stopAutoplay();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      } else {
        startAutoplay();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      }
      isPlaying = !isPlaying;
    };

    // Create dots
    const dots = this.createDots(slider, slides.length, (index) => {
      currentIndex = index;
      showSlide(currentIndex);
      if (isPlaying) {
        stopAutoplay();
        startAutoplay();
      }
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      if (isPlaying) {
        stopAutoplay();
        startAutoplay();
      }
    });

    nextBtn.addEventListener('click', () => {
      nextSlide();
      if (isPlaying) {
        stopAutoplay();
        startAutoplay();
      }
    });

    playPauseBtn.addEventListener('click', toggleAutoplay);

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
      if (isPlaying) stopAutoplay();
    });

    slider.addEventListener('mouseleave', () => {
      if (isPlaying) startAutoplay();
    });

    // Initialize autoplay
    startAutoplay();

    this.sliders.set('autoplay', { 
      currentIndex, 
      showSlide, 
      nextSlide, 
      prevSlide, 
      toggleAutoplay,
      startAutoplay,
      stopAutoplay 
    });
  }

  // 3D Carousel Slider
  initCarousel3DSlider() {
    const slider = document.querySelector('.carousel-3d-slider');
    if (!slider) return;

    const items = slider.querySelectorAll('.carousel-item');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    let currentIndex = 0;

    const updateCarousel = () => {
      items.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next', 'hidden');
        
        if (index === currentIndex) {
          item.classList.add('active');
        } else if (index === (currentIndex - 1 + items.length) % items.length) {
          item.classList.add('prev');
        } else if (index === (currentIndex + 1) % items.length) {
          item.classList.add('next');
        } else {
          item.classList.add('hidden');
        }
      });
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
    };

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Click on items to navigate
    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (index !== currentIndex) {
          currentIndex = index;
          updateCarousel();
        }
      });
    });

    // Initialize carousel
    updateCarousel();

    // Auto-rotate every 6 seconds
    setInterval(nextSlide, 6000);

    this.sliders.set('carousel3d', { currentIndex, updateCarousel, nextSlide, prevSlide });
  }

  // Vertical Slider
  initVerticalSlider() {
    const slider = document.querySelector('.vertical-slider');
    if (!slider) return;

    const slidesContainer = slider.querySelector('.slides');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const progressFill = slider.querySelector('.progress-fill');
    let currentIndex = 0;

    const updateSlidePosition = () => {
      const translateY = -currentIndex * (100 / 3);
      slidesContainer.style.transform = `translateY(${translateY}%)`;
      
      // Update progress bar
      progressFill.className = 'progress-fill slide-' + (currentIndex + 1);
      
      // Update active slide
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlidePosition();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlidePosition();
    };

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Scroll wheel navigation
    slider.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    });

    // Initialize
    updateSlidePosition();

    this.sliders.set('vertical', { currentIndex, updateSlidePosition, nextSlide, prevSlide });
  }

  // Global methods
  pauseAllAutoplay() {
    const autoplaySlider = this.sliders.get('autoplay');
    if (autoplaySlider && autoplaySlider.stopAutoplay) {
      autoplaySlider.stopAutoplay();
    }
  }

  resumeAllAutoplay() {
    const autoplaySlider = this.sliders.get('autoplay');
    if (autoplaySlider && autoplaySlider.startAutoplay) {
      autoplaySlider.startAutoplay();
    }
  }
}

// Intersection Observer for performance optimization
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const sliderObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const slider = entry.target;
    if (entry.isIntersecting) {
      slider.classList.add('visible');
      // Resume autoplay when slider becomes visible
      if (slider.classList.contains('autoplay-slider')) {
        // Resume autoplay logic here if needed
      }
    } else {
      slider.classList.remove('visible');
      // Pause autoplay when slider is not visible
      if (slider.classList.contains('autoplay-slider')) {
        // Pause autoplay logic here if needed
      }
    }
  });
}, observerOptions);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize slider manager
  const sliderManager = new SliderManager();
  
  // Add intersection observer to all sliders
  const allSliders = document.querySelectorAll('.slider');
  allSliders.forEach(slider => {
    sliderObserver.observe(slider);
  });

  // Add loading animations
  const showcaseCards = document.querySelectorAll('.slider-showcase');
  showcaseCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Add smooth scroll behavior to navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Global keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Escape key to pause all autoplay
    if (e.key === 'Escape') {
      sliderManager.pauseAllAutoplay();
    }
    
    // Space key to resume all autoplay
    if (e.key === ' ' && e.target === document.body) {
      e.preventDefault();
      sliderManager.resumeAllAutoplay();
    }
  });

  // Performance monitoring
  console.log('🎠 Advanced Slider Showcase initialized successfully!');
  console.log('📊 Total sliders loaded:', allSliders.length);
  console.log('⚡ Performance optimizations active');
});

// Export for potential external use
window.SliderManager = SliderManager;