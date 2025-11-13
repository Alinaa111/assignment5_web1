
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
  updateProgressBar(stepIndex);
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
      <h3 class="step-heading">Step 3: Review & Confirm</h3>
      <div class="review-container">
        <div class="review-section">
          <h4 class="review-title">Personal Information</h4>
          <p class="review-item"><strong class="review-label">Name:</strong> <span class="review-value">${data.step1.fullname || 'N/A'}</span></p>
          <p class="review-item"><strong class="review-label">Email:</strong> <span class="review-value">${data.step1.email || 'N/A'}</span></p>
          <p class="review-item"><strong class="review-label">Phone:</strong> <span class="review-value">${data.step1.phone || 'N/A'}</span></p>
        </div>
        
        <div class="review-section review-section-divider">
          <h4 class="review-title">Message Details</h4>
          <p class="review-item"><strong class="review-label">Subject:</strong> <span class="review-value">${data.step2.subject || 'N/A'}</span></p>
          <p class="review-item"><strong class="review-label">Priority:</strong> <span class="review-value">${data.step2.priority || 'N/A'}</span></p>
          <p class="review-item"><strong class="review-label">Message:</strong></p>
          <div class="review-message-box">${data.step2.message || 'N/A'}</div>
        </div>
      </div>
      
      <div class="form-group terms-checkbox-group">
        <label class="terms-label">
          <input type="checkbox" id="agree-terms" class="terms-checkbox" required>
          <span class="terms-text">I agree to the terms and conditions *</span>
        </label>
      </div>
    </div>
  `;
  break;
  }
  const container = document.getElementById('form-steps-container');
  if (container) {
    container.innerHTML = stepHTML;
  }
  callback(stepHTML);
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-next') || e.target.closest('.btn-next')) {
    e.preventDefault();
    
    if (formState.currentStep < 2) {
      // Save current step data
      saveCurrentStepData();
      
      // Move to next step
      formState.currentStep++;
      
      // This will automatically update progress bar
      displayStepContent(formState.currentStep);
      
      // Update button visibility
      updateNavigationButtons();
    }
  }
  
  if (e.target.classList.contains('btn-prev') || e.target.closest('.btn-prev')) {
    e.preventDefault();
    
    if (formState.currentStep > 0) {
      // Move to previous step
      formState.currentStep--;
      
      // This will automatically update progress bar
      displayStepContent(formState.currentStep);
      
      // Update button visibility
      updateNavigationButtons();
    }
  }
});

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
function updateProgressBar(currentStep) {
  // Update progress step circles
  const progressSteps = document.querySelectorAll('.progress-step');
  progressSteps.forEach((step, index) => {
    if (index <= currentStep) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
  
  // Update progress lines
  const progressLines = document.querySelectorAll('.progress-line');
  progressLines.forEach((line, index) => {
    if (index < currentStep) {
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