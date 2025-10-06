// This function runs when the entire webpage has been loaded,
// preventing errors from scripts running before the page is ready.
document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // When the hamburger icon is clicked, toggle the 'active' class on both
    // the hamburger and the navigation links to show/hide the menu.
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close the mobile menu when any of the navigation links are clicked.
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // --- Dynamic Typing Effect ---
    const typingElement = document.getElementById('typing-effect');
    const words = ["Web Developer.", "Java Developer.", "Creative Thinker."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        // Check if the typing element exists on the page.
        if (typingElement) {
            const currentWord = words[wordIndex];
            
            // If deleting, shorten the string; if typing, lengthen it.
            const currentChars = isDeleting 
                ? currentWord.substring(0, charIndex - 1)
                : currentWord.substring(0, charIndex + 1);

            typingElement.textContent = currentChars;
            
            if (!isDeleting && currentChars.length === currentWord.length) {
                // If the word is fully typed, pause, then start deleting.
                isDeleting = true;
                setTimeout(type, 1200);
            } else if (isDeleting && currentChars.length === 0) {
                // If the word is fully deleted, move to the next word and start typing.
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                // Continue typing or deleting the next character.
                charIndex = currentChars.length;
                const typingSpeed = isDeleting ? 50 : 100;
                setTimeout(type, typingSpeed);
            }
        }
    }
    type(); // Start the animation.

    // --- Fade-in Animation on Scroll ---
    // This uses the Intersection Observer API for better performance than scroll events.
    const sections = document.querySelectorAll('.content-section');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // If the section is on the screen (is intersecting), add the 'visible' class.
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible.
    });

    // Tell the observer to watch each of our sections.
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Certificate Modal (Lightbox) Logic ---
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const certificateImages = document.querySelectorAll('.certificate-card img');
    const closeModal = document.querySelector('.modal-close');

    // Add a click event to each certificate image.
    certificateImages.forEach(img => {
        img.addEventListener('click', () => {
            if (modal && modalImg) {
                modal.style.display = 'block'; // Show the modal.
                modalImg.src = img.src; // Set the modal image source to the clicked image.
            }
        });
    });

    // When the 'x' close button is clicked, hide the modal.
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }
    
    // Also hide the modal if the user clicks the dark background area.
    window.addEventListener('click', (event) => {
        if (event.target == modal && modal) {
            modal.style.display = 'none';
        }
    });

});