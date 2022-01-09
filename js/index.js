import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { FormValidator } from "./FormValidator.js";
import {
  currentName,
  currentJob,
  profilePopup,
  profileNameInput,
  profileJobInput,
  profileForm,
  addCardPopup,
  addCardForm,
  cardsContainer,
  profileEditButton,
  addCardButton,
  imagePopup,
} from "./constants.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const validatorOptions = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_type_visible",
};
const profileFormValidator = new FormValidator(validatorOptions, profileForm);
const cardFormValidator = new FormValidator(validatorOptions, addCardForm);

// Single card creation
const createNewCard = (card) => {
  const popupWithImage = new PopupWithImage(imagePopup, card);

  const newCard = new Card({
    card: card,
    cardTemplateSelector: "#card-template",
    openHandler: () => popupWithImage.open(),
    closeHandler: () => popupWithImage.close(),
  });

  const newCardElement = newCard.createCard();
  return newCardElement;
};

// Cards mapping
const initialCardsRender = new Section(
  {
    items: initialCards.reverse(),
    renderer: createNewCard,
  },
  cardsContainer
);

initialCardsRender.renderItems();

// Submit handlers
const submitProfileHandler = (values) => {
  const userInfo = new UserInfo({ currentName, currentJob });
  userInfo.setUserInfo(values);
};

const submitCardHandler = ({ placeName, placeLink }) => {
  const submitButton = addCardForm.querySelector(".popup__submit-button");
  const card = {
    name: placeName,
    link: placeLink,
  };

  const addCardToContainer = new Section(
    {
      items: [card],
      renderer: createNewCard,
    },
    cardsContainer
  );

  addCardToContainer.renderItems();

  submitButton.classList.add("popup__submit-button_disabled");
  submitButton.setAttribute("disabled", "");
};

// Event listeners
profileEditButton.addEventListener("click", () => {
  const ProfilePopup = new PopupWithForm(profilePopup, submitProfileHandler);
  const userInfo = new UserInfo({
    currentName,
    currentJob,
  });
  const currentUser = userInfo.getUserInfo();

  profileNameInput.value = currentUser.name;
  profileJobInput.value = currentUser.job;
  profileFormValidator.resetValidation();

  ProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  const newCardPopup = new PopupWithForm(addCardPopup, submitCardHandler);
  newCardPopup.open();
});

// Forms validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
