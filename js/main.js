// ===================================================================
// ===         LCCH Club Website - Final Consolidated JS           ===
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dark Mode Toggle ---
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Responsive Mobile Menu Toggle ---
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // --- Typing Animation ---
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const phrases = [
            'Learn Data Structures & Algorithms',
            'Master Competitive Programming',
            'Crack Technical Interviews',
            'Join Exciting Hackathons',
            'Grow Your Coding Skills'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            let typingDelay = 100;

            if (isDeleting) {
                charIndex--;
                typingDelay = 30;
            } else {
                charIndex++;
                typingDelay = 80;
            }
            typingText.textContent = currentPhrase.substring(0, charIndex);

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingDelay = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            setTimeout(typeEffect, typingDelay);
        }
        typeEffect(); // Start the animation
    }

    // --- Countdown Timer ---
    const targetDate = new Date("October 4, 2025 17:04:00").getTime();
    const daysEl = document.getElementById('days');

    if (daysEl) { // Only run the timer if the timer elements exist on the page
        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

if (distance < 0) {
    clearInterval(countdownInterval);
    document.querySelector('.timer').innerHTML = '<p class="event-started">The event has started!</p>';

    // --- NEW LOGIC ---
    const joinButton = document.getElementById('join-event-btn');
    if (joinButton) {
        joinButton.classList.remove('disabled');
    }
    // --- END NEW LOGIC ---
    return;
}

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }, 1000);
    }

    // --- Smooth Scrolling for All Anchor Links ---
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});