export function initModal({ overlaySelector, gridSelector }) {
  const overlay = document.querySelector(overlaySelector);
  const grid = document.querySelector(gridSelector);
  if (!overlay || !grid) return;

  const dialog = overlay.querySelector(".modal-window");
  const image = overlay.querySelector(".modal-image");
  const title = overlay.querySelector("#modalTitle");
  const description = overlay.querySelector("#modalDescription");
  const brand = overlay.querySelector("#modalBrand");

  let lastFocused = null;

  function open(card) {
    const cardImage = card.querySelector("img");

    image.src = cardImage.src;
    image.alt = cardImage.alt;
    title.textContent = card.querySelector("h3").textContent;
    description.textContent = card.querySelector("p").textContent;
    brand.textContent = card.querySelector(".badge")?.textContent ?? "";

    lastFocused = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add("modal-open");
    document.addEventListener("keydown", onKeydown);
    dialog.focus();
  }

  function close() {
    overlay.hidden = true;
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", onKeydown);
    lastFocused?.focus();
  }

  function onKeydown(event) {
    if (event.key === "Escape") {
      close();
      return;
    }
    if (event.key === "Tab") {
      keepFocusInside(event);
    }
  }

  function keepFocusInside(event) {
    const focusable = dialog.querySelectorAll(
      'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  grid.addEventListener("click", (event) => {
    const detailsButton = event.target.closest('[data-action="details"]');
    if (!detailsButton) return;
    open(detailsButton.closest(".car-card"));
  });

  overlay.addEventListener("click", (event) => {
    const isCloseButton = event.target.closest('[data-action="close-modal"]');
    const isBackdrop = event.target === overlay;
    if (isCloseButton || isBackdrop) close();
  });
}
