// Configuração do link do Kirvano
const KIRVANO_LINK = 'https://pay.kirvano.com/642fc45c-5db9-4015-a4fd-7f760f5d68d6'; // Substitua pelo link real

// Smooth scrolling para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#FFFFFF';
        header.style.backdropFilter = 'none';
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fechar todos os outros itens
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir o item clicado se não estava ativo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Animação de contadores
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const numericValue = parseInt(target.replace(/[^\d]/g, ''));
        
        let current = 0;
        const increment = numericValue / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                counter.textContent = Math.floor(current) + '%';
            } else if (target.includes('+')) {
                counter.textContent = Math.floor(current).toLocaleString() + '+';
            } else if (target.includes('/')) {
                counter.textContent = Math.floor(current) + '/7';
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    });
}

// Intersection Observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animar contadores quando a seção hero estiver visível
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.benefit-card, .feature-item, .step, .testimonial-card, .pricing-card, .hero-stats').forEach(el => {
    observer.observe(el);
});

// Redirecionamento para Kirvano
function redirectToKirvano() {
    // Aqui você pode adicionar tracking/analytics antes do redirecionamento
    console.log('Redirecionando para Kirvano...');
    window.open(KIRVANO_LINK, '_blank');
}

// Event listeners para botões de CTA
document.addEventListener('DOMContentLoaded', () => {
    // Botões principais de CTA
    const ctaButtons = [
        '#comprar-agora',
        '#experimente-gratis',
        '#comece-hoje',
        '.pricing-btn'
    ];
    
    ctaButtons.forEach(selector => {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                redirectToKirvano();
            });
        });
    });
});

// Efeito de typing no hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicializar efeito de typing quando a página carregar
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Parallax effect para hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        const rate = scrolled * -0.5;
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
});

// Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Adicionar classe de animação CSS
const style = document.createElement('style');
style.textContent = `
    .animate {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav.active {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        padding: 1rem;
    }
    
    .nav.active .nav-list {
        flex-direction: column;
        gap: 1rem;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Função para mostrar notificação de sucesso
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ECC71;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Adicionar animações de notificação
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

