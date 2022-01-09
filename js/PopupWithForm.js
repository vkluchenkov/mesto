import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _formEvents = (evt) => {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
    this.close();
  };

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener("submit", this._formEvents);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener("submit", this._formEvents);
  }

  close() {
    this._form.reset();
    super.close();
  }
}