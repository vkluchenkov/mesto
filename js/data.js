const imagePopup = document.querySelector("#image_popup");
const imageLink = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__image-caption");

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

const openPopup = (p) => {
  p.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

const closePopup = (p) => {
  p.closest(".popup").classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

export { imagePopup, imageLink, imageCaption, openPopup, closePopup };
