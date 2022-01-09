export class Card {
  constructor({ card, cardTemplateSelector, openHandler }) {
    this._link = card.link;
    this._name = card.name;
    this._openHandler = openHandler;

    this._cardsTemplate = document.querySelector(cardTemplateSelector).content;
    this._cardElement = this._cardsTemplate.querySelector(".place").cloneNode(true);
    this._like = this._cardElement.querySelector(".place__like");
    this._image = this._cardElement.querySelector(".place__image");
    this._trash = this._cardElement.querySelector(".place__trash");
    this._title = this._cardElement.querySelector(".place__name");
  }

  _addEventListeners() {
    this._like.addEventListener("click", () => this._like.classList.toggle("place__like_active"));
    this._trash.addEventListener("click", () => this._cardElement.remove());
    this._image.addEventListener("click", () => this._openHandler());
  }

  createCard() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._addEventListeners();

    return this._cardElement;
  }
}
