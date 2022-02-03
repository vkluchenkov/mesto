import { Popup } from "./Popup.js";

export class PopupModal extends Popup {
  constructor(popupSelector, modalButton, submitHandler) {
    super(popupSelector);
    this._modalButton = modalButton;
    this._submitHandler = submitHandler;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._modalButton.addEventListener("click", () => this._submitHandler());
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._modalButton.removeEventListener("click", () => this._submitHandler());
  }
}
