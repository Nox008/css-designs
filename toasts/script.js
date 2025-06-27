document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const CONFIG = {
        MAX_TOASTS: 5,
        AUTO_CLOSE_DELAYS: {
            glass: 5000,
            royalty: 7000,
            neon: 6000,
            cartoon: 8000,
            default: 5000
        },
        ANIMATION_DURATION: 400,
        REMOVE_ANIMATION_DURATION: 300,
        TOAST_GAP: 10,
        EDGE_MARGIN: 20,
        POSITION_DELAY: 50 // Small delay for DOM calculations
    };

    // Toast management system
    class ToastManager {
        constructor() {
            this.toasts = new Map();
            this.container = this.createContainer();
            this.setupEventListeners();
            this.toastCounter = 0;
            this.positionQueue = [];
            this.isPositioning = false;
        }

        createContainer() {
            let container = document.querySelector('.toast-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'toast-container';
                container.style.cssText = `
                    position: fixed;
                    top: 0;
                    right: 0;
                    z-index: 9999;
                    pointer-events: none;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                `;
                document.body.appendChild(container);
            }
            return container;
        }

        setupEventListeners() {
            // Button click handlers
            document.querySelectorAll('.show-toast').forEach(button => {
                button.addEventListener('click', (e) => {
                    const toastId = button.getAttribute('data-toast');
                    if (toastId) {
                        this.showToast(toastId);
                    }
                });
            });

            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey) {
                    e.preventDefault();
                    switch(e.key) {
                        case '1': this.showToast('glass-1'); break;
                        case '2': this.showToast('royalty-1'); break;
                        case '3': this.showToast('neon-1'); break;
                        case '4': this.showToast('cartoon-1'); break;
                    }
                }
                
                // Escape key to close latest toast
                if (e.key === 'Escape') {
                    this.closeLatestToast();
                }
            });

            // Touch/swipe support
            this.setupTouchHandlers();

            // Window resize handler for repositioning
            window.addEventListener('resize', () => {
                this.repositionAllToasts();
            });
        }

        setupTouchHandlers() {
            let touchStartY = 0;
            let touchStartX = 0;

            this.container.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                touchStartY = touch.clientY;
                touchStartX = touch.clientX;
            }, { passive: true });

            this.container.addEventListener('touchend', (e) => {
                if (!e.changedTouches.length) return;
                
                const touch = e.changedTouches[0];
                const deltaY = touchStartY - touch.clientY;
                const deltaX = touch.clientX - touchStartX;
                
                // Swipe up to close (minimum 50px)
                if (deltaY > 50 && Math.abs(deltaX) < 100) {
                    const toast = e.target.closest('.toast');
                    if (toast) {
                        const toastId = toast.dataset.toastId;
                        if (toastId) {
                            this.closeToast(toastId);
                        }
                    }
                }
                
                // Swipe right to close (minimum 100px)
                if (deltaX > 100 && Math.abs(deltaY) < 50) {
                    const toast = e.target.closest('.toast');
                    if (toast) {
                        const toastId = toast.dataset.toastId;
                        if (toastId) {
                            this.closeToast(toastId);
                        }
                    }
                }
            }, { passive: true });
        }

        async showToast(toastId) {
            try {
                // Manage queue before showing new toast
                this.manageQueue();

                const templateToast = document.getElementById(`toast-${toastId}`);
                if (!templateToast) {
                    console.error(`Toast template with ID toast-${toastId} not found`);
                    return;
                }

                // Create unique instance
                const instanceId = `${toastId}-${++this.toastCounter}`;
                const toastClone = this.createToastInstance(templateToast, instanceId);
                
                // Store reference
                this.toasts.set(instanceId, {
                    element: toastClone,
                    type: this.getToastType(toastClone),
                    createdAt: Date.now(),
                    positioned: false
                });

                // Initial positioning (off-screen)
                toastClone.style.cssText += `
                    position: fixed;
                    right: -400px;
                    top: ${CONFIG.EDGE_MARGIN}px;
                    pointer-events: auto;
                    z-index: 10000;
                    max-width: 350px;
                    width: auto;
                `;

                // Add to container
                this.container.appendChild(toastClone);

                // Wait for DOM to settle, then position properly
                await this.positionToast(instanceId);

                // Activate toast with animation
                requestAnimationFrame(() => {
                    toastClone.classList.add('active');
                    this.addSpecialAnimations(toastClone);
                });

                // Setup auto-close
                this.setupAutoClose(instanceId);

                // Add accessibility
                this.addAccessibility(toastClone);

            } catch (error) {
                console.error('Error showing toast:', error);
            }
        }

        async positionToast(instanceId) {
            return new Promise((resolve) => {
                // Add to position queue
                this.positionQueue.push(() => {
                    const toast = this.toasts.get(instanceId);
                    if (!toast) return resolve();

                    const { element } = toast;
                    
                    // Force layout calculation
                    element.offsetHeight;
                    
                    // Calculate position
                    const position = this.calculateToastPosition(element);
                    
                    // Apply position
                    element.style.right = `${CONFIG.EDGE_MARGIN}px`;
                    element.style.top = `${position.top}px`;
                    
                    // Mark as positioned
                    toast.positioned = true;
                    
                    resolve();
                });

                // Process queue
                this.processPositionQueue();
            });
        }

        processPositionQueue() {
            if (this.isPositioning || this.positionQueue.length === 0) return;

            this.isPositioning = true;
            
            setTimeout(() => {
                const positionFn = this.positionQueue.shift();
                if (positionFn) {
                    positionFn();
                }
                
                this.isPositioning = false;
                
                // Process next in queue
                if (this.positionQueue.length > 0) {
                    this.processPositionQueue();
                }
            }, CONFIG.POSITION_DELAY);
        }

        calculateToastPosition(toastElement) {
            let totalHeight = CONFIG.EDGE_MARGIN;
            
            // Get all positioned toasts ordered by creation time
            const positionedToasts = Array.from(this.toasts.values())
                .filter(toast => toast.positioned && toast.element !== toastElement)
                .sort((a, b) => a.createdAt - b.createdAt);
            
            // Calculate cumulative height
            positionedToasts.forEach(toast => {
                if (toast.element.offsetHeight > 0) {
                    totalHeight += toast.element.offsetHeight + CONFIG.TOAST_GAP;
                }
            });

            // Ensure toast stays within viewport
            const viewportHeight = window.innerHeight;
            const toastHeight = toastElement.offsetHeight || 100; // Fallback height
            const maxTop = viewportHeight - toastHeight - CONFIG.EDGE_MARGIN;
            
            const finalTop = Math.min(totalHeight, maxTop);
            
            return { top: finalTop };
        }

        repositionAllToasts() {
            const activeToasts = Array.from(this.toasts.values())
                .filter(toast => toast.positioned)
                .sort((a, b) => a.createdAt - b.createdAt);
            
            let currentTop = CONFIG.EDGE_MARGIN;
            
            activeToasts.forEach(toast => {
                toast.element.style.top = `${currentTop}px`;
                currentTop += toast.element.offsetHeight + CONFIG.TOAST_GAP;
            });
        }

        createToastInstance(template, instanceId) {
            const clone = template.cloneNode(true);
            clone.id = ''; // Remove template ID
            clone.dataset.toastId = instanceId;
            
            // Setup close button
            const closeBtn = clone.querySelector('.toast-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeToast(instanceId);
                });
            }

            return clone;
        }

        getToastType(toastElement) {
            if (toastElement.classList.contains('glass-toast')) return 'glass';
            if (toastElement.classList.contains('royalty-toast')) return 'royalty';
            if (toastElement.classList.contains('neon-toast')) return 'neon';
            if (toastElement.classList.contains('cartoon-toast')) return 'cartoon';
            return 'default';
        }

        addSpecialAnimations(toastElement) {
            const type = this.getToastType(toastElement);
            
            // Clear any existing animations first
            toastElement.style.animation = 'none';
            
            // Force reflow
            toastElement.offsetHeight;
            
            switch(type) {
                case 'royalty':
                    toastElement.style.animation = 'royalEntrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    break;
                case 'neon':
                    toastElement.style.animation = 'neonGlitch 0.6s ease-out';
                    break;
                case 'cartoon':
                    toastElement.style.animation = 'cartoonBounce 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    break;
                default:
                    toastElement.style.animation = 'slideInFromRight 0.4s ease-out';
                    break;
            }
        }

        setupAutoClose(instanceId) {
            const toast = this.toasts.get(instanceId);
            if (!toast) return;

            const delay = CONFIG.AUTO_CLOSE_DELAYS[toast.type] || CONFIG.AUTO_CLOSE_DELAYS.default;
            
            toast.autoCloseTimeout = setTimeout(() => {
                if (this.toasts.has(instanceId)) {
                    this.closeToast(instanceId);
                }
            }, delay);
        }

        closeToast(instanceId) {
            const toast = this.toasts.get(instanceId);
            if (!toast) return;

            const { element, type, autoCloseTimeout } = toast;
            
            // Clear auto-close timeout
            if (autoCloseTimeout) {
                clearTimeout(autoCloseTimeout);
            }
            
            // Add removing class for animation
            element.classList.add('removing');
            
            // Apply exit animation based on type
            element.style.animation = 'slideOutToRight 0.3s ease-in forwards';

            // Remove after animation and reposition remaining toasts
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
                this.toasts.delete(instanceId);
                
                // Reposition remaining toasts
                this.repositionAllToasts();
            }, CONFIG.REMOVE_ANIMATION_DURATION);
        }

        closeLatestToast() {
            if (this.toasts.size === 0) return;
            
            let latestToast = null;
            let latestTime = 0;
            
            for (const [id, toast] of this.toasts) {
                if (toast.createdAt > latestTime) {
                    latestTime = toast.createdAt;
                    latestToast = id;
                }
            }
            
            if (latestToast) {
                this.closeToast(latestToast);
            }
        }

        manageQueue() {
            if (this.toasts.size >= CONFIG.MAX_TOASTS) {
                // Remove oldest toast
                let oldestToast = null;
                let oldestTime = Infinity;
                
                for (const [id, toast] of this.toasts) {
                    if (toast.createdAt < oldestTime) {
                        oldestTime = toast.createdAt;
                        oldestToast = id;
                    }
                }
                
                if (oldestToast) {
                    this.closeToast(oldestToast);
                }
            }
        }

        addAccessibility(toastElement) {
            toastElement.setAttribute('role', 'alert');
            toastElement.setAttribute('aria-live', 'polite');
            toastElement.setAttribute('tabindex', '0');
            
            // Focus management for keyboard users
            const closeBtn = toastElement.querySelector('.toast-close');
            if (closeBtn) {
                closeBtn.setAttribute('aria-label', 'Close notification');
            }
        }

        // Public methods for external use
        closeAll() {
            for (const id of this.toasts.keys()) {
                this.closeToast(id);
            }
        }

        getActiveCount() {
            return this.toasts.size;
        }

        getToastById(instanceId) {
            return this.toasts.get(instanceId);
        }
    }

    // Initialize toast manager
    window.toastManager = new ToastManager();

    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes royalEntrance {
            0% {
                transform: translateX(100%) scale(0.8);
                opacity: 0;
                filter: blur(5px);
            }
            50% {
                transform: translateX(-10px) scale(1.05);
                filter: blur(2px);
            }
            100% {
                transform: translateX(0) scale(1);
                opacity: 1;
                filter: blur(0);
            }
        }

        @keyframes neonGlitch {
            0% {
                transform: translateX(100%) skew(0deg);
                opacity: 0;
                filter: hue-rotate(0deg);
            }
            20% {
                transform: translateX(-15px) skew(-5deg);
                opacity: 0.8;
                filter: hue-rotate(90deg);
            }
            40% {
                transform: translateX(10px) skew(3deg);
                opacity: 1;
                filter: hue-rotate(-90deg);
            }
            60% {
                transform: translateX(-5px) skew(-2deg);
                filter: hue-rotate(45deg);
            }
            100% {
                transform: translateX(0) skew(0deg);
                opacity: 1;
                filter: hue-rotate(0deg);
            }
        }

        @keyframes cartoonBounce {
            0% {
                transform: translateX(100%) scale(0.3) rotate(180deg);
                opacity: 0;
            }
            30% {
                transform: translateX(-20px) scale(1.2) rotate(-10deg);
                opacity: 1;
            }
            50% {
                transform: translateX(15px) scale(0.9) rotate(5deg);
            }
            70% {
                transform: translateX(-8px) scale(1.05) rotate(-2deg);
            }
            90% {
                transform: translateX(3px) scale(0.98) rotate(1deg);
            }
            100% {
                transform: translateX(0) scale(1) rotate(0deg);
                opacity: 1;
            }
        }

        @keyframes slideInFromRight {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutToRight {
            0% {
                transform: translateX(0);
                opacity: 1;
            }
            100% {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        /* Toast positioning fix */
        .toast {
            transition: top 0.3s ease-out;
        }

        .toast.removing {
            pointer-events: none;
        }

        .toast-container {
            overflow: visible !important;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
            .toast {
                max-width: calc(100vw - 40px) !important;
                right: 20px !important;
            }
        }

        @media (max-width: 480px) {
            .toast {
                max-width: calc(100vw - 20px) !important;
                right: 10px !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Debug helper (remove in production)
    window.debugToasts = function() {
        console.log('Active toasts:', window.toastManager.getActiveCount());
        console.log('Toast details:', window.toastManager.toasts);
    };
});