document.addEventListener('DOMContentLoaded', () => {
    // Theme functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a nice transition effect
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Intersection Observer for loader cards animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const loaderCards = document.querySelectorAll('.loader-card');
    loaderCards.forEach((card, index) => {
        // Initial state for animation
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Enhanced click to copy functionality
    loaderCards.forEach(card => {
        card.addEventListener('click', () => {
            const loaderType = card.querySelector('h2').textContent;
            const loaderHTML = card.querySelector('.loader-container').innerHTML;
            
            // Create a comprehensive copy text
            const copyText = `
/* ${loaderType} */
HTML:
${loaderHTML}

CSS Classes Used:
${getLoaderClasses(loaderType)}
            `.trim();
            
            navigator.clipboard.writeText(copyText)
                .then(() => {
                    showNotification('Loader code copied to clipboard!', 'success');
                })
                .catch(() => {
                    showNotification('Failed to copy. Please try again.', 'error');
                });
        });
    });
    
    function getLoaderClasses(loaderType) {
        const classMap = {
            'Spinner Loaders': '.spinner-1, .spinner-2',
            'Dot Loaders': '.dot-pulse, .dot-flashing',
            'Bar Loaders': '.bar-wave, .bar-slide',
            'Royal Loaders': '.royal-crown, .royal-ring',
            'Neon Loaders': '.neon-pulse, .neon-circuit',
            'Geometric Loaders': '.geometric-cube, .geometric-hexagon',
            'Liquid Loaders': '.liquid-wave, .liquid-morph',
            'Particle Loaders': '.particle-orbit, .particle-spiral',
            'Matrix Loaders': '.matrix-rain, .matrix-grid'
        };
        return classMap[loaderType] || 'Check CSS file for classes';
    }
    
    function showNotification(message, type = 'success') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Styling for notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: type === 'success' ? 'var(--success)' : 'var(--warning)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            zIndex: '1000',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            opacity: '0',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            pointerEvents: 'none'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(-5px)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(10px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2500);
    }
    
    // Add hover effects to loaders
    const loaders = document.querySelectorAll('.loader');
    loaders.forEach(loader => {
        loader.addEventListener('mouseenter', () => {
            loader.style.transform = 'scale(1.1)';
            loader.style.transition = 'transform 0.3s ease';
        });
        
        loader.addEventListener('mouseleave', () => {
            loader.style.transform = 'scale(1)';
        });
    });
    
    // Add performance monitoring
    const observePerformance = () => {
        if ('PerformanceObserver' in window) {
            const perfObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'measure') {
                        console.log(`${entry.name}: ${entry.duration}ms`);
                    }
                });
            });
            
            perfObserver.observe({ entryTypes: ['measure'] });
        }
    };
    
    // Initialize performance monitoring
    observePerformance();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            themeToggle.click();
        }
    });
    
    // Add smooth scrolling to cards
    const addSmoothScrolling = () => {
        loaderCards.forEach((card, index) => {
            card.addEventListener('click', (e) => {
                if (e.detail === 2) { // Double click
                    e.preventDefault();
                    const nextCard = loaderCards[index + 1] || loaderCards[0];
                    nextCard.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            });
        });
    };
    
    addSmoothScrolling();
    
    // Add loading state simulation
    const simulateLoading = () => {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            ">
                <div class="spinner-1" style="border-color: rgba(255, 255, 255, 0.3); border-top-color: white;"></div>
            </div>
        `;
        
        // Show loading on page refresh
        if (performance.navigation.type === 1) {
            document.body.appendChild(loadingOverlay);
            setTimeout(() => {
                loadingOverlay.firstElementChild.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                loadingOverlay.firstElementChild.style.opacity = '0';
                setTimeout(() => {
                    if (loadingOverlay.parentNode) {
                        loadingOverlay.parentNode.removeChild(loadingOverlay);
                    }
                }, 300);
            }, 1000);
        }
    };
    
    simulateLoading();
    
    // Add easter egg - Konami code
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        showNotification('🎉 Easter egg activated! All loaders are now rainbow!', 'success');
        
        // Add rainbow effect to all loaders
        const style = document.createElement('style');
        style.textContent = `
            .loader * {
                animation-duration: 0.5s !important;
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3) !important;
                border-color: #ff0000 !important;
                box-shadow: 0 0 20px rgba(255, 0, 0, 0.5) !important;
            }
        `;
        document.head.appendChild(style);
        
        // Remove after 5 seconds
        setTimeout(() => {
            document.head.removeChild(style);
            showNotification('Rainbow mode deactivated!', 'success');
        }, 5000);
    }
    
    // Initialize tooltip system
    const initTooltips = () => {
        loaderCards.forEach(card => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Click to copy code • Double-click to navigate';
            tooltip.style.cssText = `
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: var(--dark);
                color: var(--light);
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
                z-index: 1000;
            `;
            
            card.style.position = 'relative';
            card.appendChild(tooltip);
            
            card.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
        });
    };
    
    initTooltips();
    
    console.log('🎨 Loader Showcase initialized successfully!');
    console.log('💡 Tips:');
    console.log('   - Press Ctrl/Cmd + T to toggle theme');
    console.log('   - Double-click cards to navigate');
    console.log('   - Try the Konami code for a surprise!');
});