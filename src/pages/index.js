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
  api,
} from "../components/utils/constants.js";

// Globals container
const globals = {};

// Submit handlers
const submitProfileHandler = ({ newName, newAbout }) =>
  api
    .patchMe({ name: newName, about: newAbout })
    .then(() => globals.userInfo.setUserInfo({ newName, newAbout }))
    .catch((err) => console.log(err));

const submitCardHandler = ({ placeName, placeLink }) =>
  api
    .postCard({ name: placeName, link: placeLink })
    .then((card) => createNewCard(card))
    .then((newCard) => globals.section.addItem(newCard))
    .catch((err) => console.log(err));

// Classes initialization
const popupWithImage = new PopupWithImage(imagePopupSelector);
const profilePopup = new PopupWithForm(profilePopupSelector, submitProfileHandler);
const newCardPopup = new PopupWithForm(addCardPopupSelector, submitCardHandler);

// Callbacks
const deleteCardHandler = (cardId) =>
  api
    .deleteCard(cardId)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

const createNewCard = (card) =>
  new Card({
    card,
    cardTemplateSelector: cardsTemplate,
    userId: globals.userInfo.userId,
    openHandler: () => popupWithImage.open(card),
    deleteHandler: () => deleteCardHandler(card._id),
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
    globals.userInfo = new UserInfo({ currentName, currentAbout, userId: user._id });

    globals.userInfo.setUserInfo({
      newName: user.name,
      newAbout: user.about,
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

// Forms validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();