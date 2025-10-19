/*
  --- Scroll Animation Logic ---
  * Description: Uses the Intersection Observer API to add a 'visible' class to sections when they enter the viewport.
  * This triggers the CSS animations defined in styles.css.
*/

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // We can unobserve the element after it has become visible
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    const setParticleTheme = () => {
        if (body.classList.contains('light-mode')) {
            // Light mode particle colors
            initParticles('#007bff', '#6f42c1');
        } else {
            // Dark mode particle colors
            initParticles('#00f7ff', '#8a2be2');
        }
    };

    // On page load, check for a saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        // Save the user's preference
        // Save the user's preference and update particles
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.removeItem('theme');
        }
        setParticleTheme();
    });

    // Initial particle load
    setParticleTheme();
});

/* 
  --- Particles.js Configuration ---
  * Description: Initializes the animated background with a custom configuration.
  * Colors are synced with the CSS variables for a cohesive theme.
  * Colors are passed as arguments for theme switching.
*/
function initParticles(particleColor, lineColor) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": particleColor },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": lineColor, "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_opacity": 1 },
                "push": { "particles_nb": 4 }
            }
        }
    }, "retina_detect": true
    });
}