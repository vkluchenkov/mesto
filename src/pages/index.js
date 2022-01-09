import "./index.css";

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  imagePopup,
  currentName,
  currentJob,
  profilePopup,
  profileNameInput,
  profileJobInput,
  addCardPopup,
  cardsContainer,
  profileEditButton,
  addCardButton,
  cardsTemplate,
  profileFormValidator,
  cardFormValidator,
  initialCards,
} from "../components/utils/constants.js";

// Submit handlers
const submitProfileHandler = (values) => userInfo.setUserInfo(values);

const submitCardHandler = ({ placeName, placeLink }) => {
  const card = createNewCard({ name: placeName, link: placeLink });
  section.addItem(card);
};

const popupWithImage = new PopupWithImage(imagePopup);
const userInfo = new UserInfo({ currentName, currentJob });
const ProfilePopup = new PopupWithForm(profilePopup, submitProfileHandler);
const newCardPopup = new PopupWithForm(addCardPopup, submitCardHandler);

// Single card constructor
const createNewCard = (card) => {
  const newCard = new Card({
    card: card,
    cardTemplateSelector: cardsTemplate,
    openHandler: () => popupWithImage.open(card),
  });
  const newCardElement = newCard.createCard();
  return newCardElement;
};

const section = new Section(
  {
    items: initialCards.reverse(),
    renderer: createNewCard,
  },
  cardsContainer
);

// Initial cards mapping
section.renderItems();

// Event listeners
profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();

  profileNameInput.value = currentUser.name;
  profileJobInput.value = currentUser.job;
  profileFormValidator.resetValidation();

  ProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  newCardPopup.open();
});

// Forms validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
