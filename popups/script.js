document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const popupType = this.getAttribute('data-type');
            createPopup(popupType);
        });
    });
});

function createPopup(type) {
    // Remove any existing popups first
    removeExistingPopups();
    
    // Create overlay for modal types
    if (['center', 'slide', 'royal', 'neon', 'glass', 'cyber'].includes(type)) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.addEventListener('click', function() {
            removeExistingPopups();
        });
        document.body.appendChild(overlay);
    }
    
    // Create the popup element
    const popup = document.createElement('div');
    popup.className = `popup popup-${type}`;
    
    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'popup-close';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', removeExistingPopups);
    
    // Add content based on popup type
    let content;
    switch(type) {
        case 'default':
            content = document.createTextNode('This is a default popup. It appears near the button.');
            break;
        case 'center':
            content = document.createTextNode('This is a centered modal dialog. Click outside or the X to close.');
            break;
        case 'slide':
            content = document.createTextNode('This is a slide-in panel. Great for mobile menus or side panels.');
            break;
        case 'notification':
            content = document.createTextNode('This is a notification toast. It will auto-close after 3 seconds.');
            // Auto-close notification after 3 seconds
            setTimeout(removeExistingPopups, 3000);
            break;
        case 'royal':
            content = document.createTextNode('Royal Modal - Fit for a king!');
            break;
        case 'neon':
            content = document.createTextNode('NEON POPUP - FUTURISTIC DESIGN');
            break;
        case 'glass':
            content = document.createTextNode('Glassmorphism - Modern translucent design');
            break;
        case 'cyber':
            content = document.createTextNode('CYBERPUNK 2077\nWelcome to the future');
            break;
        default:
            content = document.createTextNode('Popup content');
    }
    
    // Assemble the popup
    popupContent.appendChild(closeButton);
    popupContent.appendChild(content);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
    
    // Add escape key listener
    document.addEventListener('keydown', function escListener(e) {
        if (e.key === 'Escape') {
            removeExistingPopups();
            document.removeEventListener('keydown', escListener);
        }
    });
}

function removeExistingPopups() {
    // Remove all popups and overlays
    const existingPopups = document.querySelectorAll('.popup, .overlay');
    existingPopups.forEach(popup => {
        popup.remove();
    });
}