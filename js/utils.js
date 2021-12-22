export const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

export const openPopup = (p) => {
  p.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

export const closePopup = (p) => {
  p.closest(".popup").classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};
