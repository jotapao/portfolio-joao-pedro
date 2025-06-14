 // --- FUNÇÃO PARA INICIALIZAR TODOS OS SCRIPTS ---
        function initializeScripts() {
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
                typingElement.textContent = ''; // Limpa o conteúdo inicial

                function type() {
                    if (index < text.length) {
                        typingElement.textContent = text.substring(0, index + 1);
                        index++;
                        setTimeout(type, 45); // Velocidade de digitação
                    }
                }
                type(); // Inicia a animação
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
        }

        // --- LÓGICA DE CARREGAMENTO OTIMIZADA ---
        function hidePreloaderAndShowSite() {
            const preloader = document.getElementById('preloader');
            const mainContent = document.getElementById('main-content');

            if (preloader) {
                preloader.classList.add('hidden');
            }
            if (mainContent) {
                mainContent.classList.add('loaded');
            }
            // Inicializa todos os outros scripts DEPOIS que a página estiver visível
            initializeScripts();
        }

        // Aguarda a página inteira carregar (incluindo imagens e estilos)
        const pageLoadPromise = new Promise(resolve => {
            window.addEventListener('load', resolve);
        });

        // Define um tempo mínimo de exibição para a logo
        const minTimePromise = new Promise(resolve => {
            setTimeout(resolve, 2500); // Mínimo de 2.5 segundos
        });

        // Executa a transição somente quando AMBOS estiverem concluídos
        Promise.all([pageLoadPromise, minTimePromise]).then(() => {
            hidePreloaderAndShowSite();
        });
