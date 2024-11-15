        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        let isMenuOpen = false;

        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            mobileMenu.classList.toggle('active', isMenuOpen);
            mobileMenuBtn.textContent = isMenuOpen ? '×' : '☰';
        });

        
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });

        
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && isMenuOpen) {
                isMenuOpen = false;
                mobileMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        });

        
        gsap.to('.hero-content', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });
        function createShapes() {
            const shapes = document.getElementById('shapes');
            const numShapes = 5;

            for (let i = 0; i < numShapes; i++) {
                const shape = document.createElement('div');
                shape.className = 'shape';
                const size = Math.random() * 300 + 50;
                
                shape.style.width = `${size}px`;
                shape.style.height = `${size}px`;
                shape.style.left = `${Math.random() * 100}%`;
                shape.style.top = `${Math.random() * 100}%`;
                
                shapes.appendChild(shape);

                gsap.to(shape, {
                    x: 'random(-100, 100)',
                    y: 'random(-100, 100)',
                    duration: 'random(10, 20)',
                    repeat: -1,
                    yoyo: true,
                    ease: 'none'
                });
            }
        }

        createShapes();
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        class TestimonialSlider {
    constructor() {
        this.track = document.querySelector('.testimonials-track');
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.dotsContainer = document.querySelector('.slider-dots');
        
        this.currentIndex = 0;
        this.slideWidth = 100; // percentage
        this.totalSlides = this.slides.length;
        
        this.init();
    }

    init() {
        // Create dots
        this.createDots();
        
        // Set initial position
        this.updateSlider();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.navigate('prev'));
        this.nextBtn.addEventListener('click', () => this.navigate('next'));
        
        // Add touch support
        this.addTouchSupport();
        
        // Add keyboard support
        this.addKeyboardSupport();

        // Auto advance every 5 seconds
        this.startAutoAdvance();
    }

    createDots() {
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    updateSlider() {
        // Update track position
        this.track.style.transform = `translateX(-${this.currentIndex * this.slideWidth}%)`;
        
        // Update buttons state
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
        
        // Update dots
        const dots = this.dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    navigate(direction) {
        if (direction === 'prev' && this.currentIndex > 0) {
            this.currentIndex--;
        } else if (direction === 'next' && this.currentIndex < this.totalSlides - 1) {
            this.currentIndex++;
        }
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }

    addTouchSupport() {
        let startX, moveX;
        const minSwipeDistance = 50;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchmove', (e) => {
            moveX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchend', () => {
            if (startX && moveX) {
                const difference = startX - moveX;
                if (Math.abs(difference) > minSwipeDistance) {
                    if (difference > 0) {
                        this.navigate('next');
                    } else {
                        this.navigate('prev');
                    }
                }
            }
            startX = null;
            moveX = null;
        });
    }

    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.navigate('prev');
            } else if (e.key === 'ArrowRight') {
                this.navigate('next');
            }
        });
    }

    startAutoAdvance() {
        setInterval(() => {
            if (this.currentIndex < this.totalSlides - 1) {
                this.navigate('next');
            } else {
                this.goToSlide(0);
            }
        }, 5000);
    }
}

// Initialize the slider
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialSlider();
});
