export class Card {
  constructor({ card, cardTemplateSelector, openHandler, userId, deleteHandler, putLikeHandler, deleteLikeHandler }) {
    this._link = card.link;
    this._name = card.name;
    this._likes = card.likes;
    this._id = card._id;
    this._userId = userId;
    this._ownerId = card.owner._id;

    this._openHandler = openHandler;
    this._deleteHandler = deleteHandler;
    this._putLikeHandler = putLikeHandler;
    this._deleteLikeHandler = deleteLikeHandler;

    this._template = document.querySelector(cardTemplateSelector).content;
    this._cardElement = this._template.querySelector(".place").cloneNode(true);
    this._like = this._cardElement.querySelector(".place__like");
    this._likeCounter = this._cardElement.querySelector(".place__like_counter");
    this._image = this._cardElement.querySelector(".place__image");
    this._title = this._cardElement.querySelector(".place__name");
    this._trash = this._cardElement.querySelector(".place__trash");

    this._hasMyLike = this._likes.find((like) => like._id === this._userId);

    if (this._ownerId != this._userId) {
      this._trash.classList.add("place__trash_hidden");
    }
  }

  _likeToggle() {
    const action = () =>
      this._like.classList.contains("place__like_active") ? this._deleteLikeHandler() : this._putLikeHandler();

    action().then((res) => {
      this._likes = res.likes;
      this._likeCounter.textContent = this._likes.length;
    });

    this._like.classList.toggle("place__like_active");
  }

  _addEventListeners() {
    this._like.addEventListener("click", () => this._likeToggle());
    this._image.addEventListener("click", () => this._openHandler());
    this._trash.addEventListener("click", () => this._deleteHandler());
  }

  createCard() {
    this._hasMyLike ? this._like.classList.add("place__like_active") : null;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
    this._cardElement.id = "card" + this._id;

    this._addEventListeners();
    return this._cardElement;
  }
}
