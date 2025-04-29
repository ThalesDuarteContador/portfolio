// script.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfólio de Thales Duarte carregado.");

    // Navegação suave e menu toggle
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Abrir/Fechar menu
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            // Alternar ícone do botão (opcional)
            const icon = navToggle.querySelector("i");
            if (navMenu.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });
    }

    // Fechar menu ao clicar em um link e scroll suave
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth"
                });
            }

            // Remover classe ativa do menu e resetar ícone
            if (navMenu && navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                const icon = navToggle.querySelector("i");
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
            
            // Atualizar link ativo (opcional)
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });
    
    // Fechar menu ao clicar fora dele (opcional)
    document.addEventListener("click", (e) => {
        if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains("active")) {
             navMenu.classList.remove("active");
             const icon = navToggle.querySelector("i");
             icon.classList.remove("fa-times");
             icon.classList.add("fa-bars");
        }
    });

    // Animação de elementos ao entrarem na viewport
    const observerOptions = {
        root: null, // Observa em relação à viewport
        rootMargin: "0px",
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Opcional: parar de observar após a primeira vez que fica visível
                 observer.unobserve(entry.target);
            } 
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todas as seções e eventos da timeline
    document.querySelectorAll("section, #experiencia .evento").forEach(el => {
        observer.observe(el);
    });
    
    // Atualizar link ativo no menu conforme scroll
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

});

