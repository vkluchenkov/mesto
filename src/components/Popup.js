export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleClickClose = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
    if (evt.target.classList.contains("popup__close-button")) {
      this.close();
    }
  };

  _setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("click", this._handleClickClose);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("click", this._handleClickClose);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventListeners();
  }
}
