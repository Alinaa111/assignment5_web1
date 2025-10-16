
// TASK 2: ACCORDION FUNCTIONALITY

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

// TASK 3: POPUP MODAL FUNCTIONALITY

document.addEventListener('DOMContentLoaded', function () {
    // modal elements
    const subscribeModal = document.getElementById('subscribeModal');
    const contactModal = document.getElementById('contactModal');
    const openSubscribeBtn = document.getElementById('openSubscribeBtn');
    const openContactBtn = document.getElementById('openContactBtn');

    // open 'Subscribe' Modal
    openSubscribeBtn.addEventListener('click', function () {
        subscribeModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // open 'Contact' Modal
    openContactBtn.addEventListener('click', function () {
        contactModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // close modal function
    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
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
        if (event.target === subscribeModal) {
            closeModal(subscribeModal);
        }
        if (event.target === contactModal) {
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
    document.getElementById('submitSubscribe').addEventListener('click', function (event) {
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

    // submit 'Contact'
    document.getElementById('submitContact').addEventListener('click', function (event) {
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
});
// ======== CAROUSEL ===============================================
// carousel vars
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');
const slideCounter = document.getElementById('slideCounter');
const carousel = document.querySelector('.carousel-inner');

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
carousel.addEventListener('mouseenter', () => {
	clearInterval(autoPlayInterval);
});

carousel.addEventListener('mouseleave', () => {
	startAutoPlay();
});

// start auto-play on load
startAutoPlay();