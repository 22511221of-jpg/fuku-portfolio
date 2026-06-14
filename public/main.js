// ===== Scroll: compact nav + logo swap =====
const onScroll = () => {
  document.body.classList.toggle('scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Hamburger drawer =====
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('drawerOverlay');

function closeDrawer() {
  hamburger.classList.remove('open');
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  });
  overlay.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeDrawer));
}

// ===== Accordion (Works) =====
const worksToggle = document.getElementById('worksToggle');
const worksPanel = document.getElementById('worksPanel');

function openPanel() {
  worksToggle.setAttribute('aria-expanded', 'true');
  worksPanel.style.maxHeight = worksPanel.scrollHeight + 'px';
}
function closePanel() {
  worksToggle.setAttribute('aria-expanded', 'false');
  worksPanel.style.maxHeight = '0px';
}

if (worksToggle && worksPanel) {
  worksToggle.addEventListener('click', () => {
    const isOpen = worksToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closePanel();
    else openPanel();
  });

  // Open automatically when linked via #works, and clear maxHeight after
  // transition so the panel can grow if the viewport is resized.
  const openIfHashTargetsWorks = () => {
    if (window.location.hash === '#works') openPanel();
  };
  document.querySelectorAll('a[href$="#works"]').forEach((a) => {
    a.addEventListener('click', () => setTimeout(openPanel, 50));
  });
  window.addEventListener('hashchange', openIfHashTargetsWorks);
  openIfHashTargetsWorks();

  worksPanel.addEventListener('transitionend', () => {
    if (worksToggle.getAttribute('aria-expanded') === 'true') {
      worksPanel.style.maxHeight = 'none';
    }
  });
}

// ===== Fade-in on scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade').forEach((el) => observer.observe(el));
