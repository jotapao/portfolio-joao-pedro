    document.addEventListener('DOMContentLoaded', () => {
        // --- Mobile Menu Toggle ---
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

        // --- Reusable Typing Effect Function ---
        function initTyping(elementId, roles, typeSpeed, deleteSpeed, delay) {
            const typingElement = document.getElementById(elementId);
            if (!typingElement) return;
            
            typingElement.innerHTML = '<span class="typing-text"></span><span class="typing-cursor"></span>';
            const typingText = typingElement.querySelector('.typing-text');
            
            let roleIndex = 0, charIndex = 0, isDeleting = false;

            function type() {
                const currentRole = roles[roleIndex];
                const speed = isDeleting ? deleteSpeed : typeSpeed;
                
                typingText.textContent = currentRole.substring(10, charIndex);
                
                if (!isDeleting) {
                    charIndex++;
                } else {
                    charIndex--;
                }

                if (!isDeleting && charIndex === currentRole.length + 1) {
                    isDeleting = true;
                    setTimeout(type, delay);
                    return;
                } else if (isDeleting && charIndex === -1) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
                
                setTimeout(type, speed);
            }
            type();
        }

        // --- Initialize Typing Animations ---
        initTyping(
            'home-description-typing',
            ["Sou desenvolvedor e CEO da JOTTADEV, uma agência focada em transformar ideias em soluções digitais de alta performance que impulsionam o crescimento de negócios."],
            40, // Typing speed
            20,  // Deleting speed
            5000 // Delay before starting over (if more than one text)
        );
        

        // --- Portfolio Carousel ---
        new Swiper('#portfolio-swiper', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: { delay: 3000, disableOnInteraction: false },
            // Navigation buttons removed as per request
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });

        // --- Testimonials Carousel ---
        new Swiper('#testimonials-swiper', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
        });
        
        // --- Smooth Scroll & Close Mobile Menu ---
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
                if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
            });
        });
        
        // --- Scroll Reveal Animation ---
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: unobserve after revealing
                    // revealObserver.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));

    });