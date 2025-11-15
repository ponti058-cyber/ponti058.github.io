// Confetti animation
function createConfetti() {
    const colors = ['#FFD700', '#7A0019', '#FFFFFF']; // Gold, Maroon, White - UMD colors
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const size = Math.random() * 10 + 5; // Random size between 5-15px
        
        confetti.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            opacity: ${Math.random()};
            transform: rotate(${Math.random() * 360}deg);
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(confetti);
        
        // Animate the confetti
        const animation = confetti.animate([
            {
                transform: `translate(0, 0) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translate(${Math.random() * 400 - 200}px, ${window.innerHeight}px) rotate(${Math.random() * 1000}deg)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 2000 + 2000, // Random duration between 2-4 seconds
            easing: 'linear'
        });
        
        // Remove confetti element after animation
        animation.onfinish = () => confetti.remove();
    }
}

// Function to start the celebration - expose as startConfetti for the game
window.startConfetti = function() {
    createConfetti();
    // Create multiple waves of confetti
    let waves = 3;
    let currentWave = 1;
    
    const interval = setInterval(() => {
        if (currentWave < waves) {
            createConfetti();
            currentWave++;
        } else {
            clearInterval(interval);
        }
    }, 1000);
};