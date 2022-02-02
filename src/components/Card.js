export class Card {
  constructor({ card, cardTemplateSelector, openHandler, userId, killer }) {
    this._link = card.link;
    this._name = card.name;
    this._likes = card.likes; // not used yet
    this._id = card._id; // not used yet
    this._userId = userId;
    this._ownerId = card.owner._id;

    this._openHandler = openHandler;
    this._killer = killer;

    this._template = document.querySelector(cardTemplateSelector).content;
    this._cardElement = this._template.querySelector(".place").cloneNode(true);
    this._like = this._cardElement.querySelector(".place__like");
    this._image = this._cardElement.querySelector(".place__image");
    this._title = this._cardElement.querySelector(".place__name");
    this._trash = this._cardElement.querySelector(".place__trash");

    if (this._ownerId != this._userId) {
      this._trash.classList.add("place__trash_hidden");
    }
  }

  _addEventListeners() {
    this._like.addEventListener("click", () => this._like.classList.toggle("place__like_active"));
    this._image.addEventListener("click", () => this._openHandler());
    this._trash.addEventListener("click", () => this._killer().then(() => this._cardElement.remove()));
  }

  createCard() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._addEventListeners();
    return this._cardElement;
  }
}
