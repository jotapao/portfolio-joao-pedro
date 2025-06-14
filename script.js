    document.addEventListener('DOMContentLoaded', () => {
        
        // --- LÓGICA DO PRELOADER CORRIGIDA ---
        const preloader = document.getElementById('preloader');
        const mainContent = document.getElementById('main-content');

        setTimeout(() => {
            preloader.classList.add('hidden');
            mainContent.classList.add('loaded');
        }, 3000); // 3 segundos de exibição

        // --- Mobile Menu Toggle ---
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        }

        // --- EFEITO DE DIGITAÇÃO CORRIGIDO ---
        const typingElement = document.querySelector("#home-description-typing .typing-text");
        if(typingElement) {
            const text = "Idealizador e CEO da JOTTADEV, uma agência focada em transformar ideias em soluções digitais de alta performance que impulsionam o crescimento de negócios.";
            let index = 0;
            typingElement.innerHTML = ''; // Limpa o conteúdo antes de começar
            
            function type() {
                if (index < text.length) {
                    // Define o conteúdo usando substring para evitar duplicação
                    typingElement.textContent = text.substring(0, index + 1);
                    index++;
                    setTimeout(type, 40); // Velocidade de digitação
                }
            }
            // Inicia a animação um pouco depois que o site carrega
            setTimeout(type, 3500); 
        }
        
        // --- Carrossel de Portfolio ---
        if (document.getElementById('portfolio-swiper')) {
            new Swiper('#portfolio-swiper', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: { delay: 3000, disableOnInteraction: false },
                breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
            });
        }

        // --- Carrossel de Depoimentos ---
        if (document.getElementById('testimonials-swiper')) {
            new Swiper('#testimonials-swiper', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: { delay: 5000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
            });
        }
        
        // --- Rolagem Suave e Fechar Menu Mobile ---
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                   targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });
        
        // --- Animação de Revelar ao Rolar ---
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    });