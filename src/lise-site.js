console.log('lise-site.js chargé');
// Site web de Lise Zambelli - Céramiste
document.addEventListener('DOMContentLoaded', function() {
    // Navigation et interactions
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navigation fluide vers les sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Fermer le menu mobile si ouvert
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Menu hamburger mobile avec animation améliorée
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animation des barres du hamburger
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }
    
    // Changement de style de la navbar au scroll avec effet de parallaxe
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            // Effet de transparence et flou
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
                navbar.style.transform = 'translateY(0)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
            
            // Effet de hide/show au scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }
    });
    
    // Animation des éléments au scroll avec Intersection Observer amélioré
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Ajouter une classe pour les animations supplémentaires
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer avec des délais différents
    const animatedElements = document.querySelectorAll('.philosophy-text, .timeline-item, .work-item, .exhibition-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Animation spéciale pour la timeline avec effet cascade
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        
        // Effet de hover spécial pour les dots de timeline
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
            item.addEventListener('mouseenter', function() {
                dot.style.transform = 'translateX(-50%) scale(1.5)';
                dot.style.boxShadow = '0 0 0 10px white, 0 10px 30px rgba(230, 126, 34, 0.5)';
            });
            
            item.addEventListener('mouseleave', function() {
                dot.style.transform = 'translateX(-50%) scale(1)';
                dot.style.boxShadow = '0 0 0 6px white, 0 5px 15px rgba(230, 126, 34, 0.3)';
            });
        }
    });
    
    // Animation des œuvres avec effet 3D
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03) rotateY(2deg)';
            this.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(230, 126, 34, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(230, 126, 34, 0.1)';
        });
        
        // Effet de parallaxe au survol
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `translateY(-15px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    // Formulaire de contact avec validation améliorée
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Animation des labels flottants
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Validation en temps réel
            input.addEventListener('input', function() {
                validateField(this);
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const subject = this.querySelector('input[placeholder="Sujet"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            // Validation complète
            let isValid = true;
            const fields = [
                { element: this.querySelector('input[type="text"]'), value: name, name: 'Nom' },
                { element: this.querySelector('input[type="email"]'), value: email, name: 'Email' },
                { element: this.querySelector('textarea'), value: message, name: 'Message' }
            ];
            
            fields.forEach(field => {
                if (!field.value) {
                    showFieldError(field.element, `${field.name} est requis`);
                    isValid = false;
                } else if (field.element.type === 'email' && !isValidEmail(field.value)) {
                    showFieldError(field.element, 'Email invalide');
                    isValid = false;
                } else {
                    clearFieldError(field.element);
                }
            });
            
            if (isValid) {
                // Simulation d'envoi avec animation
                const submitBtn = this.querySelector('.submit-button');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showNotification('Message envoyé ! Nous vous répondrons dans les plus brefs délais.', 'success');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Animation de succès
                    submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                    setTimeout(() => {
                        submitBtn.style.background = 'linear-gradient(135deg, #e67e22, #f39c12)';
                    }, 2000);
                }, 2000);
            }
        });
    }
    
    // Fonctions de validation
    function validateField(field) {
        const value = field.value.trim();
        
        if (field.type === 'email' && value) {
            if (!isValidEmail(value)) {
                showFieldError(field, 'Format d\'email invalide');
            } else {
                clearFieldError(field);
            }
        }
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        field.style.borderColor = '#e74c3c';
        field.style.boxShadow = '0 0 0 4px rgba(231, 76, 60, 0.1)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 0.5rem;
            animation: slideIn 0.3s ease;
        `;
        
        field.parentElement.appendChild(errorDiv);
    }
    
    function clearFieldError(field) {
        field.style.borderColor = 'rgba(230, 126, 34, 0.2)';
        field.style.boxShadow = 'none';
        
        const errorDiv = field.parentElement.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Système de notification amélioré
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1.2rem 2rem;
            border-radius: 15px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%) scale(0.8);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 350px;
            backdrop-filter: blur(10px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        `;
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        }
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0) scale(1)';
        }, 100);
        
        // Suppression automatique
        setTimeout(() => {
            notification.style.transform = 'translateX(100%) scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 400);
        }, 5000);
    }
    
    // Animation du texte de la hero section avec effet de typewriter
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const textElements = heroText.querySelectorAll('h1, h2, p');
        textElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.transitionDelay = `${index * 0.3}s`;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 800 + (index * 300));
        });
    }
    
    // Animation des images placeholder avec effet de morphing
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    imagePlaceholders.forEach((placeholder, index) => {
        placeholder.style.opacity = '0';
        placeholder.style.transform = 'scale(0.5) rotate(10deg)';
        placeholder.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
        placeholder.style.transitionDelay = `${index * 0.4}s`;
        
        setTimeout(() => {
            placeholder.style.opacity = '1';
            placeholder.style.transform = 'scale(1) rotate(0deg)';
        }, 1200 + (index * 400));
    });
    
    // Effet parallaxe amélioré pour la hero section
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    const rate = scrolled * -0.3;
                    hero.style.transform = `translateY(${rate}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Animation des liens sociaux avec effet de rebond
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(15deg) scale(1.1)';
            this.style.boxShadow = '0 20px 40px rgba(230, 126, 34, 0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(230, 126, 34, 0.3)';
        });
    });
    
    // Animation des boutons CTA avec effet de pulsation
    const ctaButtons = document.querySelectorAll('.cta-button, .submit-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 20px 50px rgba(230, 126, 34, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(230, 126, 34, 0.3)';
        });
        
        // Effet de pulsation périodique
        setInterval(() => {
            if (!button.matches(':hover')) {
                button.style.transform = 'translateY(-2px) scale(1.02)';
                setTimeout(() => {
                    if (!button.matches(':hover')) {
                        button.style.transform = 'translateY(0) scale(1)';
                    }
                }, 200);
            }
        }, 3000);
    });
    
    // Animation des catégories d'œuvres avec effet de rebond
    const workCategories = document.querySelectorAll('.work-category');
    workCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) translateY(-3px)';
            this.style.boxShadow = '0 10px 30px rgba(230, 126, 34, 0.5)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(230, 126, 34, 0.3)';
        });
    });
    
    // Animation des dates d'exposition avec effet de rotation
    const exhibitionDates = document.querySelectorAll('.exhibition-date');
    exhibitionDates.forEach(date => {
        date.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        date.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Lazy loading pour les images avec effet de fade
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.style.opacity = '0';
                img.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 100);
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Smooth scroll amélioré pour tous les liens internes
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                // Animation de scroll fluide avec easing
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function easeInOutCubic(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t * t + b;
                    t -= 2;
                    return c / 2 * (t * t * t + 2) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
    
    // Animation du scroll indicator avec effet de pulsation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const philosophySection = document.querySelector('#philosophie');
            if (philosophySection) {
                const offsetTop = philosophySection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
        
        // Effet de pulsation périodique
        setInterval(() => {
            scrollIndicator.style.transform = 'translateX(-50%) scale(1.3)';
            setTimeout(() => {
                scrollIndicator.style.transform = 'translateX(-50%) scale(1)';
            }, 200);
        }, 3000);
    }
    
    // Effet de typewriter pour le titre principal (optionnel)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Démarrer l'effet typewriter si désiré
    // const heroTitle = document.querySelector('.hero-text h1');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 150);
    // }
    
    // Animation de chargement de la page
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Lightbox galerie des œuvres universelle
    const workPhotos = document.querySelectorAll('.works-grid .work-photo');
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    // Ajout : navigation lightbox pour les .expo-photo (expositions)
    function getAllLightboxImages() {
      // Inclut toutes les images .work-photo et .expo-photo visibles dans le DOM
      return Array.from(document.querySelectorAll('.works-grid .work-photo, .expo-photo'));
    }

    // Remplace l'ouverture de la lightbox pour .expo-photo
    function attachLightboxEvents() {
      document.querySelectorAll('.works-grid .work-photo:not([data-lightbox-attached])').forEach(photo => {
        photo.style.cursor = 'zoom-in';
        photo.addEventListener('click', function() {
          // Navigation dans la catégorie d'œuvres
          const theme = this.closest('.work-item')?.getAttribute('data-themes');
          const items = Array.from(document.querySelectorAll('.work-item[data-themes="' + theme + '"] img.work-photo'));
          const idx = items.findIndex(i => i === this);
          if (idx !== -1) {
            currentCategoryImages = items;
            currentCategoryIndex = idx;
            showCurrentLightboxImage();
          }
        });
        photo.setAttribute('data-lightbox-attached', 'true');
      });
      document.querySelectorAll('.expo-photo:not([data-lightbox-attached])').forEach(photo => {
        photo.style.cursor = 'zoom-in';
        photo.addEventListener('click', function() {
          // Navigation uniquement dans le même événement (même .expo-photos)
          const container = this.closest('.expo-photos');
          const items = Array.from(container.querySelectorAll('.expo-photo'));
          const idx = items.findIndex(i => i === this);
          if (idx !== -1) {
            currentCategoryImages = items;
            currentCategoryIndex = idx;
            showCurrentLightboxImage();
          }
        });
        photo.setAttribute('data-lightbox-attached', 'true');
      });
    }
    // Appel initial (et ré-appel si besoin)
    attachLightboxEvents();

    // Variables pour la navigation lightbox par catégorie
    let currentCategoryImages = [];
    let currentCategoryIndex = 0;

    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    // Ajout d'un conteneur pour le titre dans la lightbox
    let lightboxTitle = document.getElementById('lightbox-title');
    if (!lightboxTitle) {
      lightboxTitle = document.createElement('div');
      lightboxTitle.id = 'lightbox-title';
      lightboxTitle.style = `
        position: absolute;
        left: 50%;
        bottom: 64px;
        transform: translateX(-50%);
        min-width: 220px;
        max-width: 90vw;
        background: rgba(40,40,40,0.38);
        color: #fff;
        text-align: center;
        font-size: 1.18rem;
        font-family: 'Playfair Display',serif;
        letter-spacing: 0.5px;
        text-shadow: 0 2px 8px #0008;
        border-radius: 12px;
        padding: 0.7em 1.5em 0.6em 1.5em;
        box-shadow: 0 4px 18px #0002;
        z-index: 10002;
        pointer-events: none;
      `;
      lightboxOverlay.appendChild(lightboxTitle);
    }

    function openLightboxForCategory(theme, index = 0) {
      // Récupère toutes les images de la catégorie
      const items = Array.from(document.querySelectorAll('.work-item[data-themes="' + theme + '"] img.work-photo'));
      if (items.length === 0) return;
      currentCategoryImages = items;
      currentCategoryIndex = index;
      showCurrentLightboxImage();
    }

    function showCurrentLightboxImage() {
      if (!currentCategoryImages.length) return;
      const img = currentCategoryImages[currentCategoryIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Affiche ou masque les boutons selon la position
      if (lightboxPrev) lightboxPrev.style.display = currentCategoryIndex > 0 ? 'block' : 'none';
      if (lightboxNext) lightboxNext.style.display = currentCategoryIndex < currentCategoryImages.length - 1 ? 'block' : 'none';
      // Affiche le titre
      let title = '';
      const workItem = img.closest('.work-item');
      if (workItem) {
        const h3 = workItem.querySelector('.work-info h3');
        if (h3) title = h3.textContent;
      }
      lightboxTitle.textContent = title;
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentCategoryIndex > 0) {
          currentCategoryIndex--;
          showCurrentLightboxImage();
        }
      });
    }
    if (lightboxNext) {
      lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentCategoryIndex < currentCategoryImages.length - 1) {
          currentCategoryIndex++;
          showCurrentLightboxImage();
        }
      });
    }

    // Fermer la lightbox réinitialise la navigation
    function closeLightbox() {
      lightboxOverlay.classList.remove('active');
      lightboxImg.src = '';
      document.body.style.overflow = '';
      currentCategoryImages = [];
      currentCategoryIndex = 0;
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) closeLightbox();
    });
    document.addEventListener('keydown', function(e) {
        if (lightboxOverlay.classList.contains('active') && (e.key === 'Escape' || e.key === 'Esc')) {
            closeLightbox();
        }
    });

    // === Début des fonctions utilitaires, à placer AVANT tout DOMContentLoaded ===
    function showOnlyGroup(category) {
      // Toujours réaffiche tous les groupes et la barre de filtres avant de filtrer
      document.querySelectorAll('.works-group').forEach(function(group) {
        group.style.display = 'block';
      });
      var filters = document.querySelector('.works-filters');
      if (filters) filters.style.display = 'flex';
      // Puis filtre
      document.querySelectorAll('.works-group').forEach(function(group) {
        const h3 = group.querySelector('.theme-title');
        if (h3 && h3.getAttribute('data-i18n') === 'works_theme_' + category) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      });
    }

    function showSlideForCategory(category, index) {
      // Récupère toutes les images de la catégorie
      const items = Array.from(document.querySelectorAll('.work-item'));
      const filtered = items.filter(item => item.getAttribute('data-themes') === category);
      if (filtered.length === 0) return;
      currentCategoryImages = filtered.map(item => item.querySelector('img.work-photo'));
      if (index >= currentCategoryImages.length) {
        document.getElementById('slideshow-overlay').style.display = 'none';
        if (slideshowInterval) clearInterval(slideshowInterval);
        return;
      }
      const img = currentCategoryImages[index];
      const overlay = document.getElementById('slideshow-overlay');
      const overlayImg = document.getElementById('slideshow-img');
      overlayImg.src = img.src;
      overlayImg.alt = img.alt;
      overlay.style.display = 'flex';
    }

    function startSlideshow(category) {
      stopSlideshow();
      currentCategory = category;
      currentSlideIndex = 0;
      showSlideForCategory(category, currentSlideIndex);
      slideshowInterval = setInterval(() => {
        currentSlideIndex++;
        showSlideForCategory(category, currentSlideIndex);
      }, 3000);
    }

    function stopSlideshow() {
      console.log('stopSlideshow appelé');
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
      }
      document.getElementById('slideshow-overlay').style.display = 'none';
      // Toujours réaffiche tous les groupes et la barre de filtres
      document.querySelectorAll('.works-group').forEach(function(group) {
        group.style.display = 'block';
      });
      var filters = document.querySelector('.works-filters');
      if (filters) filters.style.display = 'flex';
    }
    // === Fin des fonctions utilitaires ===

    // 3. GARDER un seul attachement pour le bouton fermer du diaporama
    // (Supprimer les autres attachements si présents)
    document.addEventListener('DOMContentLoaded', function() {
      var closeBtn = document.getElementById('slideshow-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          console.log('Bouton fermer cliqué');
          stopSlideshow();
        });
      }
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const theme = this.getAttribute('data-theme');
        showOnlyGroup(theme);
        setTimeout(() => {
          openLightboxForCategory(theme, 0);
        }, 100);
      });
    });

    // (À la toute fin du DOMContentLoaded)
    setTimeout(() => {
      const filterImageButtons = document.querySelectorAll('.filter-btn-image');
      console.log('Boutons catégorie trouvés:', filterImageButtons.length);
      filterImageButtons.forEach(button => {
        button.addEventListener('click', function() {
          const theme = this.getAttribute('data-theme');
          openLightboxForCategory(theme, 0);
        });
      });
    }, 300);

    // Ajoute la navigation par catégorie même lors du clic sur une image
    workItems.forEach(item => {
      const img = item.querySelector('img.work-photo');
      if (img) {
        img.addEventListener('click', function(e) {
          const theme = item.getAttribute('data-themes');
          const items = Array.from(document.querySelectorAll('.work-item[data-themes="' + theme + '"] img.work-photo'));
          const idx = items.findIndex(i => i === img);
          if (idx !== -1) {
            openLightboxForCategory(theme, idx);
          }
        });
      }
    });

    // 4. (Optionnel) Exemple de lancement manuel du slideshow :
    // Pour tester, ouvrez la console et tapez : startSlideshow('totems')
    // Ou ajoutez un bouton dans le HTML qui appelle startSlideshow('totems') au clic

    // Arrêt du slideshow si on quitte la page
    window.addEventListener('beforeunload', stopSlideshow);

    // Animation des tags au hover
    const workTags = document.querySelectorAll(".work-tag");
    workTags.forEach(tag => {
        tag.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-2px) scale(1.05)";
        });
        
        tag.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // Sélecteur de langue
    const langFlags = document.querySelectorAll('.lang-flag');
    langFlags.forEach(flag => {
        flag.addEventListener('click', function() {
            setLanguage(this.dataset.lang);
            langFlags.forEach(f => f.style.opacity = '0.5');
            this.style.opacity = '1';
        });
    });
    setLanguage('fr');
    langFlags[0].style.opacity = '1';

    function setLanguage(lang) {
        updateI18nTexts(lang);
        translateThemeTitles(lang);
        // localStorage.setItem('lang', lang);
    }

    function translateThemeTitles(lang) {
        document.querySelectorAll('.theme-title[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = translations[lang][key];
            console.log('FORCE Traduction thème:', key, '->', translation);
            if (translation) {
                el.textContent = translation;
                el.style.display = 'inline-block';
                el.offsetHeight;
                el.style.display = '';
            }
            console.log('Vérif DOM:', el, 'innerText:', el.innerText);
        });
    }
});

// Styles CSS supplémentaires pour les animations
const additionalStyles = `
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        padding: 1rem;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
        transform: translateX(-20px);
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
    
    .social-link {
        animation: bounceIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        opacity: 0;
        transform: scale(0);
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
        }
    }
`;

// Ajouter les styles supplémentaires
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Multilingue : textes pour chaque langue
const translations = {
  fr: {
    nav_home: "Accueil",
    nav_philosophy: "Philosophie",
    nav_journey: "Parcours",
    nav_works: "Galerie",
    nav_exhibitions: "Expositions",
    nav_workshops: "Workshops",
    nav_contact: "Contact",
    nav_job: "Céramiste",
    hero_title: "Lise Zambelli",
    hero_subtitle: "Artiste Céramiste",
    hero_text: "Créer avec la terre, donner vie à la matière, partager l'essence de la beauté naturelle",
    hero_cta: "Découvrir mes œuvres",
    hero_name: "Lise Zambelli",
    hero_job: "Céramiste",
    philosophy_title: "Ma Philosophie",
    philo_expo_title: "Exposition au Musée Tsarytsino",
    philo_expo_text: "Mon travail de céramiste a été présenté lors de l'exposition au Musée Tsarytsino, à Moscou. Ce fut une occasion unique de partager mes créations et d'échanger autour de la céramique contemporaine dans un cadre prestigieux et inspirant.",
    philo_beauty_title: "L'Essence du Beau",
    philo_beauty_text: "Je cherche à capturer l'essence même de la beauté naturelle, celle qui émane de la perfection imparfaite, des formes organiques et des textures qui racontent une histoire. Mes créations ne sont pas de simples objets, mais des témoins d'un moment, d'une émotion, d'une réflexion sur notre rapport au monde.",
    philo_why_title: "Le Pourquoi de Mon Travail",
    philo_why_text: "Dans un monde de plus en plus dématérialisé, je ressens le besoin profond de créer des objets tangibles, porteurs de sens et d'émotion. La céramique me permet de matérialiser mes pensées, mes rêves et mes questionnements sur la beauté, l'éphémère et l'éternel.",
    journey_title: "Mon Parcours",
    journey_2020_title: "2020 - Aujourd'hui",
    journey_2020_subtitle: "Atelier Personnel",
    journey_2020_text: "Développement de ma propre signature artistique, exploration de nouvelles techniques et matières, création d'œuvres uniques qui reflètent mon évolution personnelle et artistique.",
    journey_2018_title: "2018 - 2020",
    journey_2018_subtitle: "Formation Avancée",
    journey_2018_text: "Perfectionnement auprès de maîtres céramistes, apprentissage de techniques traditionnelles et contemporaines, développement d'une approche personnelle de la création.",
    journey_2015_title: "2015 - 2018",
    journey_2015_subtitle: "Premiers Pas",
    journey_2015_text: "Découverte de la céramique, premières expérimentations, apprentissage des bases techniques et développement d'une sensibilité artistique.",
    works_title: "Galerie",
    work_totems: "Totems Lise",
    work_cdef: "C definitif",
    work_19: "19",
    work_14: "14",
    work_7: "7",
    work_1: "1",
    exhibitions_title: "Quelques Expositions passées",
    expo_terre_title: "\"Dialogues avec la Terre\"",
    expo_terre_lieu: "Galerie Art Contemporain, Paris",
    expo_terre_desc: "Exposition personnelle présentant une sélection d'œuvres récentes explorant le dialogue entre l'artiste et la matière.",
    expo_contemp_title: "\"Céramiques Contemporaines\"",
    expo_contemp_lieu: "Musée des Arts Décoratifs, Lyon",
    expo_contemp_desc: "Exposition collective mettant en avant les nouvelles tendances de la céramique contemporaine.",
    expo_mat_title: "\"Matières et Formes\"",
    expo_mat_lieu: "Centre d'Art Contemporain, Marseille",
    expo_mat_desc: "Participation à une exposition collective explorant les relations entre matériaux et créativité.",
    expo_salon_title: "\"Salon des Artisans d'Art\"",
    expo_salon_lieu: "Parc des Expositions, Nantes",
    expo_salon_desc: "Présentation de ma collection \"Terre\" lors du salon annuel des artisans d'art.",
    workshops_title: "Workshops",
    workshops_intro_title: "Atelier de Céramique",
    workshops_intro_text: "Plonger dans l'univers fascinant de la céramique : façonner la terre, explorer les textures, les couleurs et les formes, et laisser libre cours à sa créativité à travers les gestes du modelage, de l'émaillage et de la cuisson.",
    workshop1_title: "Cuisson RAKU",
    workshop1_date: "<strong>Date :</strong> 15 septembre 2024",
    workshop1_lieu: "<strong>Lieu :</strong> Atelier proche de Florence",
    workshop1_text: "Une technique que j'aime particulièrement\nApparue au XVIᵉ siècle à Kyoto, la cuisson RAKU a été développée par Chōjirō pour la cérémonie du thé.\nLe mot « Raku » signifie joie ou confort en japonais — et c'est exactement ce que je ressens chaque fois que les pièces sortent du four, encore incandescentes, avant d'être enfumées dans la sciure.\nLes craquelures dans le vernis, toujours différentes, offrent à chaque création un caractère unique et imprévisible.\nUne technique à la fois spontanée, délicate et profondément expressive.",
    workshop2_title: "Stage Créatif : Sérigraphie",
    workshop2_date: "<strong>Date :</strong> 12-18 mai 2025",
    workshop2_lieu: "<strong>Lieu :</strong> Vinci, Tuscany",
    workshop2_text: `<li>Préparation des cadres et dessins</li><li>Préparation de l'argile</li><li>Induction sur toile</li><li>Sérigraphie sur argile</li><li>Autres cadres pour approfondir la technique</li>`,
    workshop3_title: "Savoir et Émotion",
    workshop3_date: "<strong>Date :</strong> 9 novembre 2024",
    workshop3_lieu: "<strong>Lieu :</strong> Maison de la Culture, Nantes",
    workshop3_text: "Se reconnecter à la source, délier le regard de l'ordinaire, et faire de la vie une expérience de beauté permanente, où chaque instant pulse comme une œuvre vivante.",
    contact_title: "Contact",
    contact_intro_title: "Travaillons Ensemble",
    contact_intro_text: "Vous souhaitez découvrir mes œuvres, commander une pièce unique ou organiser une exposition ? N'hésitez pas à me contacter.",
    contact_email: "lise.zambelli@gmail.com",
    contact_tel: "+33 6 85 90 29 92 (FR) / +39 328 854 7857 (IT)",
    contact_atelier: '<a href="https://www.google.com/maps?q=Via+Campagliana+35,+50059+VINCI+(FIRENZE),+Italy" target="_blank" style="color:#bfa77a;text-decoration:underline;">Via Campagliana 35, 50059 VINCI (FIRENZE), Italy</a>',
    footer_name: "Lise Zambelli",
    footer_desc: "Artiste céramiste passionnée par la beauté naturelle et l'expression artistique à travers la terre.",
    footer_nav_home: "Accueil",
    footer_nav_philosophy: "Philosophie",
    footer_nav_journey: "Parcours",
    footer_nav_works: "Œuvres",
    footer_nav_exhibitions: "Expositions",
    footer_nav_workshops: "Workshops",
    footer_nav_contact: "Contact",
    footer_contact_title: "Contact",
    footer_contact_email: "lise.zambelli@gmail.com",
    footer_contact_atelier: '<a href="https://www.google.com/maps?q=Via+Campagliana+35,+50059+VINCI+(FIRENZE),+Italy" target="_blank" style="color:#bfa77a;text-decoration:underline;">Atelier proche de Florence</a>',
    footer_copyright: "&copy; 2024 Lise Zambelli. Tous droits réservés.",
    ceramic_quote: "« La céramique est une étreinte de la terre et du feu, une trace de la nature qui prend forme entre nos mains. »",
    parcours_cv_title: "Curriculum Vitae",
    parcours_expos_title: "Expositions principales récentes",
    parcours_bio_title: "Biographie",
    parcours_bio: "Lise est née à Bordeaux, en France. Elle a déménagé en Italie en 2021, à Vinci, le village de Léonard. D'abord pianiste et professeure de piano, elle a ensuite étudié la peinture décorative et l'histoire de l'art à l'École du Louvre à Paris. Après une résidence céramique à Tokoname, Japon, en 2010, elle s'est consacrée à la céramique. De nombreux workshops et symposiums dans différents pays : Corée, Chine, Finlande, Taïwan, Hongrie... Expositions partagées ou en solo, comme en décembre 2019 à Moscou. Elle a été invitée à Maurice pour installer un atelier de céramique pour les locaux. Elle aime créer des animaux, des corps, et des sculptures monumentales. Le partage du savoir céramique est essentiel pour elle. Membre d'ArtCeram2 à Sèvres depuis 2014 et de l'AIC-IAC depuis 2019.",
    parcours_langues: "Langues parlées : français, italien, anglais.\nLangues étudiées à l'école : allemand et russe.",
    form_name_placeholder: "Votre nom",
    form_email_placeholder: "Votre email",
    form_subject_placeholder: "Sujet",
    form_message_placeholder: "Votre message",
    form_submit: "Envoyer le message",
    works_theme_totems: "Totems",
    works_theme_sculptures: "Sculptures",
    works_theme_divers: "Divers",
    works_theme_all: "Toutes",
    works_theme_tabourets: "Tabourets",
    works_theme_animaux: "Animaux",
    expo_matres_title: "MATRES - Festival Internazionale di Ceramica Femminile",
    expo_matres_lieu: "Cava de' Tirreni, Italie",
    expo_matres_desc: "Participation au festival international de céramique féminine, rencontres, expositions et ateliers avec des artistes du monde entier.",
    expo_tsarytsino_title: "Tsarytsino museum",
    expo_tsarytsino_lieu: "Moscou, Russie",
    expo_tsarytsino_desc: "Exposition personnelle de Lise Zambelli et ses ours polaires au musée Tsarytsino, Moscou (Novembre 2019 – Janvier 2020).",
    expo1_month: "Juin",
    expo1_year: "2024",
    expo2_month: "Août",
    expo2_year: "2022",
    expo3_month: "Déc-Jan",
    expo3_year: "2020",
    works_intro: `<p style="margin-bottom:0.7em;"><em>Lors d'une résidence artistique au Japon en 2010, j'ai découvert la liberté créative des céramistes japonais. Là-bas, un simple bol à thé peut susciter autant d'intérêt et d'admiration qu'une sculpture monumentale. Cette approche m'a profondément marqué et a transformé ma manière de créer.</em></p><p>Depuis, j'ai adopté cette vision ouverte : ma production se distingue par sa diversité, tant dans les sujets que dans les formes et les couleurs. Chaque pièce, quelle que soit sa nature, est porteuse d'une intention artistique et d'un soin unique.</p>`,
    works_signature: "Lise Zambelli - Signature",
    gallery_intro: "Lors d'une résidence artistique au Japon en 2010, j'ai découvert la liberté créative des céramistes japonais. Là-bas, un simple bol à thé peut susciter autant d'intérêt et d'admiration qu'une sculpture monumentale. Cette approche m'a profondément marqué et a transformé ma manière de créer.<br><br>Depuis, j'ai adopté cette vision ouverte : ma production se distingue par sa diversité, tant dans les sujets que dans les formes et les couleurs. Chaque pièce, quelle que soit sa nature, est porteuse d'une intention artistique et d'un soin unique.",
    expo_2025_lapis_title: "Musée Souterrain Lapis – Naples, Italie",
    expo_2025_lapis_desc: "Exposition dans les galeries souterraines où les Napolitains se réfugiaient durant les bombardements de la Seconde Guerre mondiale. Un dialogue entre mémoire collective et matière.",
    expo_2024_terralha_title: "Terralha – Saint-Quentin-la-Poterie (34), France",
    expo_2024_terralha_desc: "Festival annuel de céramique contemporaine. Chaque artiste est invité à exposer chez l'habitant, dans des lieux inattendus et chargés d'âme.",
    expo_2024_totems_title: "Installation des Totems Madame & Monsieur – Sèvres (92), France",
    expo_2024_totems_desc: "À la suite de la 9e Biennale de céramique contemporaine, les totems ont été installés de façon permanente dans la cour de la mairie.",
    expo_2024_vinci_title: "Vinci (FI), Italie",
    expo_2024_vinci_desc: "Création et donation de quatre plaques de céramique à la ville de Vinci pour célébrer l'anniversaire de Léonard de Vinci.",
    expo_2024_maurice_title: "Île Maurice",
    expo_2024_maurice_desc: "Organisation et installation d'un atelier de céramique destiné aux femmes mauriciennes, pour une production artisanale locale vendue aux touristes.",
    expo_2023_seoul_title: "Séoul, Corée du Sud",
    expo_2023_seoul_desc: "Invitation par la galerie Tong-In, spécialisée en céramique ancienne et contemporaine. Une rencontre entre tradition coréenne et création contemporaine dans un lieu emblématique du patrimoine vivant asiatique.",
    expo_2023_melis_title: "Deuxième Compétition de Céramique – Frères Melis, Bosa (Sardaigne), Italie",
    expo_2023_melis_desc: "Participation à la compétition. Troisième prix obtenu pour une pièce contemporaine mêlant tradition et expérimentation.",
    expo_2022_taiwan_title: "Concours de Tasses à Café – Taipei, Taïwan",
    expo_2022_taiwan_desc: "Exploration du geste du quotidien à travers une forme familière : la tasse.",
    expo_2020_bhopal_title: "Bhopal, Inde",
    expo_2020_bhopal_desc: "Exposition collective avec 8 artistes internationaux. Échanges et rencontres avec des artistes indiens autour de la céramique contemporaine.",
    expo_2019_moscou_title: "Exposition personnelle – Musée Tsarytsino, Moscou, Russie",
    expo_2019_moscou_desc: "Installation dans l'opéra de ce vaste musée. Thème : le réchauffement climatique. Les ours polaires, messagers silencieux de la fonte des glaces, ont été les protagonistes de cette exposition de fin d'année. Affiche monumentale 4x3 m : Lise Zambelli et ses ours polaires",
  },
  it: {
    nav_home: "Home",
    nav_philosophy: "Filosofia",
    nav_journey: "Percorso",
    nav_works: "Galleria",
    nav_exhibitions: "Esposizioni",
    nav_workshops: "Workshops",
    nav_contact: "Contatto",
    nav_job: "Ceramista",
    hero_title: "Lise Zambelli",
    hero_subtitle: "Artista Ceramista",
    hero_text: "Creare con la terra, dare vita alla materia, condividere l'essenza della bellezza naturale",
    hero_cta: "Scopri le mie opere",
    hero_name: "Lise Zambelli",
    hero_job: "Ceramista",
    philosophy_title: "La mia filosofia",
    philo_expo_title: "Esposizione al Museo Tsarytsino",
    philo_expo_text: "Il mio lavoro di ceramista è stato presentato all'esposizione presso il Museo Tsarytsino, a Mosca. Un'occasione unica per condividere le mie creazioni e dialogare sulla ceramica contemporanea in un contesto prestigioso e ispirante.",
    philo_beauty_title: "L'essenza della bellezza",
    philo_beauty_text: "Cerco di catturare l'essenza stessa della bellezza naturale, quella che nasce dall'imperfezione perfetta, dalle forme organiche e dalle texture che raccontano una storia. Le mie creazioni non sono semplici oggetti, ma testimoni di un momento, di un'emozione, di una riflessione sul nostro rapporto con il mondo.",
    philo_why_title: "Il perché del mio lavoro",
    philo_why_text: "In un mondo sempre più smaterializzato, sento il bisogno profondo di creare oggetti tangibili, portatori di senso ed emozione. La ceramica mi permette di materializzare i miei pensieri, i miei sogni e le mie domande sulla bellezza, l'effimero e l'eterno.",
    journey_title: "Il Mio Percorso",
    journey_2020_title: "2020 - Oggi",
    journey_2020_subtitle: "Studio Personale",
    journey_2020_text: "Sviluppo di una firma artistica personale, esplorazione di nuove tecniche e materiali, creazione di opere uniche che riflettono la mia evoluzione personale e artistica.",
    journey_2018_title: "2018 - 2020",
    journey_2018_subtitle: "Formazione Avanzata",
    journey_2018_text: "Perfezionamento con maestri ceramisti, apprendimento di tecniche tradizionali e contemporanee, sviluppo di un approccio personale alla creazione.",
    journey_2015_title: "2015 - 2018",
    journey_2015_subtitle: "Primi Passi",
    journey_2015_text: "Scoperta della ceramica, prime sperimentazioni, apprendimento delle basi tecniche e sviluppo di una sensibilità artistica.",
    works_title: "Galleria",
    work_totems: "Totem di Lise",
    work_cdef: "C definitivo",
    work_19: "19",
    work_14: "14",
    work_7: "7",
    work_1: "1",
    exhibitions_title: "Alcune Mostre Passate",
    expo_terre_title: "\"Dialoghi con la Terra\"",
    expo_terre_lieu: "Galleria d'Arte Contemporanea, Parigi",
    expo_terre_desc: "Mostra personale con una selezione di opere recenti che esplorano il dialogo tra artista e materia.",
    expo_contemp_title: "\"Ceramiche Contemporanee\"",
    expo_contemp_lieu: "Museo delle Arti Decorative, Lione",
    expo_contemp_desc: "Mostra collettiva che mette in evidenza le nuove tendenze della ceramica contemporanea.",
    expo_mat_title: "\"Materie e Forme\"",
    expo_mat_lieu: "Centro d'Arte Contemporanea, Marsiglia",
    expo_mat_desc: "Partecipazione a una mostra collettiva che esplora le relazioni tra materiali e creatività.",
    expo_salon_title: "\"Salone degli Artigiani d'Arte\"",
    expo_salon_lieu: "Parco delle Esposizioni, Nantes",
    expo_salon_desc: "Presentazione della mia collezione \"Terra\" durante il salone annuale degli artigiani d'arte.",
    workshops_title: "Workshop",
    workshops_intro_title: "Atelier di Ceramica",
    workshops_intro_text: "Immergersi nell'affascinante universo della ceramica: plasmare la terra, esplorare texture, colori e forme, e dare libero sfogo alla creatività attraverso i gesti della modellazione, della smaltatura e della cottura.",
    workshop1_title: "Cottura RAKU",
    workshop1_date: "<strong>Data:</strong> 15 settembre 2024",
    workshop1_lieu: "<strong>Luogo:</strong> Atelier vicino a Firenze",
    workshop1_text: "Una tecnica che amo particolarmente.\nApparsa nel XVI secolo a Kyoto, la cottura RAKU è stata sviluppata da Chōjirō per la cerimonia del tè.\nLa parola 'Raku' significa gioia o comfort in giapponese — ed è esattamente ciò che provo ogni volta che i pezzi escono dal forno, ancora incandescenti, prima di essere affumicati nella segatura.\nLe crepe nella vernice, sempre diverse, donano a ogni creazione un carattere unico e imprevedibile.\nUna tecnica allo stesso tempo spontanea, delicata e profondamente espressiva.",
    workshop2_title: "Stage Creativo: Serigrafia",
    workshop2_date: "<strong>Data:</strong> 12-18 maggio 2025",
    workshop2_lieu: "<strong>Lieu :</strong> Vinci, Tuscany",
    workshop2_text: `<li>Préparation des cadres et dessins</li><li>Préparation de l'argile</li><li>Induction sur toile</li><li>Sérigraphie sur argile</li><li>Autres cadres pour approfondir la tecnica</li>`,
    workshop3_title: "Sapere ed Emozione",
    workshop3_date: "<strong>Date:</strong> 9 novembre 2024",
    workshop3_lieu: "<strong>Lieu :</strong> Maison de la Cultura, Nantes",
    workshop3_text: "Riconnettersi alla fonte, sciogliere lo sguardo dall'ordinario, e fare della vita un'esperienza di bellezza permanente, dove ogni istante pulsa come un'opera vivente.",
    contact_title: "Contatto",
    contact_intro_title: "Lavoriamo Insieme",
    contact_intro_text: "Vuoi scoprire le mie opere, ordinare un pezzo unico or organizzare una mostra? Non esitare a contattarmi.",
    contact_email: "lise.zambelli@gmail.com",
    contact_tel: "+33 6 85 90 29 92 (FR) / +39 328 854 7857 (IT)",
    contact_atelier: '<a href="https://www.google.com/maps?q=Via+Campagliana+35,+50059+VINCI+(FIRENZE),+Italia" target="_blank" style="color:#bfa77a;text-decoration:underline;">Via Campagliana 35, 50059 VINCI (FIRENZE), Italia</a>',
    footer_name: "Lise Zambelli",
    footer_desc: "Artista ceramista appassionata della bellezza naturale e dell'espressione artistica attraverso la terra.",
    footer_nav_home: "Home",
    footer_nav_philosophy: "Filosofia",
    footer_nav_journey: "Percorso",
    footer_nav_works: "Opere",
    footer_nav_exhibitions: "Mostre",
    footer_nav_workshops: "Workshop",
    footer_nav_contact: "Contatto",
    footer_contact_title: "Contatto",
    footer_contact_email: "lise.zambelli@gmail.com",
    footer_contact_atelier: '<a href="https://www.google.com/maps?q=Via+Campagliana+35,+50059+VINCI+(FIRENZE),+Italia" target="_blank" style="color:#bfa77a;text-decoration:underline;">Atelier vicino a Firenze</a>',
    footer_copyright: "&copy; 2024 Lise Zambelli. Tutti i diritti riservati.",
    ceramic_quote: "« La ceramica è un abbraccio tra terra e fuoco, una traccia della natura che prende forma tra le nostre mani. »",
    parcours_cv_title: "Curriculum Vitae",
    parcours_expos_title: "Principali Esposizioni Recenti",
    parcours_bio_title: "Biografia",
    parcours_bio: "Lise è nata a Bordeaux, in Francia. Si è trasferita in Italia nel 2021, a Vinci, il paese di Leonardo. Inizialmente pianista e insegnante di pianoforte nei conservatori, ha poi studiato pittura decorativa e storia dell'arte alla Scuola del Louvre a Parigi. Dopo una residenza di ceramica a Tokoname, in Giappone, nel 2010, si è dedicata al mondo della ceramica. Ha partecipato a numerosi workshop e simposi in diversi paesi: Corea, Cina, Finlandia, Taiwan, Ungheria... Espone spesso in mostre collettive e talvolta in personali, come nel dicembre 2019 a Mosca. È stata invitata due volte a Mauritius per creare un atelier di ceramica per la popolazione locale. Ama realizzare animali, corpi e sculture monumentali. La condivisione del sapere ceramico è fondamentale per lei. Membro di ArtCeram2 a Sèvres dal 2014 e dell'AIC-IAC dal 2019.",
    parcours_langues: "Lingue parlate: francese, italiano, inglese.\nLingue studiate a scuola: tedesco e russo.",
    form_name_placeholder: "Il tuo nome",
    form_email_placeholder: "La tua email",
    form_subject_placeholder: "Oggetto",
    form_message_placeholder: "Il tuo messaggio",
    form_submit: "Invia il messaggio",
    works_theme_totems: "Totem",
    works_theme_sculptures: "Sculture",
    works_theme_divers: "Varie",
    works_theme_all: "Tutte",
    works_theme_tabourets: "Sgabelli",
    works_theme_animaux: "Animali",
    expo_matres_title: "MATRES - Festival Internazionale di Ceramica Femminile",
    expo_matres_lieu: "Cava de' Tirreni, Italia",
    expo_matres_desc: "Partecipazione al festival internazionale della ceramica femminile, incontri, esposizioni e workshop con artiste da tutto il mondo.",
    expo_tsarytsino_title: "Museo Tsarytsino",
    expo_tsarytsino_lieu: "Mosca, Russia",
    expo_tsarytsino_desc: "Mostra personale di Lise Zambelli e i suoi orsi polari al museo Tsarytsino, Mosca (novembre 2019 – gennaio 2020).",
    expo1_month: "Giugno",
    expo1_year: "2024",
    expo2_month: "Agosto",
    expo2_year: "2022",
    expo3_month: "Dic-Gen",
    expo3_year: "2020",
    works_intro: `<p style="margin-bottom:0.7em;"><em>Durante una residenza artistica in Giappone nel 2010, ho scoperto la libertà creativa dei ceramisti giapponesi. Lì, una semplice ciotola da tè può suscitare tanto interesse e ammirazione quando una scultura monumentale. Questo approccio mi ha profondamente segnata e ha trasformato il mio modo di creare.<br><br>Da allora ho adottato questa visione aperta: la mia produzione si distingue per la sua diversità, sia nei soggetti che nelle forme e nei colori. Ogni pezzo, qualunque sia la sua natura, porta con sé un'intenzione artistica e una cura unica.</em></p><p>Da allora, ho adottato questa visione aperta: la mia produzione si distingue per la sua diversità, sia nei soggetti che nelle forme e nei colori. Ogni pezzo, qualunque sia la sua natura, porta con sé un'intenzione artistica e una cura unica.</p>`,
    works_signature: "Lise Zambelli - Firma",
    gallery_intro: "Durante una residenza artistica in Giappone nel 2010, ho scoperto la libertà creativa dei ceramisti giapponesi. Lì, una semplice ciotola da tè può suscitare tanto interesse e ammirazione quanto una scultura monumentale. Questo approccio mi ha profondamente segnata e ha trasformato il mio modo di creare.<br><br>Da allora ho adottato questa visione aperta: la mia produzione si distingue per la sua diversité, sia nei soggetti che nelle forme e nei colori. Ogni pezzo, qualunque sia la sua natura, porta con sé un'intenzione artistica e una cura unica.",
    expo_2025_lapis_title: "Museo Sotterraneo Lapis – Napoli, Italia",
    expo_2025_lapis_desc: "Mostra nelle gallerie sotterranee dove i napoletani si rifugiavano durante i bombardamenti della Seconda Guerra Mondiale. Un dialogo tra memoria collettiva e materia.",
    expo_2024_terralha_title: "Terralha – Saint-Quentin-la-Poterie (34), Francia",
    expo_2024_terralha_desc: "Festival annuale di ceramica contemporanea. Ogni artista è invitato a esporre presso gli abitanti, in luoghi inaspettati e ricchi di anima.",
    expo_2024_totems_title: "Installazione dei Totem Madame & Monsieur – Sèvres (92), Francia",
    expo_2024_totems_desc: "Dopo la 9a Biennale di ceramica contemporanea, i totem sono stati installati in modo permanente nel cortile del municipio.",
    expo_2024_vinci_title: "Vinci (FI), Italia",
    expo_2024_vinci_desc: "Creazione e donazione di quattro targhe in ceramica alla città di Vinci per celebrare l'anniversario di Leonardo da Vinci.",
    expo_2024_maurice_title: "Isola Mauritius",
    expo_2024_maurice_desc: "Organizzazione e installazione di un laboratorio di ceramica destinato alle donne mauriziane, per una produzione artigianale locale venduta ai turisti.",
    expo_2023_seoul_title: "Seul, Corea del Sud",
    expo_2023_seoul_desc: "Invito dalla galleria Tong-In, specializzata in ceramica antica e contemporanea. Un incontro tra tradizione coreana e creazione contemporanea in un luogo emblematico del patrimonio vivente asiatico.",
    expo_2023_melis_title: "Seconda Competizione di Ceramica – Fratelli Melis, Bosa (Sardegna), Italia",
    expo_2023_melis_desc: "Partecipazione alla competizione. Terzo premio ottenuto per un pezzo contemporaneo che unisce tradizione e sperimentazione.",
    expo_2022_taiwan_title: "Concorso di Tazze da Caffè – Taipei, Taiwan",
    expo_2022_taiwan_desc: "Esplorazione del gesto quotidiano attraverso una forma familiare: la tazza.",
    expo_2020_bhopal_title: "Bhopal, India",
    expo_2020_bhopal_desc: "Mostra collettiva con 8 artisti internazionali. Scambi e incontri con artisti indiani sulla ceramica contemporanea.",
    expo_2019_moscou_title: "Mostra personale – Museo Tsarytsino, Mosca, Russia",
    expo_2019_moscou_desc: "Installazione nell'opera di questo vasto museo. Tema: il riscaldamento globale. Gli orsi polari, messaggeri silenziosi dello scioglimento dei ghiacci, sono stati i protagonisti di questa mostra di fine anno. Manifesto monumentale 4x3 m: Lise Zambelli e i suoi orsi polari",
  },
  en: {
    nav_home: "Home",
    nav_philosophy: "Philosophy",
    nav_journey: "Journey",
    nav_works: "Gallery",
    nav_exhibitions: "Exhibitions",
    nav_workshops: "Workshops",
    nav_contact: "Contact",
    nav_job: "Ceramist",
    hero_title: "Lise Zambelli",
    hero_subtitle: "Ceramic Artist",
    hero_text: "Create with earth, give life to matter, share the essence of natural beauty",
    hero_cta: "Discover my works",
    hero_name: "Lise Zambelli",
    hero_job: "Ceramist",
    philosophy_title: "My Philosophy",
    philo_expo_title: "Exhibition at Tsarytsino Museum",
    philo_expo_text: "My work as a ceramist was presented at the exhibition at the Tsarytsino Museum in Moscow. It was a unique opportunity to share my creations and discuss contemporary ceramics in a prestigious and inspiring setting.",
    philo_beauty_title: "The Essence of Beauty",
    philo_beauty_text: "I seek to capture the very essence of natural beauty, that which emanates from imperfect perfection, from organic forms and textures that tell a story. My creations are not mere objects, but witnesses to a moment, an emotion, a reflection on our relationship with the world.",
    philo_why_title: "The Why of My Work",
    philo_why_text: "In an increasingly dematerialized world, I feel a deep need to create tangible objects, full of meaning and emotion. Ceramics allow me to materialize my thoughts, dreams, and questions about beauty, the ephemeral, and the eternal.",
    journey_title: "My Journey",
    journey_2020_title: "2020 - Today",
    journey_2020_subtitle: "Personal Studio",
    journey_2020_text: "Development of my own artistic signature, exploration of new techniques and materials, creation of unique works reflecting my personal and artistic evolution.",
    journey_2018_title: "2018 - 2020",
    journey_2018_subtitle: "Advanced Training",
    journey_2018_text: "Advanced training with master ceramists, learning traditional and contemporary techniques, developing a personal approach to creation.",
    journey_2015_title: "2015 - 2018",
    journey_2015_subtitle: "First Steps",
    journey_2015_text: "Discovery of ceramics, first experiments, learning technical basics and developing artistic sensitivity.",
    works_title: "Gallery",
    work_totems: "Lise's Totems",
    work_cdef: "C definitive",
    work_19: "19",
    work_14: "14",
    work_7: "7",
    work_1: "1",
    exhibitions_title: "Some Past Exhibitions",
    expo_terre_title: "\"Dialogues with the Earth\"",
    expo_terre_lieu: "Contemporary Art Gallery, Paris",
    expo_terre_desc: "Solo exhibition presenting a selection of recent works exploring the dialogue between artist and material.",
    expo_contemp_title: "\"Contemporary Ceramics\"",
    expo_contemp_lieu: "Museum of Decorative Arts, Lyon",
    expo_contemp_desc: "Group exhibition highlighting new trends in contemporary ceramics.",
    expo_mat_title: "\"Materials and Forms\"",
    expo_mat_lieu: "Contemporary Art Center, Marseille",
    expo_mat_desc: "Participation in a group exhibition exploring the relationship between materials and creativity.",
    expo_salon_title: "\"Artisans' Fair\"",
    expo_salon_lieu: "Exhibition Park, Nantes",
    expo_salon_desc: "Presentation of my 'Terre' collection at the annual artisans' fair.",
    workshops_title: "Workshops",
    workshops_intro_title: "Ceramics Workshop",
    workshops_intro_text: "Dive into the fascinating world of ceramics: shape the clay, explore textures, colors and forms, and unleash your creativity through the gestures of modeling, glazing and firing.",
    workshop1_title: "RAKU Firing",
    workshop1_date: "<strong>Date:</strong> September 15, 2024",
    workshop1_lieu: "<strong>Location:</strong> Studio near Florence",
    workshop1_text: "A technique I particularly love.\nAppearing in the 16th century in Kyoto, RAKU firing was developed by Chōjirō for the tea ceremony.\nThe word 'Raku' means joy or comfort in Japanese — and that's exactly what I feel every time the pieces come out of the kiln, still glowing, before being smoked in sawdust.\nThe cracks in the glaze, always different, give each creation a unique and unpredictable character.\nA technique that is both spontaneous, delicate, and deeply expressive.",
    workshop2_title: "Creative Workshop: Screen Printing",
    workshop2_date: "<strong>Date:</strong> May 12-18, 2025",
    workshop2_lieu: "<strong>Location:</strong> Vinci, Tuscany",
    workshop2_text: `<li>Frame and drawing preparation</li><li>Clay preparation</li><li>Canvas induction</li><li>Screen printing on clay</li><li>Further frames to master the technique</li>`,
    workshop3_title: "Knowledge and Emotion",
    workshop3_date: "<strong>Date:</strong> November 9, 2024",
    workshop3_lieu: "<strong>Location:</strong> Maison de la Culture, Nantes",
    workshop3_text: "Reconnect to the source, untie the gaze from the ordinary, and make life a permanent experience of beauty, where every moment pulses like a living work of art.",
    contact_title: "Contact",
    contact_intro_title: "Let's Work Together",
    contact_intro_text: "Would you like to discover my works, order a unique piece or organize an exhibition? Feel free to contact me.",
    contact_email: "lise.zambelli@gmail.com",
    contact_tel: "+33 6 85 90 29 92 (FR) / +39 328 854 7857 (IT)",
    contact_atelier: '<a href="https://www.google.com/maps?q=Via+Campagliana+35,+50059+VINCI+(FIRENZE),+Italy" target="_blank" style="color:#bfa77a;text-decoration:underline;">Via Campagliana 35, 50059 VINCI (FIRENZE), Italy</a>',
    footer_name: "Lise Zambelli",
    footer_desc: "Ceramic artist passionate about natural beauty and artistic expression through clay.",
    footer_nav_home: "Home",
    footer_nav_philosophy: "Philosophy",
    footer_nav_journey: "Journey",
    footer_nav_works: "Works",
    footer_nav_exhibitions: "Exhibitions",
    footer_nav_workshops: "Workshops",
    footer_nav_contact: "Contact",
    footer_contact_title: "Contact",
    footer_contact_email: "lise.zambelli@gmail.com",
    footer_contact_atelier: '<a href="https://www.google.com/maps?q=Via+Campagliana+35,+50059+VINCI+(FIRENZE),+Italy" target="_blank" style="color:#bfa77a;text-decoration:underline;">Studio near Florence</a>',
    footer_copyright: "&copy; 2024 Lise Zambelli. All rights reserved.",
    ceramic_quote: "« Ceramics is an embrace of earth and fire, a trace of nature taking shape in our hands. »",
    parcours_cv_title: "Curriculum Vitae",
    parcours_expos_title: "Main Recent Exhibitions",
    parcours_bio_title: "Biography",
    parcours_bio: "Lise was born in Bordeaux, France. She moved to Italy in 2021, to Vinci, the village of Leonardo. First a pianist and piano teacher, she then studied decorative painting and art history at the Louvre School in Paris. After a ceramics residency in Tokoname, Japan, in 2010, she devoted herself to ceramics. Many workshops and symposiums in different countries: Korea, China, Finland, Taiwan, Hungary... Exhibitions often shared, sometimes solo, as in December 2019 in Moscow. She was invited to Mauritius to set up a ceramics workshop for locals. She likes to create animals, bodies, and monumental sculptures. Sharing ceramic knowledge is essential for her. Member of ArtCeram2 in Sèvres since 2014 and of AIC-IAC since 2019.",
    parcours_langues: "Languages spoken: French, Italian, English.\nLanguages studied at school: German and Russian.",
    form_name_placeholder: "Your name",
    form_email_placeholder: "Your email",
    form_subject_placeholder: "Subject",
    form_message_placeholder: "Your message",
    form_submit: "Send message",
    works_theme_totems: "Totems",
    works_theme_sculptures: "Sculptures",
    works_theme_divers: "Miscellaneous",
    works_theme_all: "All",
    works_theme_tabourets: "Stools",
    works_theme_animaux: "Animals",
    expo_matres_title: "MATRES - Festival Internazionale di Ceramica Femminile",
    expo_matres_lieu: "Cava de' Tirreni, Italy",
    expo_matres_desc: "Participation in the international festival of women ceramics, meetings, exhibitions and workshops with artists from all over the world.",
    expo_tsarytsino_title: "Tsarytsino museum",
    expo_tsarytsino_lieu: "Moscow, Russia",
    expo_tsarytsino_desc: "Solo exhibition of Lise Zambelli and her polar bears at the Tsarytsino museum, Moscow (November 2019 – January 2020).",
    expo1_month: "June",
    expo1_year: "2024",
    expo2_month: "August",
    expo2_year: "2022",
    expo3_month: "Dec-Jan",
    expo3_year: "2020",
    works_intro: `<p style="margin-bottom:0.7em;"><em>During an artist residency in Japan in 2010, I discovered the creative freedom of Japanese ceramists. There, a simple tea bowl can inspire as much interest and admiration as a monumental sculpture. This approach deeply influenced me and transformed my way of creating.</em></p><p>Since then, I have embraced this open vision: my work stands out for its diversity, both in subjects and in shapes and colors. Each piece, whatever its nature, carries an artistic intention and unique care.</p>`,
    works_signature: "Lise Zambelli - Signature",
    gallery_intro: "During an artist residency in Japan in 2010, I discovered the creative freedom of Japanese ceramists. There, a simple tea bowl can inspire as much interest and admiration as a monumental sculpture. This approach deeply influenced me and transformed my way of creating.<br><br>Since then, I have embraced this open vision: my work stands out for its diversity, both in subjects and in shapes and colors. Each piece, whatever its nature, carries an artistic intention and unique care.",
    expo_2025_lapis_title: "Lapis Underground Museum – Naples, Italy",
    expo_2025_lapis_desc: "Exhibition in the underground galleries where Neapolitans took refuge during World War II bombings. A dialogue between collective memory and material.",
    expo_2024_terralha_title: "Terralha – Saint-Quentin-la-Poterie (34), France",
    expo_2024_terralha_desc: "Annual contemporary ceramics festival. Each artist is invited to exhibit in a local's home, in unexpected and soulful places.",
    expo_2024_totems_title: "Installation of Madame & Monsieur Totems – Sèvres (92), France",
    expo_2024_totems_desc: "Following the 9th Contemporary Ceramics Biennale, the totems were permanently installed in the town hall courtyard.",
    expo_2024_vinci_title: "Vinci (FI), Italy",
    expo_2024_vinci_desc: "Creation and donation of four ceramic plaques to the city of Vinci to celebrate Leonardo da Vinci's anniversary.",
    expo_2024_maurice_title: "Mauritius Island",
    expo_2024_maurice_desc: "Organization and installation of a ceramics workshop for Mauritian women, for local artisanal production sold to tourists.",
    expo_2023_seoul_title: "Seoul, South Korea",
    expo_2023_seoul_desc: "Invitation by the Tong-In gallery, specialized in ancient and contemporary ceramics. A meeting between Korean tradition and contemporary creation in an emblematic place of Asian living heritage.",
    expo_2023_melis_title: "Second Ceramics Competition – Melis Brothers, Bosa (Sardinia), Italy",
    expo_2023_melis_desc: "Participation in the competition. Third prize awarded for a contemporary piece blending tradition and experimentation.",
    expo_2022_taiwan_title: "Coffee Cup Competition – Taipei, Taiwan",
    expo_2022_taiwan_desc: "Exploring the gesture of everyday life through a familiar form: the cup.",
    expo_2020_bhopal_title: "Bhopal, India",
    expo_2020_bhopal_desc: "Group exhibition with 8 international artists. Exchanges and meetings with Indian artists around contemporary ceramics.",
    expo_2019_moscou_title: "Solo Exhibition – Tsarytsino Museum, Moscow, Russia",
    expo_2019_moscou_desc: "Installation in the opera house of this vast museum. Theme: global warming. Polar bears, silent messengers of melting ice, were the protagonists of this end-of-year exhibition. Monumental 4x3 m poster: Lise Zambelli and her polar bears",
  }
};

// Liste des clés de traduction qui contiennent du HTML à insérer avec innerHTML
const i18nHtmlKeys = [
  'workshop1_date',
  'workshop1_lieu',
  'workshop2_date',
  'workshop2_lieu',
  'workshop2_text',
  'workshop3_date',
  'workshop3_lieu',
  'contact_atelier',
  'footer_contact_atelier',
  'footer_copyright',
  'works_intro', // Ajout de la clé pour l'intro des œuvres
  'gallery_intro', // Ajout pour la galerie
  // Ajoute ici d'autres clés si besoin
];

function updateI18nTexts(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[lang][key];
    if (el.classList.contains('theme-title')) {
      console.log('Traduction thème:', key, '->', translation);
    }
    if (translation !== undefined) {
      if (i18nHtmlKeys.includes(key)) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
      el.style.display = '';
    }
  });
  // Placeholders dynamiques
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = translations[lang][key];
    if (translation !== undefined) {
      el.setAttribute('placeholder', translation);
    }
  });
}

// === Fin des fonctions utilitaires ===

// Afficher la première catégorie par défaut au chargement
// (sans démarrer le diaporama)
document.addEventListener('DOMContentLoaded', function() {
  const firstBtn = document.querySelector('.filter-btn');
  if (firstBtn) {
    firstBtn.classList.add('active');
    const theme = firstBtn.getAttribute('data-theme');
    console.log('[DEBUG] showOnlyGroup called with:', theme);
    if (theme) {
      showOnlyGroup(theme);
    } else {
      // Si aucun thème, tout afficher
      document.querySelectorAll('.works-group').forEach(function(group) {
        group.style.display = 'block';
      });
    }
  }
});

 
