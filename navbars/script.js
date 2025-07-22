document.addEventListener('DOMContentLoaded', function() {
    // Theme switcher functionality
    const themeSwitcher = document.getElementById('theme-switcher');
    const html = document.documentElement;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
    
    themeSwitcher.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeSwitcher.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Command menu functionality
    const commandMenuBtn = document.getElementById('command-menu-btn');
    const commandMenu = document.getElementById('command-menu');
    
    commandMenuBtn.addEventListener('click', () => {
        commandMenu.classList.add('active');
    });
    
    commandMenu.addEventListener('click', (e) => {
        if (e.target === commandMenu) {
            commandMenu.classList.remove('active');
        }
    });
    
    // Close command menu with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && commandMenu.classList.contains('active')) {
            commandMenu.classList.remove('active');
        }
        
        // Open command menu with CMD+K or CTRL+K
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            commandMenu.classList.add('active');
        }
    });
    
    // Copy button functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            // In a real implementation, you would copy the relevant code
            // For this demo, we'll just show a feedback message
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    });
    
    // Smooth hover effects for dropdowns
    // Improved dropdown handling
    const dropdowns = document.querySelectorAll('.dropdown, .mega-menu-trigger');
    
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu, .mega-menu');
        let hoverTimeout;
        
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            menu.style.transition = 'none';
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(10px)';
            
            // Force reflow
            menu.getBoundingClientRect();
            
            menu.style.transition = '';
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            // Add slight delay to prevent flickering when moving between dropdown and menu
            hoverTimeout = setTimeout(() => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(10px)';
            }, 200);
        });
        
        // Also handle mouseenter on the menu itself to prevent hiding while interacting
        if (menu) {
            menu.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
            });
            
            menu.addEventListener('mouseleave', () => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(10px)';
            });
        }
    });
});