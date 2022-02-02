import "./index.css";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  imagePopupSelector,
  currentName,
  currentAbout,
  profilePopupSelector,
  profileNameInput,
  profileAboutInput,
  addCardPopupSelector,
  cardsContainer,
  profileEditButton,
  addCardButton,
  cardsTemplate,
  profileFormValidator,
  cardFormValidator,
} from "../components/utils/constants.js";
import { Api } from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-35",
  headers: {
    authorization: "1ce0766d-1d99-41e8-b2c1-6a564053af66",
    "Content-Type": "application/json",
  },
});

// Globals container
const globals = {};

// Submit handlers
const submitProfileHandler = ({ inputName, inputAbout }) => {
  api
    .patchMe({ name: inputName, about: inputAbout })
    .then((user) => globals.userInfo.setUserInfo({ inputName: user.name, inputAbout: user.about }))
    .catch((err) => console.log(err));
};

const submitCardHandler = ({ placeName, placeLink }) => {
  return api
    .postCard({ name: placeName, link: placeLink })
    .then((card) => createNewCard(card))
    .then((newCard) => globals.section.addItem(newCard))
    .catch((err) => console.log(err));
};

// Classes initialization
const popupWithImage = new PopupWithImage(imagePopupSelector);
const profilePopup = new PopupWithForm(profilePopupSelector, submitProfileHandler);
const newCardPopup = new PopupWithForm(addCardPopupSelector, submitCardHandler);

// Callbacks
const cardKiller = (cardId) => {
  return api
    .deleteCard(cardId)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const createNewCard = (card) => {
  const newCard = new Card({
    card: card,
    cardTemplateSelector: cardsTemplate,
    userId: globals.userInfo._id,
    openHandler: () => popupWithImage.open(card),
    killer: () => cardKiller(card._id),
  });

  const newCardElement = newCard.createCard();

  return newCardElement;
};

// Initial cards rendering
const initialCardsRender = () =>
  api
    .getCards()
    .then((cards) => {
      globals.section = new Section(
        {
          items: cards.reverse(),
          renderer: createNewCard,
          userId: globals.userInfo._id,
        },
        cardsContainer
      );
      globals.section.renderItems();
    })
    .catch((err) => console.log(err));

// Setting user and rendering initial cards
api
  .getMe()
  .then((user) => {
    globals.userInfo = new UserInfo({ currentName, currentAbout });

    globals.userInfo.setUserInfo({
      inputName: user.name,
      inputAbout: user.about,
    });

    initialCardsRender();
  })
  .catch((err) => console.log(err));

// Event listeners
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = currentName.textContent;
  profileAboutInput.value = currentAbout.textContent;
  profileFormValidator.resetValidation();
  profilePopup.open();
});

addCardButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  newCardPopup.open();
});

// Forms validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
