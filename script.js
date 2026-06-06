const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('show'));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
