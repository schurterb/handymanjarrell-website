// Toggle mobile menu
function toggleMenu() {
    const overlay = document.getElementById('menuOverlay');
    overlay.classList.toggle('active');
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}



// Testimonials slider functionality
let currentTestimonialIndex = 0;
const testimonialsPerView = 3;

function slideTestimonials(direction) {
    const track = document.getElementById('testimonialsTrack');
    const testimonials = track.children;
    const totalTestimonials = testimonials.length;
    const maxIndex = Math.max(0, totalTestimonials - testimonialsPerView);
    
    currentTestimonialIndex += direction;
    
    // Wrap around logic
    if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = maxIndex;
    } else if (currentTestimonialIndex > maxIndex) {
        currentTestimonialIndex = 0;
    }
    
    // Calculate transform
    const cardWidth = 280; // min-width of testimonial card
    const gap = 32; // 2rem gap in pixels
    const translateX = currentTestimonialIndex * (cardWidth + gap);
    
    track.style.transform = `translateX(-${translateX}px)`;
    
    // Update arrow states
    updateArrowStates(totalTestimonials);
}

function updateArrowStates(totalTestimonials) {
    const leftArrow = document.querySelector('.slider-arrow-left');
    const rightArrow = document.querySelector('.slider-arrow-right');
    const maxIndex = Math.max(0, totalTestimonials - testimonialsPerView);
    
    // Enable/disable arrows based on position
    leftArrow.disabled = currentTestimonialIndex === 0;
    rightArrow.disabled = currentTestimonialIndex >= maxIndex;
}

// Handle page initialization
document.addEventListener('DOMContentLoaded', function() {

    // Add active navigation highlighting
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Call once on load
    
    // Initialize testimonials slider
    updateArrowStates(document.getElementById('testimonialsTrack').children.length);
});
