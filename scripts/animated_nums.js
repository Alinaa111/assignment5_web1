$(document).ready(function(){
    console.log("jQuery is ready!");
});
// ============================================
// TASK 5: ANIMATED NUMBER COUNTER
// ============================================

(function() {
  'use strict';

  // Stats configuration
  const statsData = [
    { icon: '👥', number: 1000, suffix: '+', label: 'Active Users', duration: 2000 },
    { icon: '🏋️', number: 50, suffix: '+', label: 'Partner Gyms', duration: 1800 },
    { icon: '🎯', number: 100, suffix: '+', label: 'Activities', duration: 2200 },
    { icon: '⭐', number: 95, suffix: '%', label: 'Satisfaction', duration: 2500 }
  ];

  let hasAnimated = false;

  // Initialize stats section
  function initAnimatedStats() {
    const targetSection = document.querySelector('.carousel-section');
    
    if (!targetSection) {
      console.warn('Carousel section not found. Stats counter not initialized.');
      return;
    }

    // Create stats section HTML
    const statsHTML = createStatsHTML();
    
    // Insert after carousel section
    targetSection.insertAdjacentHTML('afterend', statsHTML);

    // Setup intersection observer for scroll-triggered animation
    setupScrollAnimation();

    console.log('✓ Animated stats counter initialized');
  }

  // Generate HTML for stats section
  function createStatsHTML() {
    const statsItems = statsData.map(stat => `
      <div class="stat-item">
        <span class="stat-icon">${stat.icon}</span>
        <span class="stat-number" data-target="${stat.number}" data-suffix="${stat.suffix}" data-duration="${stat.duration}">0</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `).join('');

    return `
      <section class="stats-section" id="stats-section">
        <div class="container">
          <h2>BirQadam by the Numbers</h2>
          <div class="stats-container">
            ${statsItems}
          </div>
        </div>
      </section>
    `;
  }

  // Setup scroll-triggered animation using Intersection Observer
  function setupScrollAnimation() {
    const statsSection = document.getElementById('stats-section');
    
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateAllCounters();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(statsSection);
  }

  // Animate all stat counters
  function animateAllCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((element, index) => {
      // Stagger the animation start
      setTimeout(() => {
        animateCounter(element);
      }, index * 150);
    });
  }

  // Animate individual counter with easing
  function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const suffix = element.dataset.suffix || '';
    const duration = parseInt(element.dataset.duration) || 2000;
    const startTime = Date.now();
    const startValue = 0;

    // Add counting class for pulse animation
    element.classList.add('counting');

    function updateCounter() {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentValue = Math.floor(startValue + (target - startValue) * easeProgress);
      
      element.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + suffix;
        element.classList.remove('counting');
        
        // Add celebration animation on completion
        celebrateCompletion(element);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Add celebration effect when counter completes
  function celebrateCompletion(element) {
    element.style.transition = 'all 0.3s ease';
    element.style.transform = 'scale(1.2)';
    element.style.color = '#00b4d8';
    
    setTimeout(() => {
      element.style.transform = 'scale(1)';
      element.style.color = '#0077b6';
    }, 300);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimatedStats);
  } else {
    initAnimatedStats();
  }

})();