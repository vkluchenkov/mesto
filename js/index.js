import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import * as data from "./data.js";

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

const profileEditButton = document.querySelector(".title__name-edit");
const addCardButton = document.querySelector(".title__button");
const popups = document.querySelectorAll(".popup");

const formList = Array.from(document.querySelectorAll(".popup__form"));

const validatorOptions = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_type_visible",
};

// Cards mapping
const addCardToContainer = (card, container) => container.prepend(card);

initialCards.reverse().forEach((card) => {
  const newCard = new Card(card, "#card-template");
  const newCardElement = newCard.createCard();
  addCardToContainer(newCardElement, cardsContainer);
});

// Submit handlers
const submitProfileHandler = (evt) => {
  evt.preventDefault();
  currentName.textContent = profileNameInput.value;
  currentJob.textContent = profileJobInput.value;
  data.closePopup(profilePopup);
};

const submitCardHandler = (evt) => {
  evt.preventDefault();
  const submitButton = addCardForm.querySelector(".popup__submit-button");
  const card = new Card(
    {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    },
    "#card-template"
  );
  const cardElement = card.createCard();

  addCardToContainer(cardElement, cardsContainer);

  evt.target.reset();
  submitButton.classList.add("popup__submit-button_disabled");
  submitButton.setAttribute("disabled", "");

  data.closePopup(addCardPopup);
};

// Forms validation
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validatorOptions, formElement);
  formValidator.enableValidation();
});

// Event listeners
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = currentName.textContent;
  profileJobInput.value = currentJob.textContent;
  data.openPopup(profilePopup);
});

profileForm.addEventListener("submit", submitProfileHandler);
addCardButton.addEventListener("click", () => data.openPopup(addCardPopup));
addCardForm.addEventListener("submit", submitCardHandler);

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      data.closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      data.closePopup(popup);
    }
  });
});
