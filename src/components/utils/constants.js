const avatar = document.querySelector(".title__image");
const avatarOverlay = document.querySelector(".title__image-overlay");
const avatarPopupSelector = "#new_avatar";
const avatarForm = document.querySelector("#new_avatar_form");

const imagePopupSelector = "#image_popup";

const currentName = document.querySelector(".title__name");
const currentAbout = document.querySelector(".title__description");

const profilePopupSelector = "#edit_profile";
const profilePopupElem = document.querySelector(profilePopupSelector);
const profileNameInput = profilePopupElem.querySelector("#input-name");
const profileAboutInput = profilePopupElem.querySelector("#input-about");
const profileForm = profilePopupElem.querySelector("#profile_form");

const addCardPopupSelector = "#add_place";
const addCardPopupElem = document.querySelector("#add_place");
const addCardForm = addCardPopupElem.querySelector("#add_place_form");

const modalSelector = "#modal";
const modalElement = document.querySelector(modalSelector);
const modalButton = modalElement.querySelector(".popup__submit-button_modal");

const cardsContainer = ".places__grid";
const cardTemplateSelector = "#card-template";

const profileEditButton = document.querySelector(".title__name-edit");
const addCardButton = document.querySelector(".title__button");

const validatorOptions = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_type_visible",
};

export {
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
};
