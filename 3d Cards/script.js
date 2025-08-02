document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const cardContainer = document.querySelector('.card-container');

    // Maximum rotation angle
    const maxRotation = 20;

    // Listen for mouse movement over the container
    cardContainer.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Get mouse position relative to the card's center
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Calculate rotation angles based on mouse position
        const rotateY = (x / (rect.width / 2)) * maxRotation;
        const rotateX = (-y / (rect.height / 2)) * maxRotation;

        // Update the card's transform style for the 3D tilt effect
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Update CSS custom properties for the glare effect
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });

    // Reset card to its default state when the mouse leaves
    cardContainer.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});