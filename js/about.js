// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  
    // Counter animation for statistics
    const statsNumbers = document.querySelectorAll('.stats-number');
    
    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 16);
    }
  
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    statsNumbers.forEach(number => {
      observer.observe(number);
    });
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed navbar
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
          alert('Please fill in all fields');
          return;
        }
        
        // Here you would typically send the form data to your server
        // For demo purposes, we'll just show a success message
        
        // Create a success alert
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success mt-3';
        successAlert.role = 'alert';
        successAlert.innerHTML = `
          <i class="fas fa-check-circle me-2"></i>
          Thank you for your message, ${name}! We'll get back to you soon.
        `;
        
        // Add the alert to the form
        contactForm.appendChild(successAlert);
        
        // Reset the form
        contactForm.reset();
        
        // Remove the alert after 5 seconds
        setTimeout(() => {
          successAlert.remove();
        }, 5000);
      });
    }
  
    // Team member hover effect enhancement
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
      const image = card.querySelector('.team-image img');
      const initialSrc = image.src;
      const hoverSrc = image.getAttribute('data-hover-src');
      
      if (hoverSrc) {
        card.addEventListener('mouseenter', () => {
          image.src = hoverSrc;
        });
        
        card.addEventListener('mouseleave', () => {
          image.src = initialSrc;
        });
      }
    });
  
    // Testimonial carousel (if you want to add one)
    // This is a placeholder for if you want to implement a carousel
    // You would need to add the appropriate HTML structure
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  });