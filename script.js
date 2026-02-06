const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionScreen = document.getElementById('question-screen');
const successScreen = document.getElementById('success-screen');
const container = document.querySelector('.container');

let yesScale = 1;

// Function to move the "No" button
function moveNoBtn() {
    // Move button to body to avoid container clipping/overflow issues
    if (noBtn.parentNode !== document.body) {
        document.body.appendChild(noBtn);
    }

    // Make sure the button has absolute/fixed positioning to move freely
    noBtn.style.position = 'fixed';
    
    // Calculate available space
    const maxWidth = window.innerWidth - noBtn.offsetWidth;
    const maxHeight = window.innerHeight - noBtn.offsetHeight;
    
    // Generate random coordinates
    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;
    
    // Apply new position
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Grow the "Yes" button
    yesScale += 3.0; // Ultra gradual growth
    yesBtn.style.transform = `scale(${yesScale})`;
}

// Event listeners for "No" button
noBtn.addEventListener('mouseover', moveNoBtn);
noBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent click if they somehow manage to click it
    moveNoBtn();
});
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent default touch behavior
    moveNoBtn();
});

// Event listener for "Yes" button
yesBtn.addEventListener('click', () => {
    // Hide question, show success
    questionScreen.classList.add('hidden');
    successScreen.classList.remove('hidden');
    
    // Explicitly hide the No button since it might be attached to body now
    noBtn.style.display = 'none';
    
    // Add goofy effects
    document.body.classList.add('goofy-mode');
    document.querySelector('h1').classList.add('shake-it');
    
    // Trigger confetti
    launchConfetti();
    
    // Launch more confetti periodically for a short time
    let duration = 3000;
    let end = Date.now() + duration;

    (function frame() {
        // Only fire occasionally to save performance
        if (Math.random() < 0.3) { 
             confetti({
                particleCount: 30,
                spread: 50,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
            });
        }
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});

function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
    });
}
