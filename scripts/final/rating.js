// Rating System with LocalStorage and Animations
document.addEventListener('DOMContentLoaded', function() {
  const ratingItems = document.querySelectorAll('.rating-item');
  const clearBtn = document.querySelector('.clear-ratings-btn');
  const savedIndicator = document.getElementById('savedIndicator');

  // Load saved ratings from localStorage
  function loadRatings() {
    ratingItems.forEach(item => {
      const starsContainer = item.querySelector('.stars');
      const itemName = starsContainer.getAttribute('data-item');
      const savedRating = localStorage.getItem(`rating_${itemName}`);
      
      if (savedRating) {
        updateStars(starsContainer, parseInt(savedRating), false);
        updateDisplay(item, parseInt(savedRating), false);
      }
    });
  }

  // Update star display with animation
  function updateStars(starsContainer, rating, animate = true) {
    const stars = starsContainer.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (animate) {
        setTimeout(() => {
          if (index < rating) {
            star.classList.add('active');
          } else {
            star.classList.remove('active');
          }
        }, index * 100);
      } else {
        if (index < rating) {
          star.classList.add('active');
        } else {
          star.classList.remove('active');
        }
      }
    });
  }

  // Update rating display text with animation
  function updateDisplay(item, rating, animate = true) {
    const display = item.querySelector('.rating-display');
    
    if (animate) {
      display.classList.add('updated');
      setTimeout(() => {
        display.classList.remove('updated');
      }, 600);
    }
    
    if (rating > 0) {
      display.textContent = `${rating}/5`;
    } else {
      display.textContent = 'Not rated';
    }
  }

  // Show saved indicator
  function showSavedIndicator() {
    savedIndicator.classList.add('show');
    setTimeout(() => {
      savedIndicator.classList.remove('show');
    }, 2000);
  }

  // Add click handlers to stars
  ratingItems.forEach(item => {
    const starsContainer = item.querySelector('.stars');
    const stars = starsContainer.querySelectorAll('.star');
    const itemName = starsContainer.getAttribute('data-item');

    stars.forEach(star => {
      // Click event
      star.addEventListener('click', function() {
        const rating = parseInt(this.getAttribute('data-value'));
        
        // Save to localStorage
        localStorage.setItem(`rating_${itemName}`, rating);
        
        // Update display with animation
        updateStars(starsContainer, rating, true);
        updateDisplay(item, rating, true);
        
        // Show saved indicator
        showSavedIndicator();
      });

      // Hover effect
      star.addEventListener('mouseenter', function() {
        const rating = parseInt(this.getAttribute('data-value'));
        stars.forEach((s, index) => {
          if (index < rating) {
            s.classList.add('hover');
          } else {
            s.classList.remove('hover');
          }
        });
      });
    });

    // Remove hover effect when leaving stars container
    starsContainer.addEventListener('mouseleave', function() {
      stars.forEach(s => s.classList.remove('hover'));
    });
  });

  // Clear all ratings with confirmation
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to clear all ratings?')) {
        ratingItems.forEach((item, index) => {
          const starsContainer = item.querySelector('.stars');
          const itemName = starsContainer.getAttribute('data-item');
          
          // Remove from localStorage
          localStorage.removeItem(`rating_${itemName}`);
          
          // Reset display with staggered animation
          setTimeout(() => {
            updateStars(starsContainer, 0, true);
            updateDisplay(item, 0, true);
          }, index * 150);
        });
      }
    });
  }

  // Load ratings on page load
  loadRatings();
});