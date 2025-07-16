// Optional: Add particle effects or more complex interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add active class to sections when they come into view
    const sections = document.querySelectorAll('.animation-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  });