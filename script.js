
// ===== SMOOTH SCROLL FUNCTIONALITY =====
document.getElementById('getStartedBtn').addEventListener('click', function () {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth'
    });
});

// ===== MODAL FUNCTIONALITY =====
const modal = document.getElementById('demoModal');
const watchDemoBtn = document.getElementById('watchDemoBtn');
const closeBtn = document.querySelector('.close');

watchDemoBtn.addEventListener('click', function () {
    modal.classList.add('show');
});

closeBtn.addEventListener('click', function () {
    modal.classList.remove('show');
});

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// ===== SCROLL-TRIGGERED ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => observer.observe(title));

// Observe feature cards with staggered animation
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(card);
});

// Observe workflow steps
const workflowSteps = document.querySelectorAll('.workflow-step');
workflowSteps.forEach((step, index) => {
    step.style.transitionDelay = `${index * 0.3}s`;
    observer.observe(step);
});

// ===== ANIMATED COUNTERS FOR STATS =====
const statNumbers = document.querySelectorAll('.stat-number');
const animateCounter = (element, target) => {
    const increment = target / 100;
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toString().includes('K') ? target :
                target.toString().includes('M') ? target :
                    target.toString().includes('%') ? target : target + '+';
            clearInterval(timer);
        } else {
            const displayValue = Math.floor(current);
            element.textContent = displayValue.toString().includes('K') ? displayValue + 'K+' :
                displayValue.toString().includes('M') ? displayValue + 'M+' :
                    displayValue.toString().includes('%') ? displayValue + '%' : displayValue + '+';
        }
    }, 30);
};

// Animate counters when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCards = entry.target.querySelectorAll('.stat-card');
            statCards.forEach((card, index) => {
                setTimeout(() => {
                    const numberElement = card.querySelector('.stat-number');
                    const originalText = numberElement.textContent;

                    // Extract number and suffix
                    let targetNumber;
                    if (originalText.includes('K')) {
                        targetNumber = parseInt(originalText.replace('K+', ''));
                        animateCounter(numberElement, targetNumber);
                    } else if (originalText.includes('M')) {
                        targetNumber = parseInt(originalText.replace('M+', ''));
                        animateCounter(numberElement, targetNumber);
                    } else if (originalText.includes('%')) {
                        targetNumber = parseInt(originalText.replace('%', ''));
                        animateCounter(numberElement, targetNumber);
                    }
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== PAUSE CAROUSEL ON HOVER =====
const reviewsTrack = document.querySelector('.reviews-track');
const reviewsCarousel = document.querySelector('.reviews-carousel');

if (reviewsCarousel && reviewsTrack) {
    reviewsCarousel.addEventListener('mouseenter', () => {
        reviewsTrack.style.animationPlayState = 'paused';
    });

    reviewsCarousel.addEventListener('mouseleave', () => {
        reviewsTrack.style.animationPlayState = 'running';
    });
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function () {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'white';
    navLinks.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    navLinks.style.padding = '1rem';
});

// ===== ADDITIONAL INTERACTIVE EFFECTS =====

// Parallax effect for hero section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page loads
window.addEventListener('load', function () {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            typeWriter(heroTitle, 'Evaluate Subjective Answers Instantly with AI');
        }
    }, 1000);
});

// Add floating animation to feature icons
featureCards.forEach((card, index) => {
    const icon = card.querySelector('.feature-icon');
    if (icon) {
        icon.style.animation = `float 3s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.5}s`;
    }
});

// Add pulse effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.animation = 'pulse 0.6s ease-in-out';
    });

    button.addEventListener('animationend', function () {
        this.style.animation = '';
    });
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
document.head.appendChild(style);

// ===== EASTER EGG: KONAMI CODE =====
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', function (e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 10000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
document.head.appendChild(rainbowStyle);
