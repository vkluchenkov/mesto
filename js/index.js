import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";

import {
  currentName,
  currentJob,
  profilePopup,
  profileNameInput,
  profileJobInput,
  addCardPopup,
  addCardSubmitButton,
  cardsContainer,
  profileEditButton,
  addCardButton,
  imagePopup,
  cardsTemplate,
  profileFormValidator,
  cardFormValidator,
} from "./constants.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

// Single card creation
const createNewCard = (card) => {
  const popupWithImage = new PopupWithImage(imagePopup, card);

  const newCard = new Card({
    card: card,
    cardTemplateSelector: cardsTemplate,
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
  const card = { name: placeName, link: placeLink };

  const addCardToContainer = new Section(
    {
      items: [card],
      renderer: createNewCard,
    },
    cardsContainer
  );
  addCardToContainer.renderItems();

  addCardSubmitButton.classList.add("popup__submit-button_disabled");
  addCardSubmitButton.setAttribute("disabled", "");
};

// Event listeners
profileEditButton.addEventListener("click", () => {
  const ProfilePopup = new PopupWithForm(profilePopup, submitProfileHandler);
  const userInfo = new UserInfo({ currentName, currentJob });
  const currentUser = userInfo.getUserInfo();

  profileNameInput.value = currentUser.name;
  profileJobInput.value = currentUser.job;
  profileFormValidator.resetValidation();

  ProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  const newCardPopup = new PopupWithForm(addCardPopup, submitCardHandler);
  cardFormValidator.resetValidation();
  newCardPopup.open();
});

// Forms validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
