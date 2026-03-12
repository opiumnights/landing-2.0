/* ============================================
   Mental Manager Landing Page — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Navbar scroll effect --- */
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    /* --- Floating Telegram Button - Show after scroll --- */
    const floatingTelegram = document.querySelector('.floating-telegram');
    const SHOW_AFTER_PX = 400;

    const handleFloatingTelegram = () => {
        if (floatingTelegram) {
            if (window.scrollY > SHOW_AFTER_PX) {
                floatingTelegram.classList.add('visible');
            } else {
                floatingTelegram.classList.remove('visible');
            }
        }
    };

    window.addEventListener('scroll', handleFloatingTelegram, { passive: true });

    /* --- Mobile burger menu --- */
    const burger = document.getElementById('navBurger');
    const navLinks = document.getElementById('navLinks');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* --- Scroll Reveal --- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* --- Counter Animation --- */
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const duration = 2000;
                const start = performance.now();

                const animate = (now) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(target * eased);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };

                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));

    /* --- Pricing Toggle --- */
    const toggle = document.getElementById('pricingToggle');
    const toggleLabels = document.querySelectorAll('.toggle-label');

    if (toggle) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            const isYearly = toggle.classList.contains('active');

            toggleLabels.forEach(label => {
                const period = label.dataset.period;
                if ((period === 'yearly' && isYearly) || (period === 'monthly' && !isYearly)) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });

            // Update prices with count-up animation
            document.querySelectorAll('.price-amount[data-monthly]').forEach(el => {
                const targetPrice = isYearly ? parseInt(el.dataset.yearly) : parseInt(el.dataset.monthly);
                const currentPrice = parseInt(el.textContent);
                const duration = 500;
                const startTime = performance.now();
                
                function animateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (ease-out)
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    
                    const currentValue = Math.round(currentPrice + (targetPrice - currentPrice) * easeOut);
                    el.textContent = currentValue;
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateCount);
                    }
                }
                
                requestAnimationFrame(animateCount);
            });
        });
    }

    /* --- Smooth scroll for anchor links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* --- CTA form --- */
    const ctaForm = document.getElementById('ctaForm');
    if (ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = ctaForm.querySelector('.cta-input');
            if (input && input.value) {
                const btn = ctaForm.querySelector('.btn');
                btn.innerHTML = '<span>Готово!</span>';
                btn.style.pointerEvents = 'none';
                input.value = '';
                setTimeout(() => {
                    btn.innerHTML = 'Получить доступ <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                    btn.style.pointerEvents = '';
                }, 2500);
            }
        });
    }

    /* --- Parallax effect on hero phone --- */
    const phoneFrame = document.querySelector('.phone-frame');
    if (phoneFrame && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            phoneFrame.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 10}px) rotate(${x * 0.15}deg) perspective(1000px) rotateX(${-y * 0.3}deg) rotateY(${x * 0.3}deg)`;
        });
    }

    /* --- Tilt effect on feature cards --- */
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;
            card.style.transform = `translateY(-4px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* --- Active nav link highlighting --- */
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    const highlightNav = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    /* --- Typing effect for hero --- */
    const titleGradient = document.querySelector('.title-gradient');
    if (titleGradient) {
        const originalText = titleGradient.textContent;
        titleGradient.textContent = '';
        titleGradient.style.borderRight = '2px solid var(--blue)';

        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < originalText.length) {
                titleGradient.textContent += originalText[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    titleGradient.style.borderRight = 'none';
                }, 1000);
            }
        }, 60);
    }

});
