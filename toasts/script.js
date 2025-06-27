document.addEventListener('DOMContentLoaded', function() {
    // Get all toast buttons
    const toastButtons = document.querySelectorAll('.show-toast');
    let toastCount = 0;
    const toastGap = 20; // Gap between toasts in pixels
    
    // Add click event to each button
    toastButtons.forEach(button => {
        button.addEventListener('click', function() {
            const toastId = this.getAttribute('data-toast');
            showToast(toastId);
        });
    });
    
    // Function to show toast
    function showToast(toastId) {
        const toast = document.getElementById(`toast-${toastId}`);
        
        // Clone the toast to show multiple instances
        const toastClone = toast.cloneNode(true);
        toastClone.id = ''; // Remove ID to avoid duplicates
        toastClone.classList.add('active');
        document.body.appendChild(toastClone);
        
        // Calculate position based on existing toasts
        const existingToasts = document.querySelectorAll('.toast.active');
        const topPosition = toastCount * (toastClone.offsetHeight + toastGap) + 20;
        toastClone.style.top = `${topPosition}px`;
        toastCount++;
        
        // Add close event
        const closeBtn = toastClone.querySelector('.toast-close');
        closeBtn.addEventListener('click', function() {
            closeToast(toastClone);
        });
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (toastClone.parentNode) {
                closeToast(toastClone);
            }
        }, 5000);
    }
    
    // Function to close toast
    function closeToast(toastElement) {
        toastElement.classList.remove('active');
        toastElement.addEventListener('transitionend', function() {
            if (toastElement.parentNode) {
                // Update positions of remaining toasts
                updateToastPositions(toastElement);
                toastElement.parentNode.removeChild(toastElement);
                toastCount--;
            }
        });
    }
    
    // Function to update positions of remaining toasts
    function updateToastPositions(closedToast) {
        const closedTop = parseInt(closedToast.style.top);
        const toastHeight = closedToast.offsetHeight + toastGap;
        
        document.querySelectorAll('.toast.active').forEach(toast => {
            const currentTop = parseInt(toast.style.top);
            if (currentTop > closedTop) {
                toast.style.top = `${currentTop - toastHeight}px`;
            }
        });
    }
});