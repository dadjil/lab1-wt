import { initBurgerMenu } from "./burger-menu.js";
import { initTabs } from "./tabs.js";
import { initLikes } from "./likes.js";
import { initModal } from "./modal.js";
import { initReviewForm } from "./review-form.js";

initBurgerMenu({
  toggleSelector: ".navbar-toggler",
  panelSelector: "#mainNav",
});

const historySection = document.getElementById("history");
if (historySection) initTabs(historySection);

initLikes(".car-grid");
initModal({ overlaySelector: "#carModal", gridSelector: ".car-grid" });
initReviewForm(".review-form");
