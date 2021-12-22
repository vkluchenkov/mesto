import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";
import {
  currentName,
  currentJob,
  profilePopup,
  profileNameInput,
  profileJobInput,
  profileForm,
  addCardPopup,
  cardNameInput,
  cardLinkInput,
  addCardForm,
  cardsContainer,
  profileEditButton,
  addCardButton,
  popups,
} from "./constants.js";

const validatorOptions = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_type_visible",
};
const profileFormValidator = new FormValidator(validatorOptions, profileForm);
const cardFormValidator = new FormValidator(validatorOptions, addCardForm);

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
  closePopup(profilePopup);
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

  closePopup(addCardPopup);
};

// Forms validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Event listeners
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = currentName.textContent;
  profileJobInput.value = currentJob.textContent;
  profileFormValidator.resetValidation();
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
