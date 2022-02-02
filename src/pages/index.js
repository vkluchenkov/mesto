import "./index.css";

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  imagePopupSelector,
  currentName,
  currentJob,
  profilePopupSelector,
  profileNameInput,
  profileJobInput,
  addCardPopupSelector,
  cardsContainer,
  profileEditButton,
  addCardButton,
  cardsTemplate,
  profileFormValidator,
  cardFormValidator,
} from "../components/utils/constants.js";
import { Api } from "../components/Api.js";

// Submit handlers
const submitProfileHandler = (values) => userInfo.setUserInfo(values);

const submitCardHandler = ({ placeName, placeLink }) => {
  const card = createNewCard({ name: placeName, link: placeLink });
  section.addItem(card);
};

// Classes initialization
const popupWithImage = new PopupWithImage(imagePopupSelector);
const profilePopup = new PopupWithForm(profilePopupSelector, submitProfileHandler);
const newCardPopup = new PopupWithForm(addCardPopupSelector, submitCardHandler);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-35",
  headers: {
    authorization: "1ce0766d-1d99-41e8-b2c1-6a564053af66",
    "Content-Type": "application/json",
  },
});

// Single card constructor
const createNewCard = (card, userId) => {
  const newCard = new Card({
    card: card,
    cardTemplateSelector: cardsTemplate,
    openHandler: () => popupWithImage.open(card),
    userId,
  });
  const newCardElement = newCard.createCard();
  return newCardElement;
};

// Initial cards rendering
const initialCardsRender = (userId) =>
  api
    .getCards()
    .then((cards) => {
      const section = new Section(
        {
          items: cards,
          renderer: createNewCard,
          userId,
        },
        cardsContainer
      );
      section.renderItems();
    })
    .catch((err) => console.log(err));

// Setting user and rendering cards
api
  .getMe()
  .then((user) => {
    const userInfo = new UserInfo({ currentName, currentJob }, user);
    userInfo.setUserInfo({ inputName: user.name, inputJob: user.about });

    profileEditButton.addEventListener("click", () => {
      const currentUser = userInfo.getUserInfo();
      profileNameInput.value = currentUser.name;
      profileJobInput.value = currentUser.job;
      profileFormValidator.resetValidation();
      profilePopup.open();
    });
    initialCardsRender(user._id);
  })
  .catch((err) => console.log(err));

// Event listeners
addCardButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  newCardPopup.open();
});

// Forms validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
