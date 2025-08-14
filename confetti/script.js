document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('light-mode');
    });

    // --- Confetti Buttons ---
    const multiTriggerBtn = document.getElementById('multi-trigger-btn');
    const fireworksBtn = document.getElementById('fireworks-btn');
    const sideBurstBtn = document.getElementById('side-burst-btn');
    const rainBtn = document.getElementById('rain-btn');
    const rocketBtn = document.getElementById('rocket-btn'); // New
    const starfieldBtn = document.getElementById('starfield-btn'); // New
    
    // --- Button 1: Multi-Trigger ---
    if (multiTriggerBtn) {
        multiTriggerBtn.addEventListener('click', () => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }));
        let hoverInterval;
        multiTriggerBtn.addEventListener('mouseenter', () => {
            hoverInterval = setInterval(() => confetti({ particleCount: 2, spread: 30, origin: { x: Math.random(), y: Math.random() - 0.2 }, scalar: 0.6 }), 100);
        });
        multiTriggerBtn.addEventListener('mouseleave', () => clearInterval(hoverInterval));
        let pressTimer;
        multiTriggerBtn.addEventListener('mousedown', () => {
            pressTimer = setTimeout(() => confetti({ particleCount: 250, spread: 360, startVelocity: 30, origin: { y: 0.5 }, decay: 0.9 }), 800);
        });
        const clearPressTimer = () => clearTimeout(pressTimer);
        multiTriggerBtn.addEventListener('mouseup', clearPressTimer);
        multiTriggerBtn.addEventListener('mouseleave', clearPressTimer);
    }

    // --- Button 2: Fireworks ---
    if (fireworksBtn) {
        fireworksBtn.addEventListener('click', () => {
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            const randomInRange = (min, max) => Math.random() * (max - min) + min;
            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);
                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
        });
    }

    // --- Button 3: Side Burst ---
    if (sideBurstBtn) {
        sideBurstBtn.addEventListener('click', () => {
            confetti({ particleCount: 150, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } });
            confetti({ particleCount: 150, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } });
        });
    }

    // --- Button 4: Confetti Rain ---
    if (rainBtn) {
        rainBtn.addEventListener('click', () => {
            const duration = 8 * 1000;
            const animationEnd = Date.now() + duration;
            let skew = 1;
            (function frame() {
                const timeLeft = animationEnd - Date.now();
                const ticks = Math.max(200, 500 * (timeLeft / duration));
                skew = Math.max(0.8, skew - 0.001);
                confetti({ particleCount: 1, startVelocity: 0, ticks, origin: { x: Math.random(), y: (Math.random() * skew) - 0.2 }, gravity: 0.5, scalar: 1.2, shapes: ['circle', 'square'], colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']});
                if (timeLeft > 0) requestAnimationFrame(frame);
            }());
        });
    }

    // --- Button 5: Rocket Launch ---
    if (rocketBtn) {
        rocketBtn.addEventListener('click', () => {
            const launchRocket = (x) => {
                // The rocket
                confetti({
                    particleCount: 1,
                    spread: 0,
                    angle: 270,
                    origin: { x: x, y: 1 },
                    ticks: 300,
                    gravity: 0,
                    startVelocity: 60,
                    scalar: 2,
                    shapes: ['circle'],
                    colors: ['#FFFFFF']
                });

                // The explosion
                setTimeout(() => {
                    confetti({
                        particleCount: 100,
                        spread: 120,
                        startVelocity: 45,
                        origin: { x: x, y: 0.2 },
                        decay: 0.92,
                        shapes: ['star'],
                        colors: ['#FFC700', '#FF0000', '#FFFFFF']
                    });
                }, 600); // Time for rocket to travel
            };
            launchRocket(0.25);
            launchRocket(0.5);
            launchRocket(0.75);
        });
    }

    // --- Button 6: Starfield ---
    if (starfieldBtn) {
        starfieldBtn.addEventListener('click', () => {
            const end = Date.now() + (3 * 1000);
            // Go Buckeyes!
            const colors = ['#bb0000', '#ffffff'];

            (function frame() {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.5 },
                    colors: colors
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.5 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        });
    }
});