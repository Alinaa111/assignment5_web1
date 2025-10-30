// ============================================
// TASK 6: LOADING SPINNER ON SUBMIT BUTTON
// ============================================

(function() {
  'use strict';

  let isSubmitting = false;
  let isInitialized = false;

  // Initialize loading spinner functionality
  function initLoadingSpinner() {
    // Wait for the multi-step form to be rendered
    setTimeout(() => {
      const submitButton = document.getElementById('submit-btn');
      
      if (!submitButton) {
        return;
      }

      // Check if button already has spinner (prevent double initialization)
      if (submitButton.querySelector('.spinner-container')) {
        return;
      }

      // Wrap button text and add spinner elements
      enhanceSubmitButton(submitButton);

      // Only override form submission once
      if (!isInitialized) {
        overrideFormSubmission();
        isInitialized = true;
        console.log('✓ Loading spinner initialized on submit button');
      }
    }, 100);
  }

  // Enhance submit button with spinner structure
  function enhanceSubmitButton(button) {
    // Get original text, trim it to avoid duplicates
    const originalText = button.textContent.trim();
    
    // Only use "Submit" as the text (ignore any existing duplicates)
    const cleanText = originalText.includes('Submit') ? 'Submit' : originalText;
    
    button.innerHTML = `
      <span class="btn-text">${cleanText}</span>
      <span class="spinner-container">
        <span class="spinner"></span>
        <span class="loading-text">Please wait...</span>
      </span>
    `;
  }

  // Override the existing form submission to add loading states
  function overrideFormSubmission() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;

    // Remove existing submit event listeners by cloning
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    // Add new submit handler with loading spinner
    newForm.addEventListener('submit', handleFormSubmit);

    // Re-attach other event listeners for navigation buttons
    reattachNavigationListeners();
  }

  // Handle form submission with loading spinner
  function handleFormSubmit(e) {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    const submitBtn = document.getElementById('submit-btn');
    const agreeCheckbox = document.getElementById('agree-terms');

    // Validate terms agreement
    if (!agreeCheckbox || !agreeCheckbox.checked) {
      showFormMessage('Please agree to the terms and conditions', 'error');
      shakeButton(submitBtn);
      return;
    }

    // Start loading state
    isSubmitting = true;
    setButtonLoadingState(submitBtn, true);

    // Simulate form submission (replace with actual API call)
    simulateFormSubmission()
      .then(() => {
        // Success
        setButtonLoadingState(submitBtn, false);
        setButtonSuccessState(submitBtn);
        showFormMessage('✓ Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
        
        // Reset form after delay
        setTimeout(() => {
          resetForm();
          isSubmitting = false;
        }, 3000);
      })
      .catch((error) => {
        // Error
        setButtonLoadingState(submitBtn, false);
        setButtonErrorState(submitBtn);
        showFormMessage('✗ Sorry, there was an error. Please try again.', 'error');
        isSubmitting = false;
      });
  }

  // Set button to loading state
  function setButtonLoadingState(button, isLoading) {
    if (isLoading) {
      button.classList.add('loading');
      button.disabled = true;
      button.style.minWidth = button.offsetWidth + 'px';
    } else {
      button.classList.remove('loading');
      button.disabled = false;
    }
  }

  // Set button to success state
  function setButtonSuccessState(button) {
    button.classList.add('success');
    const btnText = button.querySelector('.btn-text');
    if (btnText) {
      btnText.textContent = '✓ Sent!';
    }

    setTimeout(() => {
      button.classList.remove('success');
    }, 2000);
  }

  // Set button to error state
  function setButtonErrorState(button) {
    button.classList.add('error');
    
    setTimeout(() => {
      button.classList.remove('error');
    }, 1000);
  }

  // Shake button animation for validation errors
  function shakeButton(button) {
    button.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
      button.style.animation = '';
    }, 500);
  }

  // Simulate form submission (replace with real API call)
  function simulateFormSubmission() {
    return new Promise((resolve, reject) => {
      // Simulate network delay (2-3 seconds)
      const delay = 2000 + Math.random() * 1000;
      
      setTimeout(() => {
        // Simulate 95% success rate
        if (Math.random() > 0.05) {
          resolve();
        } else {
          reject(new Error('Submission failed'));
        }
      }, delay);
    });
  }

  // Show form message
  function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = 'success-message show';
    formMessage.style.display = 'block';

    if (type === 'error') {
      formMessage.style.backgroundColor = '#f8d7da';
      formMessage.style.color = '#721c24';
      formMessage.style.borderLeft = '4px solid #dc3545';
      
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    } else {
      formMessage.style.backgroundColor = '#d4edda';
      formMessage.style.color = '#155724';
      formMessage.style.borderLeft = '4px solid #28a745';
    }
  }

  // Reset form to initial state
  function resetForm() {
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    
    if (btnText) {
      btnText.textContent = 'Submit';
    }

    // Reset form state using the global formState if available
    if (typeof formState !== 'undefined') {
      formState.currentStep = 0;
      formState.formData = { step1: {}, step2: {}, step3: {} };
    }

    // Re-render the form
    if (typeof renderCurrentStep === 'function') {
      renderCurrentStep();
    }

    // Re-initialize the spinner on the new submit button
    setTimeout(initLoadingSpinner, 100);
  }

  // Reattach navigation button listeners
  function reattachNavigationListeners() {
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (typeof saveCurrentStepData === 'function') saveCurrentStepData();
        if (typeof handleStepNavigation === 'function') {
          handleStepNavigation(-1, () => {
            if (typeof formState !== 'undefined') formState.currentStep--;
            if (typeof renderCurrentStep === 'function') renderCurrentStep();
            // Re-initialize spinner after navigation
            setTimeout(initLoadingSpinner, 100);
          });
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (typeof validateCurrentStep === 'function' && validateCurrentStep()) {
          if (typeof saveCurrentStepData === 'function') saveCurrentStepData();
          if (typeof handleStepNavigation === 'function') {
            handleStepNavigation(1, () => {
              if (typeof formState !== 'undefined') formState.currentStep++;
              if (typeof renderCurrentStep === 'function') renderCurrentStep();
              // Re-initialize spinner after navigation
              setTimeout(initLoadingSpinner, 100);
            });
          }
        }
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoadingSpinner);
  } else {
    initLoadingSpinner();
  }

  // Also initialize after a short delay to ensure multi-step form is ready
  setTimeout(initLoadingSpinner, 500);

})();