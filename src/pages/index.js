import "./index.css";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  imagePopupSelector,
  currentName,
  currentAbout,
  profilePopupSelector,
  profileForm,
  profileNameInput,
  profileAboutInput,
  addCardPopupSelector,
  addCardForm,
  cardsContainer,
  profileEditButton,
  addCardButton,
  cardTemplateSelector,
  modalSelector,
  modalButton,
  avatar,
  avatarOverlay,
  avatarPopupSelector,
  avatarForm,
  validatorOptions,
} from "../components/utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-35",
  headers: {
    authorization: "1ce0766d-1d99-41e8-b2c1-6a564053af66",
    "Content-Type": "application/json",
  },
});

// Globals container
const globals = {};

// Handlers
const submitProfileHandler = ({ newName, newAbout }) =>
  api
    .patchMe({ name: newName, about: newAbout })
    .then(() => globals.userInfo.setUserInfo({ newName, newAbout }))
    .catch((err) => console.log(err));

const submitCardHandler = ({ placeName, placeLink }) =>
  api
    .postCard({ name: placeName, link: placeLink })
    .then((card) => globals.section.addItem(card))
    .catch((err) => console.log(err));

const modalHandler = () => {
  const cardElement = document.querySelector(`#card${globals.cardId}`);
  return api
    .deleteCard(globals.cardId)
    .then((res) => {
      console.log(res);
      cardElement.remove();
    })
    .catch((err) => console.log(err));
};

const deleteCardHandler = (cardId) => {
  globals.cardId = cardId;
  popupModal.open();
};

const submitAvatarHandler = ({ avatarLink }) =>
  api
    .patchAvatar(avatarLink)
    .then((user) => globals.userInfo.setUserInfo({ newAvatar: user.avatar }))
    .catch((err) => console.log(err));

const putLikeHandler = (cardId) => api.putLike(cardId).catch((err) => console.log(err));
const deleteLikeHandler = (cardId) => api.deleteLike(cardId).catch((err) => console.log(err));

// Popups initialization
const popupWithImage = new PopupWithImage(imagePopupSelector);
const profilePopup = new PopupWithForm(profilePopupSelector, submitProfileHandler);
const newCardPopup = new PopupWithForm(addCardPopupSelector, submitCardHandler);
const avatarPopup = new PopupWithForm(avatarPopupSelector, submitAvatarHandler);
const popupModal = new PopupWithConfirmation(modalSelector, modalButton, modalHandler);

// Callbacks
const createNewCard = (card) =>
  new Card({
    card,
    cardTemplateSelector,
    userId: globals.userInfo.userId,
    openHandler: () => popupWithImage.open(card),
    deleteHandler: () => deleteCardHandler(card._id),
    putLikeHandler: () => putLikeHandler(card._id),
    deleteLikeHandler: () => deleteLikeHandler(card._id),
  }).createCard();

// Setting user and rendering initial cards
Promise.all([api.getMe(), api.getCards()])
  .then(([user, cards]) => {
    globals.userInfo = new UserInfo({ currentName, currentAbout, avatar, userId: user._id });

    globals.userInfo.setUserInfo({
      newName: user.name,
      newAbout: user.about,
      newAvatar: user.avatar,
    });

    globals.section = new Section(
      {
        items: cards.reverse(),
        renderer: createNewCard,
        userId: globals.userInfo.userId,
      },
      cardsContainer
    );

    globals.section.renderItems();
  })
  .catch((err) => console.log(err));

// Event listeners
profileEditButton.addEventListener("click", () => {
  const user = globals.userInfo.getUserInfo();
  profileNameInput.value = user.name;
  profileAboutInput.value = user.about;
  profileFormValidator.resetValidation();
  profilePopup.open();
});

addCardButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  newCardPopup.open();
});

avatarOverlay.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

// Forms validation

const profileFormValidator = new FormValidator(validatorOptions, profileForm);
const cardFormValidator = new FormValidator(validatorOptions, addCardForm);
const avatarFormValidator = new FormValidator(validatorOptions, avatarForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
