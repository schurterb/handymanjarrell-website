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
    
    // Initialize contact form functionality
    setupContactForm();
});

// Contact form functionality
function setupContactForm() {
    // Get modal elements
    const contactButton = document.getElementById('contact-button');
    const contactModal = document.getElementById('contact-modal');
    const closeButton = document.querySelector('.close-button');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Initialize EmailJS
    emailjs.init('YgBc_cQ0FjU5dwnUm'); // EmailJS public key

    // Open modal when contact button is clicked
    if (contactButton) {
        contactButton.addEventListener('click', () => {
            contactModal.style.display = 'block';
        });
    }

    // Close modal when close button is clicked
    if (closeButton) {
        // Use mousedown instead of click for better responsiveness
        closeButton.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Prevent any default behavior
            console.log('Close button clicked');
            contactModal.style.display = 'none';
            formStatus.style.display = 'none';
            formStatus.className = 'form-status';
            contactForm.reset();
        });
        
        // Also keep click event for accessibility
        closeButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default behavior
            console.log('Close button clicked (click event)');
            contactModal.style.display = 'none';
            formStatus.style.display = 'none';
            formStatus.className = 'form-status';
            contactForm.reset();
        });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            contactModal.style.display = 'none';
            formStatus.style.display = 'none';
            formStatus.className = 'form-status';
            contactForm.reset();
        }
    });

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const buttonText = submitButton.querySelector('.button-text');
            const buttonIcon = submitButton.querySelector('.button-icon');
            const originalButtonText = buttonText.textContent;
            
            buttonText.textContent = 'Sending...';
            buttonIcon.textContent = '⟳';
            buttonIcon.classList.add('spinning');
            submitButton.disabled = true;
            
            // Get form data
            const formData = {
                name: contactForm.elements.name.value,
                email: contactForm.elements.email.value,
                subject: contactForm.elements.subject.value,
                message: contactForm.elements.message.value
            };
            
            // Send email using EmailJS
            emailjs.send('service_vxl1dqt', 'template_2vvld6l', formData)
                .then(() => {
                    // Success
                    formStatus.textContent = 'Your message has been sent successfully!';
                    formStatus.className = 'form-status success';
                    formStatus.style.display = 'block';
                    contactForm.reset();
                    
                    // Reset button
                    buttonText.textContent = originalButtonText;
                    buttonIcon.textContent = '→';
                    buttonIcon.classList.remove('spinning');
                    submitButton.disabled = false;
                    
                    // Close modal after a delay
                    setTimeout(() => {
                        contactModal.style.display = 'none';
                        formStatus.style.display = 'none';
                    }, 3000);
                })
                .catch((error) => {
                    // Error
                    console.error('Error sending email:', error);
                    formStatus.textContent = 'Failed to send message. Please try again later.';
                    formStatus.className = 'form-status error';
                    formStatus.style.display = 'block';
                    
                    // Reset button
                    buttonText.textContent = originalButtonText;
                    buttonIcon.textContent = '→';
                    buttonIcon.classList.remove('spinning');
                    submitButton.disabled = false;
                });
        });
    }
}
