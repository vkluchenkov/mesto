const imagePopup = "#image_popup";

const currentName = document.querySelector(".title__name");
const currentJob = document.querySelector(".title__description");

const profilePopup = "#edit_profile";
// const profilePopup = document.querySelector("#edit_profile");
const profilePopupOld = document.querySelector("#edit_profile");
const profileNameInput = profilePopupOld.querySelector("#input-name");
const profileJobInput = profilePopupOld.querySelector("#input-job");
const profileForm = profilePopupOld.querySelector("#profile_form");

const addCardPopup = "#add_place";
// const addCardPopup = document.querySelector("#add_place");
const addCardPopupElement = document.querySelector("#add_place");
// const cardNameInput = addCardPopupElement.querySelector("#place-name");
// const cardLinkInput = addCardPopupElement.querySelector("#place-link");
const addCardForm = addCardPopupElement.querySelector("#add_place_form");
const cardsContainer = ".places__grid";

const profileEditButton = document.querySelector(".title__name-edit");
const addCardButton = document.querySelector(".title__button");

export {
  imagePopup,
  // imageLink,
  // imageCaption,
  currentName,
  currentJob,
  profilePopup,
  profileNameInput,
  profileJobInput,
  profileForm,
  addCardPopup,
  addCardPopupElement as addCardPopupOld,
  // cardNameInput,
  // cardLinkInput,
  addCardForm,
  cardsContainer,
  profileEditButton,
  addCardButton,
};
