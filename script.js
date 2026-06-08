const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const year = document.getElementById('year');

// Auto update footer year
if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile menu toggle
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');

    // Change menu icon
    menuBtn.textContent = navLinks.classList.contains('show') ? '✕' : '☰';
  });
}

// Close mobile menu after clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');

    if (menuBtn) {
      menuBtn.textContent = '☰';
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', event => {
  if (
    navLinks &&
    menuBtn &&
    !navLinks.contains(event.target) &&
    !menuBtn.contains(event.target)
  ) {
    navLinks.classList.remove('show');
    menuBtn.textContent = '☰';
  }
});

// Reveal animation on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14
});

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// Smooth active navbar highlight while scrolling
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// Add slight shadow effect to header when scrolling
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }
});

// Pause animated banner on hover
const banner = document.querySelector('.top-banner');
const bannerTrack = document.querySelector('.banner-track');

if (banner && bannerTrack) {
  banner.addEventListener('mouseenter', () => {
    bannerTrack.style.animationPlayState = 'paused';
  });

  banner.addEventListener('mouseleave', () => {
    bannerTrack.style.animationPlayState = 'running';
  });
}
