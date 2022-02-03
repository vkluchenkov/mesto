import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, modalButton, submitHandler) {
    super(popupSelector);
    this._modalButton = modalButton;
    this._submitHandler = submitHandler;
    this._modalSubmit = this._modalSubmit.bind(this);
  }

  _modalSubmit() {
    this._modalButton.textContent = "Удаление...";
    this._submitHandler()
      .catch((err) => console.log(err))
      .finally(() => {
        setTimeout(() => {
          this._modalButton.textContent = "Да";
        }, 1000);
      });
  }

  _setEventListeners() {
    super._setEventListeners();
    this._modalButton.addEventListener("click", this._modalSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._modalButton.removeEventListener("click", this._modalSubmit);
  }
}
