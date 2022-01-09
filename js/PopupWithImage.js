import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, { name, link }) {
    super(popupSelector);
    this._name = name;
    this._link = link;

    this._imageLink = this._popup.querySelector(".popup__image");
    this._imageCaption = this._popup.querySelector(".popup__image-caption");
  }

  open() {
    this._imageLink.src = this._link;
    this._imageLink.alt = this._name;
    this._imageCaption.textContent = this._name;
    super.open();
  }
}
