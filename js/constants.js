const imagePopup = document.querySelector("#image_popup");
const imageLink = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__image-caption");

const currentName = document.querySelector(".title__name");
const currentJob = document.querySelector(".title__description");

const profilePopup = document.querySelector("#edit_profile");
const profileNameInput = profilePopup.querySelector("#input-name");
const profileJobInput = profilePopup.querySelector("#input-job");
const profileForm = profilePopup.querySelector("#profile_form");

const addCardPopup = document.querySelector("#add_place");
const cardNameInput = addCardPopup.querySelector("#place-name");
const cardLinkInput = addCardPopup.querySelector("#place-link");
const addCardForm = addCardPopup.querySelector("#add_place_form");
const cardsContainer = document.querySelector(".places__grid");

const profileEditButton = document.querySelector(".title__name-edit");
const addCardButton = document.querySelector(".title__button");
const popups = document.querySelectorAll(".popup");

export {
  imagePopup,
  imageLink,
  imageCaption,
  currentName,
  currentJob,
  profilePopup,
  profileNameInput,
  profileJobInput,
  profileForm,
  addCardPopup,
  cardNameInput,
  cardLinkInput,
  addCardForm,
  cardsContainer,
  profileEditButton,
  addCardButton,
  popups,
};
