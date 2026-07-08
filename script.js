

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCustomCursor();
  initMobileMenu();
  initTypingText();
  initParticleCanvas();
  initScrollAnimations();
  initCardTilt();
  initMagneticButtons();
  initCounters();
  initContactForm();
  initTimelineProgress();
  initActiveNavHighlight();
  initSmoothScroll();
});
//theme mana
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('portfolio-theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light');
    document.body.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
    document.body.classList.remove('light');
  }
  localStorage.setItem('portfolio-theme', theme);
}


function initCustomCursor() {
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (!cursorDot || !cursorRing) return;

  let mouseX = 0, mouseY = 0; // Mouse raw coordinates
  let ringX = 0, ringY = 0;   // Lagging ring coordinates

  // Update mouse position variables
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
  
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });


  function animateRing() {
 
    const lerpFactor = 0.15;
    ringX += (mouseX - ringX) * lerpFactor;
    ringY += (mouseY - ringY) * lerpFactor;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateRing);
  }
  requestAnimationFrame(animateRing);

  // Hover states detection
  const hoverElements = document.querySelectorAll('[data-cursor-hover], a, button, input, textarea');
  hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorRing.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('cursor-hover');
    });
  });
}


function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const hamburgerIcon = mobileToggle ? mobileToggle.querySelector('.icon-hamburger') : null;
  const closeIcon = mobileToggle ? mobileToggle.querySelector('.icon-close') : null;

  if (!mobileToggle || !mobileNav) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    
    if (isOpen) {
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    } else {
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  // Close menu on navigation link clicks
  const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-item');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });
}

//typ effect
function initTypingText() {
  const typingTarget = document.getElementById('typing-text');
  if (!typingTarget) return;

  const phrases = 
    [
  "Computer Science Student",
  "Exploring Artificial Intelligence and Autonoumous System",
  "Interested in Web Development",
  "Interested in Application Development"
];


  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeCycle() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    // Finished typing phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; 
    } 
    // Finished deleting phrase
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(typeCycle, typingSpeed);
  }

  // Initiate typing loop
  setTimeout(typeCycle, 800);
}


function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let particles = [];
  let width, height;

  const mouse = { x: null, y: null, radius: 140 };


  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];

    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8
      });
    }
  }

 
  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    const isLightMode = document.documentElement.classList.contains('light');
   
    const particleColor = isLightMode ? 'rgba(255, 107, 74, 0.45)' : 'rgba(255, 138, 110, 0.4)';
    const strokeColorBase = isLightMode ? '255, 107, 74' : '255, 138, 110';


    particles.forEach((p) => {
    
      p.x += p.vx;
      p.y += p.vy;

      // Wall bounce
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          p.x -= dx * force * 0.03;
          p.y -= dy * force * 0.03;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${strokeColorBase}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(drawParticles);
  }


  window.addEventListener('resize', resize);
    resize();
  
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    drawParticles();
  } else {

    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 107, 74, 0.25)';
      ctx.fill();
    });
  }
}


function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
      
        const delay = entry.target.getAttribute('data-reveal-delay') || '0';
        
        setTimeout(() => {
          entry.target.classList.add('active');
        }, parseFloat(delay) * 1000);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    observer.observe(el);
  });
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-shrink');
    } else {
      navbar.classList.remove('navbar-shrink');
    }
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
}
function initCardTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  if (tiltCards.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const maxRotate = 8; 
      const rotateX = ((yc - y) / yc) * maxRotate;
      const rotateY = ((x - xc) / xc) * maxRotate;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
     
      const glow = card.querySelector('.card-glow-effect');
      if (glow) {
        glow.style.setProperty('--x', `${x}px`);
        glow.style.setProperty('--y', `${y}px`);
      }
    });

    card.addEventListener('mouseleave', () => {
  
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  if (magneticBtns.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}


function initCounters() {
  const counters = document.querySelectorAll('.count-up');
  if (counters.length === 0) return;

  const observerOptions = {
    threshold: 0.8
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute('data-target'));
        const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
        const duration = 1500; 
        let startTimestamp = null;

        function step(timestamp) {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          
      
          const easedProgress = progress * (2 - progress);
          const currentVal = easedProgress * target;

          counter.textContent = currentVal.toFixed(decimals);

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            counter.textContent = target.toFixed(decimals);
          }
        }

        window.requestAnimationFrame(step);
        observer.unobserve(counter); 
      }
    });
  }, observerOptions);

  counters.forEach((c) => observer.observe(c));
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (!form || !successMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    form.style.opacity = '0';
    form.style.transform = 'translateY(-10px)';
    form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    setTimeout(() => {
      form.classList.add('hidden');
      successMsg.classList.remove('hidden');
      setTimeout(() => {
        form.reset();
        successMsg.classList.add('hidden');
        form.classList.remove('hidden');
        form.style.opacity = '1';
        form.style.transform = 'translateY(0px)';
      }, 5000);
    }, 400);
  });
}

function initTimelineProgress() {
  const timelineSection = document.getElementById('leadership');
  const progressLine = document.getElementById('timeline-progress');

  if (!timelineSection || !progressLine) return;

  function updateTimelineProgress() {
    const rect = timelineSection.getBoundingClientRect();
    const sectionHeight = rect.height;
    
    const startPoint = window.innerHeight * 0.6;
    const currentPos = startPoint - rect.top;
    let progress = currentPos / (sectionHeight - startPoint);
    progress = Math.max(0, Math.min(1, progress));

    progressLine.style.height = `${progress * 100}%`;
  }

  window.addEventListener('scroll', updateTimelineProgress);
  window.addEventListener('resize', updateTimelineProgress);
  updateTimelineProgress();
 }

function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  if (sections.length === 0 || navItems.length === 0) return;

  function highlightNav() {
    let currentActiveId = '';
    const scrollPos = window.scrollY + 120; 
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        currentActiveId = section.getAttribute('id');
      }
    });

    navItems.forEach((item) => {
      item.classList.remove('active');
      const href = item.getAttribute('href').substring(1);
      if (href === currentActiveId) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav(); // Initial highlight
}
function initSmoothScroll() {

  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  const scrollTriggers = document.querySelectorAll('a[href^="#"]');

  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      const navbarHeight = 80;
      const targetPos = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    });
  });

  
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  
  
  const scrollFill = document.getElementById('scroll-progress-fill');
  if (scrollFill) {
    window.addEventListener('scroll', () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      if (totalScroll > 0) {
        const scaleVal = currentScroll / totalScroll;
        scrollFill.style.transform = `scaleY(${scaleVal})`;
      }
    });
  }
}
