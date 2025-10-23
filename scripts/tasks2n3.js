// ============================================
// ORIGINAL CODE: ACCORDION FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // accordion buttons
    const accordionButtons = document.querySelectorAll('.accordion-button');

    // click event listener for each button
    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            // get the target content ID from data-target attribute
            const targetId = this.getAttribute('data-target');
            const contentElement = document.querySelector(targetId);

            // check if this accordion item is already open
            const isOpen = contentElement.classList.contains('show');

            // close all other accordion items
            document.querySelectorAll('.accordion-content').forEach(content => {
                content.classList.remove('show');
            });

            document.querySelectorAll('.accordion-button').forEach(btn => {
                btn.classList.add('collapsed');
            });

            // toggle current item if it wasn't open
            if (!isOpen) {
                contentElement.classList.add('show');
                this.classList.remove('collapsed');
            }
        });
    });
});

// ============================================
// ORIGINAL CODE: POPUP MODAL FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // modal elements
    const subscribeModal = document.getElementById('subscribeModal');
    const contactModal = document.getElementById('contactModal');
    const openSubscribeBtn = document.getElementById('openSubscribeBtn');
    const openContactBtn = document.getElementById('openContactBtn');

    // Check if modals exist before adding event listeners
    if (openSubscribeBtn && subscribeModal) {
        // open 'Subscribe' Modal
        openSubscribeBtn.addEventListener('click', function () {
            subscribeModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    if (openContactBtn && contactModal) {
        // open 'Contact' Modal
        openContactBtn.addEventListener('click', function () {
            contactModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    // close modal function
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    // close buttons in modals
    document.querySelectorAll('[data-close]').forEach(closeBtn => {
        closeBtn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (subscribeModal && event.target === subscribeModal) {
            closeModal(subscribeModal);
        }
        if (contactModal && event.target === contactModal) {
            closeModal(contactModal);
        }
    });

    // close modal when esc
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal(subscribeModal);
            closeModal(contactModal);
        }
    });

    // submit 'Subscribe'
    const submitSubscribe = document.getElementById('submitSubscribe');
    if (submitSubscribe) {
        submitSubscribe.addEventListener('click', function (event) {
            const form = document.getElementById('subscribeForm');
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            // show success message
            document.getElementById('subscribeSuccess').classList.add('show');
            form.reset();

            // close modal after 2 seconds
            setTimeout(function () {
                closeModal(subscribeModal);
                document.getElementById('subscribeSuccess').classList.remove('show');
            }, 2000);
        });
    }

    // submit 'Contact'
    const submitContact = document.getElementById('submitContact');
    if (submitContact) {
        submitContact.addEventListener('click', function (event) {
            const form = document.getElementById('contactForm');
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            // show success message
            document.getElementById('contactSuccess').classList.add('show');
            form.reset();

            // close modal after 2 seconds
            setTimeout(function () {
                closeModal(contactModal);
                document.getElementById('contactSuccess').classList.remove('show');
            }, 2000);
        });
    }
});

// ============================================
// ORIGINAL CODE: CAROUSEL
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // carousel vars
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');
    const slideCounter = document.getElementById('slideCounter');
    const carousel = document.querySelector('.carousel-inner');

    // Only initialize carousel if elements exist
    if (!items.length || !prevBtn || !nextBtn) return;

    let currentSlide = 0;
    const totalSlides = items.length;
    let autoPlayInterval;

    // indicators
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }

    const indicators = document.querySelectorAll('.indicator');

    // show slide
    function showSlide(n) {
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        items[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        slideCounter.textContent = `Slide ${currentSlide + 1} of ${totalSlides}`;
    }

    // next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // go to slide
    function goToSlide(n) {
        currentSlide = n;
        showSlide(currentSlide);
        resetAutoPlay();
    }

    // auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    // reset auto-play timer
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    // pause on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }

    // start auto-play on load
    startAutoPlay();

    // ============================================
    // KEYBOARD CONTROLS FOR CAROUSEL
    // ============================================
    
    // Add keyboard navigation for carousel (Arrow Left/Right)
    document.addEventListener('keydown', (e) => {
        // Only work if carousel exists and focus is NOT on navigation menu
        const focusedElement = document.activeElement;
        const isNavLink = focusedElement.matches('.nav_main a, .nav_right a');
        
        // If user is navigating menu, don't control carousel
        if (isNavLink) return;
        
        if (e.key === 'ArrowLeft' || e.key === '<') {
            e.preventDefault();
            prevSlide();
            resetAutoPlay();
            console.log('⬅ Carousel: Previous slide (keyboard)');
        } else if (e.key === 'ArrowRight' || e.key === '>') {
            e.preventDefault();
            nextSlide();
            resetAutoPlay();
            console.log('➡ Carousel: Next slide (keyboard)');
        }
    });
    
    console.log('✓ Carousel initialized with keyboard controls (← and →)');
});

// ============================================
// NEW: TASK 2 - KEYBOARD EVENT HANDLING
// ============================================

function initKeyboardNavigation() {
  // Select all navigation links from both nav_main and nav_right
  const navLinks = document.querySelectorAll('.nav_main a, .nav_right a');
  
  if (navLinks.length === 0) return;
  
  let currentIndex = -1;
  
  // Add tabindex and data attributes
  navLinks.forEach((link, index) => {
    link.setAttribute('tabindex', index === 0 ? '0' : '-1');
    link.setAttribute('data-nav-index', index);
  });
  
  // Keyboard event handler
  document.addEventListener('keydown', (e) => {
    const focusedElement = document.activeElement;
    const isFocusedOnNav = Array.from(navLinks).includes(focusedElement);
    
    if (!isFocusedOnNav) return;
    
    currentIndex = parseInt(focusedElement.getAttribute('data-nav-index'));
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % navLinks.length;
      focusNavItem(navLinks, currentIndex);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
      focusNavItem(navLinks, currentIndex);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusNavItem(navLinks, 0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusNavItem(navLinks, navLinks.length - 1);
    }
  });
  
  // Add visual focus styles with animation
  navLinks.forEach(link => {
    link.addEventListener('focus', () => {
      link.style.outline = '3px solid #00b4d8';
      link.style.outlineOffset = '4px';
      link.style.transform = 'scale(1.05)';
      link.style.transition = 'all 0.3s ease';
      
      // Color animation on focus
      animateColor(link, '#161618', '#00b4d8', 300);
    });
    
    link.addEventListener('blur', () => {
      link.style.outline = '';
      link.style.outlineOffset = '';
      link.style.transform = '';
      link.style.color = '';
    });
  });
  
  console.log('✓ Keyboard navigation initialized for', navLinks.length, 'items');
}

function focusNavItem(navLinks, index) {
  navLinks.forEach((link, i) => {
    link.setAttribute('tabindex', i === index ? '0' : '-1');
  });
  navLinks[index].focus();
}

// ============================================
// NEW: TASK 3 - COLOR ANIMATIONS
// ============================================

function animateColor(element, startColor, endColor, duration) {
  element.style.transition = `color ${duration}ms ease`;
  element.style.color = endColor;
  
  setTimeout(() => {
    element.style.color = startColor;
  }, duration);
}

function addAccordionAnimations() {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  
  accordionButtons.forEach(button => {
    // Hover color animation
    button.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.transform = 'translateX(5px)';
      this.style.backgroundColor = '#e8f7fb';
    });
    
    button.addEventListener('mouseleave', function() {
      if (this.classList.contains('collapsed')) {
        this.style.transform = '';
        this.style.backgroundColor = '#f9f9f9';
      }
    });
  });
}

function addCarouselAnimations() {
  const carouselItems = document.querySelectorAll('.carousel-item');
  
  carouselItems.forEach(item => {
    const content = item.querySelector('.carousel-item-content');
    if (content) {
      // Add transition when item becomes active
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            if (item.classList.contains('active')) {
              content.style.transform = 'scale(1)';
              content.style.opacity = '1';
              content.style.transition = 'all 0.6s ease';
            } else {
              content.style.transform = 'scale(0.95)';
              content.style.opacity = '0';
            }
          }
        });
      });
      
      observer.observe(item, { attributes: true });
    }
  });
  
  // Add color animation to controls
  const controls = document.querySelectorAll('.carousel-control');
  controls.forEach(control => {
    control.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.backgroundColor = '#00b4d8';
      this.style.transform = 'translateY(-50%) scale(1.15)';
    });
    
    control.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'rgba(0, 180, 216, 0.7)';
      this.style.transform = 'translateY(-50%) scale(1)';
    });
  });
}

function addModalAnimations() {
  const modalButtons = document.querySelectorAll('.btn-popup');
  
  modalButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.transform = 'translateY(-3px) scale(1.05)';
      this.style.boxShadow = '0 8px 25px rgba(0, 119, 182, 0.4)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '';
    });
    
    button.addEventListener('click', function() {
      // Click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
}
