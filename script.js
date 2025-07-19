document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Function to set the theme
    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Update the checkbox state
        themeToggle.checked = theme === 'dark';
    };

    // --- Event Listener for the toggle switch ---
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });

    // --- Initial Theme Setup on page load ---
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        // Use the saved theme if it exists
        setTheme(savedTheme);
    } else if (prefersDark) {
        // Otherwise, respect the user's OS preference
        setTheme('dark');
    } else {
        // Default to light theme
        setTheme('light');
    }
});