import "./index.css";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
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
  cardTemplateSelector,
  profileFormValidator,
  cardFormValidator,
  avatarFormValidator,
  api,
  modalSelector,
  modalButton,
  avatar,
  avatarOverlay,
  avatarPopupSelector,
} from "../components/utils/constants.js";

// Globals container
const globals = {};

// Handlers
const submitProfileHandler = ({ newName, newAbout }) =>
  api.patchMe({ name: newName, about: newAbout }).then(() => globals.userInfo.setUserInfo({ newName, newAbout }));

const submitCardHandler = ({ placeName, placeLink }) =>
  api
    .postCard({ name: placeName, link: placeLink })
    .then((card) => createNewCard(card))
    .then((newCard) => globals.section.addItem(newCard));

const modalHandler = () => {
  const cardElement = document.querySelector(`#card${globals.cardId}`);
  return api.deleteCard(globals.cardId).then((res) => {
    console.log(res);
    cardElement.remove();
    popupModal.close();
  });
};

const deleteCardHandler = (cardId) => {
  globals.cardId = cardId;
  popupModal.open();
};

const submitAvatarHandler = ({ avatarLink }) =>
  api.patchAvatar(avatarLink).then((user) =>
    globals.userInfo.setUserInfo({
      newName: user.name,
      newAbout: user.about,
      newAvatar: user.avatar,
    })
  );

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

// Initial cards rendering
const initialCardsRender = () =>
  api
    .getCards()
    .then((cards) => {
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

// Setting user and rendering initial cards
api
  .getMe()
  .then((user) => {
    globals.userInfo = new UserInfo({ currentName, currentAbout, avatar, userId: user._id });

    globals.userInfo.setUserInfo({
      newName: user.name,
      newAbout: user.about,
      newAvatar: user.avatar,
    });
    initialCardsRender();
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
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
