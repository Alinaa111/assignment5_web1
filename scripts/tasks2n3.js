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

// ============================================
// NEW: TASK 3 - MULTI-STEP FORM
// ============================================

const formState = {
  currentStep: 0,
  totalSteps: 3,
  formData: {
    step1: {},
    step2: {},
    step3: {}
  }
};

function initMultiStepForm() {
  const formContainer = document.getElementById('multi-step-contact-form');
  
  if (!formContainer) return;
  
  renderMultiStepForm(formContainer);
  console.log('✓ Multi-step form initialized');
}

function renderMultiStepForm(container) {
  container.innerHTML = `
    <div class="form-wrapper">
      <h2 style="text-align: center; color: #161618; margin-bottom: 30px; font-size: 2rem;">Contact Us - Multi-Step Form</h2>
      
      <div class="progress-bar">
        <div class="progress-step ${formState.currentStep >= 0 ? 'active' : ''}" data-step="0">
          <div class="step-circle">1</div>
          <span class="step-label">Personal Info</span>
        </div>
        <div class="progress-line ${formState.currentStep >= 1 ? 'active' : ''}"></div>
        <div class="progress-step ${formState.currentStep >= 1 ? 'active' : ''}" data-step="1">
          <div class="step-circle">2</div>
          <span class="step-label">Message</span>
        </div>
        <div class="progress-line ${formState.currentStep >= 2 ? 'active' : ''}"></div>
        <div class="progress-step ${formState.currentStep >= 2 ? 'active' : ''}" data-step="2">
          <div class="step-circle">3</div>
          <span class="step-label">Review</span>
        </div>
      </div>
      
      <form id="contact-form" class="multi-step-form-content">
        <div id="form-steps-container"></div>
        
        <div class="form-navigation">
          <button type="button" id="back-btn" class="btn-modal btn-cancel" style="display: none;">
            ← Back
          </button>
          <button type="button" id="next-btn" class="btn-modal btn-submit">
            Next →
          </button>
          <button type="submit" id="submit-btn" class="btn-modal btn-submit" style="display: none;">
            Submit
          </button>
        </div>
        
        <div id="form-message" class="success-message" style="display: none; margin-top: 20px;"></div>
      </form>
    </div>
  `;
  
  renderCurrentStep();
  attachFormEventListeners();
}

function renderCurrentStep() {
  const stepsContainer = document.getElementById('form-steps-container');
  const backBtn = document.getElementById('back-btn');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  
  backBtn.style.display = formState.currentStep > 0 ? 'inline-block' : 'none';
  nextBtn.style.display = formState.currentStep < formState.totalSteps - 1 ? 'inline-block' : 'none';
  submitBtn.style.display = formState.currentStep === formState.totalSteps - 1 ? 'inline-block' : 'none';
  
  displayStepContent(formState.currentStep, (stepHTML) => {
    stepsContainer.innerHTML = stepHTML;
    populateFormFields();
    addFormFieldAnimations();
  });
}

function displayStepContent(stepIndex, callback) {
  let stepHTML = '';
  
  switch(stepIndex) {
    case 0:
      stepHTML = `
        <div class="form-step active">
          <h3 style="color: #0077b6; margin-bottom: 20px; font-size: 1.5rem;">Step 1: Personal Information</h3>
          <div class="form-group">
            <label for="fullname">Full Name *</label>
            <input type="text" id="fullname" name="fullname" placeholder="Aisha Yerbolat" required>
          </div>
          <div class="form-group">
            <label for="email">Email Address *</label>
            <input type="email" id="email" name="email" placeholder="aisha@sigma.com" required>
          </div>
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="+7 777 123 4567">
          </div>
        </div>
      `;
      break;
      
    case 1:
      stepHTML = `
        <div class="form-step active">
          <h3 style="color: #0077b6; margin-bottom: 20px; font-size: 1.5rem;">Step 2: Your Message</h3>
          <div class="form-group">
            <label for="subject">Subject *</label>
            <select id="subject" name="subject" required style="width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 6px; font-size: 1rem;">
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="feedback">Feedback</option>
              <option value="membership">Membership Question</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">Message *</label>
            <textarea id="message" name="message" rows="6" placeholder="Tell us how we can help..." required></textarea>
          </div>
          <div class="form-group">
            <label for="priority">Priority</label>
            <select id="priority" name="priority" style="width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 6px; font-size: 1rem;">
              <option value="low">Low</option>
              <option value="medium" selected>Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      `;
      break;
      
    case 2:
      const data = formState.formData;
      stepHTML = `
        <div class="form-step active">
          <h3 style="color: #0077b6; margin-bottom: 20px; font-size: 1.5rem;">Step 3: Review & Confirm</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #00b4d8;">
            <h4 style="color: #00b4d8; margin-bottom: 15px; font-size: 1.1rem;">Personal Information</h4>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${data.step1.fullname || 'N/A'}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${data.step1.email || 'N/A'}</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${data.step1.phone || 'N/A'}</p>
            
            <h4 style="color: #00b4d8; margin-top: 20px; margin-bottom: 15px; font-size: 1.1rem; padding-top: 15px; border-top: 1px solid #dee2e6;">Message Details</h4>
            <p style="margin: 8px 0;"><strong>Subject:</strong> ${data.step2.subject || 'N/A'}</p>
            <p style="margin: 8px 0;"><strong>Priority:</strong> ${data.step2.priority || 'N/A'}</p>
            <p style="margin: 8px 0;"><strong>Message:</strong></p>
            <p style="background: #fff; padding: 15px; border-radius: 6px; margin-top: 10px; font-style: italic; border: 1px solid #dee2e6;">${data.step2.message || 'N/A'}</p>
          </div>
          <div class="form-group" style="margin-top: 20px;">
            <label style="display: flex; align-items: center; cursor: pointer;">
              <input type="checkbox" id="agree-terms" required style="margin-right: 10px; width: 20px; height: 20px; cursor: pointer;">
              <span>I agree to the terms and conditions *</span>
            </label>
          </div>
        </div>
      `;
      break;
  }
  
  callback(stepHTML);
}

function attachFormEventListeners() {
  const form = document.getElementById('contact-form');
  const backBtn = document.getElementById('back-btn');
  const nextBtn = document.getElementById('next-btn');
  
  backBtn.addEventListener('click', () => {
    saveCurrentStepData();
    handleStepNavigation(-1, () => {
      formState.currentStep--;
      renderCurrentStep();
    });
  });
  
  nextBtn.addEventListener('click', () => {
    if (validateCurrentStep()) {
      saveCurrentStepData();
      handleStepNavigation(1, () => {
        formState.currentStep++;
        renderCurrentStep();
      });
    }
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const agreeCheckbox = document.getElementById('agree-terms');
    if (!agreeCheckbox || !agreeCheckbox.checked) {
      showFormMessage('Please agree to the terms and conditions', 'error');
      return;
    }
    
    saveCurrentStepData();
    submitFormData((success, message) => {
      if (success) {
        showFormMessage(message, 'success');
        setTimeout(() => resetForm(), 3000);
      } else {
        showFormMessage(message, 'error');
      }
    });
  });
}

function handleStepNavigation(direction, callback) {
  const container = document.getElementById('form-steps-container');
  
  container.style.transition = 'all 0.3s ease';
  container.style.opacity = '0';
  container.style.transform = `translateX(${direction * 30}px)`;
  
  setTimeout(() => {
    callback();
    container.style.opacity = '1';
    container.style.transform = 'translateX(0)';
  }, 300);
  
  updateProgressBar();
}

function updateProgressBar() {
  const steps = document.querySelectorAll('.progress-step');
  const lines = document.querySelectorAll('.progress-line');
  
  steps.forEach((step, index) => {
    const circle = step.querySelector('.step-circle');
    if (index <= formState.currentStep) {
      step.classList.add('active');
      circle.style.transition = 'all 0.4s ease';
      circle.style.backgroundColor = '#00b4d8';
      circle.style.transform = 'scale(1.1)';
      setTimeout(() => {
        circle.style.transform = 'scale(1)';
      }, 400);
    } else {
      step.classList.remove('active');
    }
  });
  
  lines.forEach((line, index) => {
    if (index < formState.currentStep) {
      line.classList.add('active');
    } else {
      line.classList.remove('active');
    }
  });
}

function validateCurrentStep() {
  const currentStepElement = document.querySelector('.form-step.active');
  const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
  
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.transition = 'all 0.3s ease';
      input.style.borderColor = '#e63946';
      input.style.backgroundColor = '#ffe6e6';
      isValid = false;
      
      setTimeout(() => {
        input.style.borderColor = '#e0e0e0';
        input.style.backgroundColor = '#fff';
      }, 2000);
    }
  });
  
  if (!isValid) {
    showFormMessage('Please fill in all required fields', 'error');
  }
  
  return isValid;
}

function saveCurrentStepData() {
  const stepKey = `step${formState.currentStep + 1}`;
  const inputs = document.querySelectorAll('.form-step.active input, .form-step.active select, .form-step.active textarea');
  
  inputs.forEach(input => {
    if (input.type !== 'checkbox') {
      formState.formData[stepKey][input.name] = input.value;
    }
  });
}

function populateFormFields() {
  const stepKey = `step${formState.currentStep + 1}`;
  const savedData = formState.formData[stepKey];
  
  Object.keys(savedData).forEach(fieldName => {
    const input = document.querySelector(`[name="${fieldName}"]`);
    if (input) {
      input.value = savedData[fieldName];
    }
  });
}

function submitFormData(callback) {
  const formMessage = document.getElementById('form-message');
  formMessage.style.display = 'block';
  formMessage.className = 'success-message show';
  formMessage.style.backgroundColor = '#d1ecf1';
  formMessage.style.color = '#0c5460';
  formMessage.textContent = 'Submitting your message...';
  
  setTimeout(() => {
    const success = true;
    
    if (success) {
      formMessage.style.backgroundColor = '#d4edda';
      formMessage.style.color = '#155724';
      callback(true, '✓ Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
    } else {
      formMessage.style.backgroundColor = '#f8d7da';
      formMessage.style.color = '#721c24';
      callback(false, '✗ Sorry, there was an error. Please try again.');
    }
  }, 1500);
}

function showFormMessage(message, type) {
  const formMessage = document.getElementById('form-message');
  formMessage.textContent = message;
  formMessage.className = 'success-message show';
  formMessage.style.display = 'block';
  
  if (type === 'error') {
    formMessage.style.backgroundColor = '#f8d7da';
    formMessage.style.color = '#721c24';
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 4000);
  } else {
    formMessage.style.backgroundColor = '#d4edda';
    formMessage.style.color = '#155724';
  }
}

function resetForm() {
  formState.currentStep = 0;
  formState.formData = { step1: {}, step2: {}, step3: {} };
  renderCurrentStep();
}

function addFormFieldAnimations() {
  const inputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
  
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.borderColor = '#00b4d8';
      this.style.transform = 'scale(1.02)';
      this.style.boxShadow = '0 0 0 3px rgba(0, 180, 216, 0.1)';
    });
    
    input.addEventListener('blur', function() {
      this.style.borderColor = '#e0e0e0';
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
  });
}

// ============================================
// INITIALIZATION - ALL FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✓ Task 2 & 3 Script Loaded - Complete Version');
  
  // Initialize keyboard navigation (for both pages)
  initKeyboardNavigation();
  
  // Initialize accordion animations (FAQ page)
  addAccordionAnimations();
  
  // Initialize carousel animations (About page)
  addCarouselAnimations();
  
  // Initialize modal animations (FAQ page)
  addModalAnimations();
  
  // Initialize multi-step form (FAQ page)
  initMultiStepForm();
  
  console.log('✓ All features initialized successfully');
});