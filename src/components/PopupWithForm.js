import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".popup__form");
    this._button = this._form.querySelector(".popup__submit-button");
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
    this._button.textContent = "Сохранение...";
    this._submitHandler(this._getInputValues())
      .catch((err) => console.log(err))
      .finally(() => {
        this.close();
        setTimeout(() => {
          this._button.textContent = "Сохранить";
        }, 1000);
      });
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
