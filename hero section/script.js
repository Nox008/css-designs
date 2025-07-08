// Animation for Hero 4 stats
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = +stat.innerText.replace('+', '').replace('%', '');
        const suffix = stat.innerText.includes('+') ? '+' : 
                      stat.innerText.includes('%') ? '%' : '';
        
        let count = 0;
        const duration = 2000; // Animation duration in ms
        const increment = target / (duration / 16); // 60fps
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                stat.innerText = Math.floor(count) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                stat.innerText = target + suffix;
            }
        };
        
        // Start animation when hero section is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.hero-4'));
    });

    // Add hover effects to all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Hero 5 - Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });

    // Hero 6 - Mockup screen hover effect
    const mockupScreen = document.querySelector('.mockup-screen');
    if (mockupScreen) {
        mockupScreen.addEventListener('mouseenter', () => {
            mockupScreen.style.transform = 'perspective(1000px) rotateY(-10deg) rotateX(5deg)';
        });
        
        mockupScreen.addEventListener('mouseleave', () => {
            mockupScreen.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(0deg)';
        });
    }

    // Hero 7 - Glass card interactive effects
    const glassCard = document.querySelector('.glass-card');
    if (glassCard) {
        glassCard.addEventListener('mousemove', (e) => {
            const rect = glassCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            glassCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        glassCard.addEventListener('mouseleave', () => {
            glassCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // Smooth scrolling for navigation (if needed)
    const heroSections = document.querySelectorAll('.hero');
    let currentSection = 0;
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && currentSection < heroSections.length - 1) {
            currentSection++;
            heroSections[currentSection].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' && currentSection > 0) {
            currentSection--;
            heroSections[currentSection].scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Update current section on scroll
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionIndex = Array.from(heroSections).indexOf(entry.target);
                currentSection = sectionIndex;
            }
        });
    }, { threshold: 0.5 });

    heroSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Parallax effect for background shapes in Hero 7
    const bgShapes = document.querySelectorAll('.bg-shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        bgShapes.forEach((shape, index) => {
            const rate = scrolled * -0.5 * (index + 1);
            shape.style.transform = `translateY(${rate}px)`;
        });
    });

    // Input focus effects for Hero 7
    const glassInput = document.querySelector('.hero-7 input');
    if (glassInput) {
        glassInput.addEventListener('focus', () => {
            glassInput.style.background = 'rgba(255, 255, 255, 0.2)';
            glassInput.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        });
        
        glassInput.addEventListener('blur', () => {
            glassInput.style.background = 'rgba(255, 255, 255, 0.1)';
            glassInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
    }

    // Search bar functionality for Hero 3
    const searchBar = document.querySelector('.hero-3 .search-bar');
    if (searchBar) {
        const searchInput = searchBar.querySelector('input');
        const searchButton = searchBar.querySelector('button');
        
        searchButton.addEventListener('click', () => {
            const email = searchInput.value.trim();
            if (email) {
                // Simulate subscription
                searchButton.textContent = 'Subscribed!';
                searchButton.style.backgroundColor = '#27ae60';
                searchInput.disabled = true;
                
                setTimeout(() => {
                    searchButton.textContent = 'Subscribe';
                    searchButton.style.backgroundColor = '#2c3e50';
                    searchInput.disabled = false;
                    searchInput.value = '';
                }, 2000);
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Button click animations
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Loading animation for Hero 6 mockup
    const mockupCards = document.querySelectorAll('.mockup-card');
    let cardAnimationDelay = 0;
    
    const animateMockupCards = () => {
        mockupCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.background = '#e3f2fd';
                setTimeout(() => {
                    card.style.background = '#f8f9fa';
                }, 500);
            }, index * 200);
        });
    };

    // Trigger mockup animation when Hero 6 is in view
    const hero6Observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateMockupCards();
            setInterval(animateMockupCards, 3000); // Repeat every 3 seconds
        }
    }, { threshold: 0.5 });

    const hero6 = document.querySelector('.hero-6');
    if (hero6) {
        hero6Observer.observe(hero6);
    }
});