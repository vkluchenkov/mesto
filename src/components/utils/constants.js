import { FormValidator } from "../FormValidator.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const imagePopup = "#image_popup";

const currentName = document.querySelector(".title__name");
const currentJob = document.querySelector(".title__description");

const profilePopup = "#edit_profile";
const profilePopupElem = document.querySelector("#edit_profile");
const profileNameInput = profilePopupElem.querySelector("#input-name");
const profileJobInput = profilePopupElem.querySelector("#input-job");
const profileForm = profilePopupElem.querySelector("#profile_form");

const addCardPopup = "#add_place";
const addCardPopupElem = document.querySelector("#add_place");
const addCardForm = addCardPopupElem.querySelector("#add_place_form");

const cardsContainer = ".places__grid";
const cardsTemplate = "#card-template";

const profileEditButton = document.querySelector(".title__name-edit");
const addCardButton = document.querySelector(".title__button");

const validatorOptions = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_type_visible",
};
const profileFormValidator = new FormValidator(validatorOptions, profileForm);
const cardFormValidator = new FormValidator(validatorOptions, addCardForm);

export {
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
};
