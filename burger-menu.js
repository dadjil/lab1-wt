// bootstrap.bundle.js не используется
// мы просто переключаем класс "show" (стили для него уже есть в bootstrap.min.css)
// и сами следим за aria-expanded, чтобы меню было понятно скринридерам.

export function initBurgerMenu({ toggleSelector, panelSelector }) {
  const toggle = document.querySelector(toggleSelector);
  const panel = document.querySelector(panelSelector);
  if (!toggle || !panel) return;

  function isOpen() {
    return panel.classList.contains('show');
  }

  function open() {
    panel.classList.add('show');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Закрыть меню');
  }

  function close() {
    panel.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
  }

  toggle.addEventListener('click', () => (isOpen() ? close() : open()));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      close();
      toggle.focus();
    }
  });

  panel.addEventListener('click', (event) => {
    if (event.target.matches('.nav-link')) close();
  });


  document.addEventListener('click', (event) => {
    const clickedInsideNav = event.target.closest('.navbar');
    if (!clickedInsideNav && isOpen()) close();
  });
}
