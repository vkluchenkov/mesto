import { imageLink, imageCaption, imagePopup, openPopup } from "./data.js";
export class Card {
  constructor(card, cardTemplateSelector) {
    this._link = card.link;
    this._name = card.name;

    this._cardsTemplate = document.querySelector(cardTemplateSelector).content;
    this._cardElement = this._cardsTemplate.querySelector(".place").cloneNode(true);
    this._like = this._cardElement.querySelector(".place__like");
    this._image = this._cardElement.querySelector(".place__image");
    this._trash = this._cardElement.querySelector(".place__trash");
  }

  _addEventListeners() {
    this._like.addEventListener("click", (evt) => evt.target.classList.toggle("place__like_active"));

    this._trash.addEventListener("click", (evt) => evt.target.closest(".place").remove());

    this._image.addEventListener("click", () => {
      imageLink.src = this._link;
      imageLink.alt = this._name;
      imageCaption.textContent = this._name;
      openPopup(imagePopup);
    });
  }

  createCard() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._cardElement.querySelector(".place__name").textContent = this._name;

    this._addEventListeners();

    return this._cardElement;
  }
}
