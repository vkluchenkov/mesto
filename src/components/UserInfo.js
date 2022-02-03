export class UserInfo {
  constructor({ currentName, currentAbout, avatar, userId }) {
    this._currentName = currentName;
    this._currentAbout = currentAbout;
    this._avatar = avatar;
    this.userId = userId;
  }

  getUserInfo() {
    return {
      name: this._currentName.textContent,
      about: this._currentAbout.textContent,
    };
  }

  setUserInfo({ newName, newAbout, newAvatar }) {
    newName ? (this._currentName.textContent = newName) : this._currentName.textContent;
    newAbout ? (this._currentAbout.textContent = newAbout) : this._currentAbout.textContent;
    newAvatar ? (this._avatar.src = newAvatar) : this._avatar.src;
  }
}
