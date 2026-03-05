document.addEventListener('DOMContentLoaded', () => {
    // ---- Header scroll effect ----
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });

    // ---- Force mobile logo swap via JS ----
    function handleMobileLogo() {
        const desktopLogo = document.querySelector('.logo-desktop');
        const mobileLogo = document.querySelector('.logo-mobile');
        if (!desktopLogo || !mobileLogo) return;

        if (window.innerWidth <= 768) {
            desktopLogo.style.display = 'none';
            mobileLogo.style.display = 'flex';
            mobileLogo.style.alignItems = 'center';
            // Force the image inside mobile logo
            const mobileImg = mobileLogo.querySelector('img');
            if (mobileImg) {
                mobileImg.style.width = '150px';
                mobileImg.style.height = '50px';
                mobileImg.style.maxHeight = 'none';
                mobileImg.style.objectFit = 'contain';
            }
        } else {
            desktopLogo.style.display = '';
            mobileLogo.style.display = 'none';
        }
    }
    handleMobileLogo();
    window.addEventListener('resize', handleMobileLogo);

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
