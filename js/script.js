document.addEventListener('DOMContentLoaded', () => {
    // ---- Header scroll effect ----
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });

    // ---- Mobile menu toggle ----
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu on nav link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---- Scroll reveal (IntersectionObserver) ----
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.05
        });

        revealElements.forEach(el => observer.observe(el));

        // Fallback: force-show all elements after 2.5s if observer didn't fire
        setTimeout(() => {
            revealElements.forEach(el => {
                if (!el.classList.contains('is-visible')) {
                    el.classList.add('is-visible');
                }
            });
        }, 2500);
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerOffset = header.offsetHeight + 16;
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
});
