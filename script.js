document.addEventListener('DOMContentLoaded', () => {
  const toggleModeButton = document.getElementById('toggleMode');
  const profilePicture = document.getElementById('profilePicture');
  const profileDialog = document.getElementById('profileDialog');
  const backButton = document.getElementById('backButton');
  const projectCards = document.querySelectorAll('.project-card');
  const firefliesContainer = document.getElementById('fireflies');
  const birdsContainer = document.getElementById('birds');
  const body = document.body;
  const preloader = document.getElementById('preloader');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // Preloader
  window.addEventListener('load', () => {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 500); // Remove after fade-out
  });

  // Dark/Light Mode Toggle
  if (localStorage.getItem('nightMode') === 'true') {
    body.classList.add('night-mode');
    toggleModeButton.textContent = '☀️';
  }

  toggleModeButton.addEventListener('click', () => {
    const isNightMode = body.classList.toggle('night-mode');
    document.querySelector('.profile-container').classList.toggle('night-mode');
    localStorage.setItem('nightMode', isNightMode);
    toggleModeButton.textContent = isNightMode ? '☀️' : '🌙';

    firefliesContainer.innerHTML = '';
    birdsContainer.innerHTML = '';
    if (isNightMode) {
      firefliesContainer.style.display = 'block';
      birdsContainer.style.display = 'none';
      fireflyEffect(firefliesContainer, { color: '#ffdd44', count: 20 });
    } else {
      firefliesContainer.style.display = 'none';
      birdsContainer.style.display = 'block';
      birdAnimation(birdsContainer, { color: '#000000', count: 10 });
    }
  });

  // Profile Dialog
  profilePicture.addEventListener('click', () => profileDialog.classList.add('active'));
  backButton.addEventListener('click', () => profileDialog.classList.remove('active'));

  // Project Card Fire Effect
  projectCards.forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('active'));
  });

  // Section Animation
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.3 });
  sections.forEach(section => observer.observe(section));

  // Contact Form Submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.textContent = 'Sending...';
    formStatus.classList.add('visible');
  
    const formData = new FormData(contactForm);
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
  
      if (response.ok) {
        formStatus.textContent = 'Message sent successfully!';
        contactForm.reset();
        setTimeout(() => {
          formStatus.classList.remove('visible');
          setTimeout(() => formStatus.textContent = '', 300);
        }, 3000);
      } else {
        const errorData = await response.json();
        formStatus.textContent = `Error: ${errorData.error || 'Something went wrong. Please try again.'}`;
        setTimeout(() => {
          formStatus.classList.remove('visible');
          setTimeout(() => formStatus.textContent = '', 300);
        }, 3000);
      }
    } catch (error) {
      formStatus.textContent = 'Network error. Please check your connection and try again.';
      setTimeout(() => {
        formStatus.classList.remove('visible');
        setTimeout(() => formStatus.textContent = '', 300);
      }, 3000);
    }
  });

  // Particles.js
  particlesJS('particles-js', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 4 }
    },
    interactivity: {
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });

  // Firefly and Bird Effects
  function fireflyEffect(container, { color, count }) {
    for (let i = 0; i < count; i++) {
      const firefly = document.createElement('div');
      firefly.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: ${color};
        border-radius: 50%;
        animation: fly 5s infinite ease-in-out ${i * 0.2}s;
      `;
      container.appendChild(firefly);
    }
  }

  function birdAnimation(container, { color, count }) {
    for (let i = 0; i < count; i++) {
      const bird = document.createElement('div');
      bird.style.cssText = `
        position: absolute;
        width: 10px;
        height: 5px;
        background: ${color};
        clip-path: polygon(0 0, 100% 50%, 0 100%);
        animation: fly 4s infinite linear ${i * 0.3}s;
      `;
      container.appendChild(bird);
    }
  }

  // Animation Keyframes
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fly {
      0% { transform: translate(0, 0); opacity: 0; }
      50% { transform: translate(${Math.random() * 100 - 50}vw, ${Math.random() * 100 - 50}vh); opacity: 1; }
      100% { transform: translate(${Math.random() * 100 - 50}vw, ${Math.random() * 100 - 50}vh); opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);

  // Initial Setup
  if (!body.classList.contains('night-mode')) {
    birdAnimation(birdsContainer, { color: '#000000', count: 10 });
  } else {
    fireflyEffect(firefliesContainer, { color: '#ffdd44', count: 20 });
  }
});