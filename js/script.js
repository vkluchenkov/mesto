import { initialCards } from "./cards.js";

// Search for current values of fields and buttons
const currentName = document.querySelector(".title__name");
const currentJob = document.querySelector(".title__description");

const profilePopup = document.querySelector("#edit_profile");
const profileNameInput = profilePopup.querySelector("#input-name");
const profileJobInput = profilePopup.querySelector("#input-job");
const profileForm = profilePopup.querySelector("#profile_form");

const addCardPopup = document.querySelector("#add_place");
const cardNameInput = addCardPopup.querySelector("#place-name");
const cardLinkInput = addCardPopup.querySelector("#place-link");
const addCardForm = addCardPopup.querySelector("#add_place_form");
const cardsContainer = document.querySelector(".places__grid");

const cardsTemplate = document.querySelector("#card-template").content;

const imagePopup = document.querySelector("#image_popup");
const imageLink = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__image-caption");

const profileEditButton = document.querySelector(".title__name-edit");
const addCardButton = document.querySelector(".title__button");
const popups = document.querySelectorAll(".popup");

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

// Cards mapping
const createCard = (card) => {
  const cardElement = cardsTemplate.querySelector(".place").cloneNode(true);
  const like = cardElement.querySelector(".place__like");
  const image = cardElement.querySelector(".place__image");
  const trash = cardElement.querySelector(".place__trash");

  image.src = card.link;
  image.alt = card.name;
  cardElement.querySelector(".place__name").textContent = card.name;

  like.addEventListener("click", (evt) => evt.target.classList.toggle("place__like_active"));
  trash.addEventListener("click", (evt) => evt.target.closest(".place").remove());
  image.addEventListener("click", () => {
    imageLink.src = card.link;
    imageLink.alt = card.name;
    imageCaption.textContent = card.name;
    openPopup(imagePopup);
  });

  return cardElement;
};

const addCardToContainer = (card, container) => container.prepend(card);

initialCards.reverse().forEach((card) => {
  const newCard = createCard(card);
  addCardToContainer(newCard, cardsContainer);
});

// Submit handlers
const submitProfileHandler = (evt) => {
  evt.preventDefault();
  currentName.textContent = profileNameInput.value;
  currentJob.textContent = profileJobInput.value;
  closePopup(profilePopup);
};

const submitCardHandler = (evt) => {
  evt.preventDefault();
  const submitButton = addCardForm.querySelector(".popup__submit-button");
  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  addCardToContainer(createCard(card), cardsContainer);

  evt.target.reset();
  submitButton.classList.add("popup__submit-button_disabled");
  submitButton.setAttribute("disabled", "");

  closePopup(addCardPopup);
};

// Event listeners
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = currentName.textContent;
  profileJobInput.value = currentJob.textContent;
  openPopup(profilePopup);
});

profileForm.addEventListener("submit", submitProfileHandler);
addCardButton.addEventListener("click", () => openPopup(addCardPopup));
addCardForm.addEventListener("submit", submitCardHandler);

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});
