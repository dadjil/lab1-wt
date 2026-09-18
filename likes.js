export function initLikes(gridSelector) {
  const grid = document.querySelector(gridSelector);
  if (!grid) return;

  grid.addEventListener("click", (event) => {
    const button = event.target.closest('[data-action="like"]');
    if (!button) return;

    const card = button.closest(".car-card");
    const wasLiked = button.getAttribute("aria-pressed") === "true";

    button.setAttribute("aria-pressed", String(!wasLiked));
    card?.classList.toggle("is-liked", !wasLiked);
    button.querySelector(".like-icon").textContent = wasLiked ? "♡" : "♥";
  });
}
