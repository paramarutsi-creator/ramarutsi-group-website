const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navLinks.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      navLinks.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  });
}

const filterButtons = document.querySelectorAll('.filter-button');
const divisionCards = document.querySelectorAll('.division-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const sector = button.dataset.filter;
    filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    divisionCards.forEach((card) => {
      card.hidden = sector !== 'all' && !card.dataset.sectors.split(' ').includes(sector);
    });
  });
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const divisionSelect = document.querySelector('#division');

if (divisionSelect) {
  const requestedDivision = new URLSearchParams(window.location.search).get('division');
  if ([...divisionSelect.options].some((option) => option.value === requestedDivision)) {
    divisionSelect.value = requestedDivision;
  }
}

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const selectedDivision = divisionSelect.options[divisionSelect.selectedIndex].text;
    formStatus.textContent = `Your enquiry is ready to be routed to ${selectedDivision}. This website does not yet have a message-delivery service connected.`;
    formStatus.focus();
    contactForm.reset();
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll(
    '.intro-aside, .intro-copy, .section-topline, .division-card, .metric, .values-copy, .value-list li, .leader-card, .contact-copy, .contact-form, .company-grid > *, .focus-item, .audience-inner, .company-cta-inner',
  );
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    if (index % 3 !== 0) element.classList.add(`reveal-delay-${index % 3}`);
    revealObserver.observe(element);
  });
  document.documentElement.classList.add('motion-ready');
}
