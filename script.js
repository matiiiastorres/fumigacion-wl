// Configuración WhatsApp
const WHATSAPP_NUMBER = '5493811234567'; // reemplazá con tu número (ej: 5493811234567)
const PRESET_MESSAGE = encodeURIComponent(
  'Hola, necesito asistencia de cerrajería en Alderetes.'
);
const wspUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${PRESET_MESSAGE}`;

// Helpers DOM
function select(id) {
  return document.getElementById(id);
}

// Aplicar enlaces
document.addEventListener('DOMContentLoaded', () => {
  // Enlaces WhatsApp
  const wspLink = select('wsp-link');
  const wspCta = select('wsp-cta');
  const float = select('whatsapp-float');
  const footerWsp = select('footer-wsp');
  [wspLink, wspCta, float, footerWsp].forEach((el) => {
    if (el) el.href = wspUrl;
  });

  // // Año en footer
  // const year = select('year');
  // if (year) year.textContent = new Date().getFullYear();

  // Slider
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  function showSlide(index) {
    slides.forEach((s) => s.classList.remove('active'));
    dots.forEach((d) => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    current = index;
  }
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index, 10);
      showSlide(idx);
    });
  });
  setInterval(() => {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }, 6000);

  // Navbar móvil toggle
  const menuToggle = select('menu-toggle');
  const mobileMenu = select('mobile-menu');
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', (!expanded).toString());
    if (mobileMenu) {
      mobileMenu.style.display =
        mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    }
  });

  // Close mobile menu when link clicked
  document.querySelectorAll('.mobile-menu a').forEach((a) => {
    a.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.style.display = 'none';
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Tema (claro/oscuro) con persistencia
  const root = document.documentElement;
  const toggle = select('theme-toggle');
  const sun = document.querySelector('.icon-sun');
  const moon = document.querySelector('.icon-moon');
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    if (t === 'dark') {
      if (sun) sun.style.display = 'none';
      if (moon) moon.style.display = 'inline';
    } else {
      if (sun) sun.style.display = 'inline';
      if (moon) moon.style.display = 'none';
    }
  }

  // Inicializa
  if (stored) {
    applyTheme(stored);
  } else {
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const next = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }
});
