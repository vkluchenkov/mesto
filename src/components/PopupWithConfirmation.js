import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, modalButton, submitHandler) {
    super(popupSelector);
    this._modalButton = modalButton;
    this._submitHandler = submitHandler;
  }

  _submitModal = () => {
    this._modalButton.textContent = "Удаление...";
    this._submitHandler()
      .then(() => this.close())
      .finally(() => {
        // Даем время попапу для fade out и меняем надпись
        setTimeout(() => {
          this._modalButton.textContent = "Да";
        }, 1000);
      });
  };

  _setEventListeners() {
    super._setEventListeners();
    this._modalButton.addEventListener("click", this._submitModal);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._modalButton.removeEventListener("click", this._submitModal);
  }
}
