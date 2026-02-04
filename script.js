// Create floating hearts in background
function createBackgroundHearts() {
    const container = document.getElementById('hearts');
    const hearts = ['💕', '💗', '💖', '💓', '💝', '❤️', '💘', '💞'];

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('span');
        heart.className = 'bg-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.animationDuration = (6 + Math.random() * 4) + 's';
        heart.style.fontSize = (15 + Math.random() * 20) + 'px';
        container.appendChild(heart);
    }
}

// Create sparkles in the card
function createSparkles() {
    const container = document.getElementById('sparkles');
    container.innerHTML = ''; // Clean up previous ones
    const sparkleEmojis = ['✨', '💫', '⭐', '🌟'];

    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(sparkle);
    }
}

// Handle envelope click
function setupEnvelope() {
    const envelope = document.getElementById('envelope');
    const envelopeContainer = document.getElementById('envelope-container');
    const cardContainer = document.getElementById('card-container');

    envelope.addEventListener('click', () => {
        // Add opening animation (keyframes in style.css now)
        envelope.style.animation = 'envelopeOpen 0.8s ease forwards';

        // Hide envelope and show card
        setTimeout(() => {
            envelopeContainer.classList.add('hidden');
            cardContainer.classList.add('visible');
            createSparkles();

            // Ensure card is scrolled to top
            window.scrollTo(0, 0);
            if (document.querySelector('.card')) {
                document.querySelector('.card').scrollTop = 0;
            }
        }, 600);
    });
}

// Replay animation
function setupReplay() {
    const replayBtn = document.getElementById('replay');
    const envelopeContainer = document.getElementById('envelope-container');
    const cardContainer = document.getElementById('card-container');
    const envelope = document.getElementById('envelope');

    // Elements to reset
    const celebration = document.getElementById('celebration');
    const questionSection = document.getElementById('question-section');
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');

    replayBtn.addEventListener('click', () => {
        cardContainer.classList.remove('visible');
        cardContainer.style.display = 'none';

        // Reset envelope
        envelope.style.animation = '';
        envelopeContainer.classList.remove('hidden');

        // Reset Card State
        if (celebration) celebration.classList.add('hidden');
        if (questionSection) questionSection.classList.remove('hidden');

        // Reset No Button
        if (noBtn) {
            noBtn.style.display = '';
            noBtn.style.position = ''; // Remove absolute positioning
            noBtn.style.left = '';
            noBtn.style.top = '';
            if (noBtn.parentElement !== document.querySelector('.buttons-container')) {
                document.querySelector('.buttons-container').appendChild(noBtn);
            }
            noBtn.textContent = "Nie 😢";
        }

        // Reset Yes Button Scale
        if (yesBtn) {
            yesBtn.style.transform = '';
            yesBtn.dataset.scale = '1';
        }

        // Clear and recreate sparkles
        const sparkles = document.getElementById('sparkles');
        if (sparkles) sparkles.innerHTML = '';

        // Reset card container for next reveal
        setTimeout(() => {
            cardContainer.style.display = '';
        }, 100);
    });
}

// Create floating heart on click anywhere
function setupClickHearts() {
    document.addEventListener('click', (e) => {
        const heart = document.createElement('span');
        heart.textContent = ['💕', '💗', '💖'][Math.floor(Math.random() * 3)];
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '30px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'clickHeart 1s ease forwards';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    });
}

// Setup the funny question buttons
function setupFunnyButtons() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const questionSection = document.getElementById('question-section');
    const celebration = document.getElementById('celebration');

    const funnyTexts = [
        "Nie? Serio? 😏", "Spróbuj jeszcze! 🏃", "Nope! 💨", "Za wolno! ⚡",
        "Haha! 😂", "Nie tym razem!", "Złap mnie! 😜",
        "Nie ma szans!", "Próbuj dalej! 🎯", "Uparta jesteś! 😤"
    ];

    let textIndex = 0;

    // No button runs away - stays strictly within the card container!
    noBtn.addEventListener('mouseover', () => {
        const cardInner = document.querySelector('.card-inner');

        // First hover: element leaves the flow and becomes absolute in the card context
        if (noBtn.parentElement !== cardInner) {
            noBtn.style.position = 'absolute';
            cardInner.appendChild(noBtn);
        }

        // Button dimensions (dynamic!)
        const btnWidth = noBtn.offsetWidth || 150;
        const btnHeight = noBtn.offsetHeight || 50;

        // Get card dimensions and scroll position
        const card = document.querySelector('.card');
        const cardWidth = card.clientWidth;
        const cardHeight = card.clientHeight;
        const scrollTop = card.scrollTop;

        // Ensure movement stays within visible area roughly
        const margin = 50;
        const minX = margin;
        const maxX = Math.max(margin, cardWidth - btnWidth - margin);
        const minY = scrollTop + margin;
        const maxY = Math.max(minY, scrollTop + cardHeight - btnHeight - margin);

        const randomX = Math.floor(minX + Math.random() * (maxX - minX));
        const randomY = Math.floor(minY + Math.random() * (maxY - minY));

        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '50';
        noBtn.style.minWidth = '150px';

        noBtn.textContent = funnyTexts[textIndex % funnyTexts.length];
        textIndex++;

        // Grow Yes Button
        const currentScale = parseFloat(yesBtn.dataset.scale || 1);
        const newScale = Math.min(currentScale + 0.1, 1.8);
        yesBtn.dataset.scale = newScale;
        yesBtn.style.transform = `scale(${newScale})`;
    });

    // Yes button - Start Celebration!
    yesBtn.addEventListener('click', () => {
        // Hide Question Section COMPLETELY
        questionSection.classList.add('hidden'); // Use CSS class for display:none
        noBtn.style.display = 'none';

        // Show Celebration
        celebration.classList.remove('hidden');

        // Scroll to top of card so content is visible
        document.querySelector('.card').scrollTop = 0;

        // Start Unified Sequence
        startUnifiedCelebration();

        // Confetti effect
        createConfetti();
    });
}

// Unified Celebration Logic (Text + Photos)
function startUnifiedCelebration() {
    const celebTitle = document.querySelector('.celebration-title');
    const celebText = document.querySelector('.celebration-text');
    const bigHeart = document.querySelector('.big-heart');
    const imgLeft = document.getElementById('img-left');
    const imgRight = document.getElementById('img-right');
    const celebrationDiv = document.querySelector('.celebration');

    // Content Arrays
    const textSequence = [
        { title: "No i git! 😎", text: "Wiedziałem że się zgodzisz.", emoji: "😏" },
        { title: "A co jak bym był kotem?", text: "Nadal byś mnie chciała?", emoji: "🐱" },
        { title: "Dobra, dobra...", text: "Nie przymilam się za bardzo?", emoji: "🤔" },
        { title: "Okej, serio teraz", text: "Dziękuję że jesteś 💜", emoji: "🥹" },
        { title: "PS.", text: "Robimy kolację czy zamawiamy?", emoji: "🍕" },
        { title: "Kocham Cię ❤️", text: "(To już koniec, ale możesz klikać dalej!)", emoji: "💕" }
    ];

    const bears = ['bear1.png', 'bear2.png', 'bear3.png'];
    const photos = ['photo1.png', 'photo2.png'];

    // State
    let masterIndex = 0;

    function updateContent() {
        // Update Text
        const textItem = textSequence[masterIndex % textSequence.length];
        celebTitle.textContent = textItem.title;
        celebText.textContent = textItem.text;
        bigHeart.textContent = textItem.emoji;

        // Pop Animation for Text
        celebTitle.style.animation = 'none';
        celebText.style.animation = 'none';
        void celebTitle.offsetWidth; // Trigger reflow
        celebTitle.style.animation = 'popIn 0.4s ease';
        celebText.style.animation = 'popIn 0.4s ease 0.1s both';

        // Update Images with Race Condition Fix
        const bearSrc = bears[masterIndex % bears.length];
        const photoSrc = photos[masterIndex % photos.length];

        if (imgLeft) {
            imgLeft.style.opacity = 0;
            // Set listener BEFORE src
            imgLeft.onload = () => { imgLeft.style.opacity = 1; };
            // Small timeout not strictly needed if listener is first, but keeps transition smooth
            setTimeout(() => {
                imgLeft.src = `assets/${bearSrc}`;
            }, 50);
        }

        if (imgRight) {
            imgRight.style.opacity = 0;
            imgRight.onload = () => { imgRight.style.opacity = 1; };
            setTimeout(() => {
                imgRight.src = `assets/${photoSrc}`;
            }, 50);
        }

        masterIndex++;
    }

    // Initial Show
    updateContent();

    // Global Click Listener on Celebration Container
    celebrationDiv.onclick = (e) => {
        updateContent();
        createExplosionHeart();
    };
}

// Helper: Confetti
function createConfetti() {
    const colors = ['#ff6b9d', '#ffb347', '#a0c4ff', '#9bf6ff', '#fdffb6'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// Helper: Explosion Heart
function createExplosionHeart() {
    // Create a few small hearts bursting
    const colors = ['#f00', '#ff0', '#f0f'];
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('span');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        // Random position near center-ish or random?
        // Let's just make them appear near the cursor? 
        // We lack event object here easily unless passed.
        // Let's just make them appear random on screen for now to save complexity.
        heart.style.left = (Math.random() * 80 + 10) + 'vw';
        heart.style.top = (Math.random() * 80 + 10) + 'vh';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'clickHeart 0.8s ease forwards';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createBackgroundHearts();
    setupEnvelope();
    setupReplay();
    setupClickHearts();
    setupFunnyButtons();
});
