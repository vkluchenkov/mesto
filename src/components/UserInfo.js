export class UserInfo {
  constructor({ currentName, currentAbout, userId }) {
    this._currentName = currentName;
    this._currentAbout = currentAbout;
    this.userId = userId;
  }

  getUserInfo() {
    return {
      name: this._currentName.textContent,
      about: this._currentAbout.textContent,
    };
  }

  setUserInfo({ newName, newAbout }) {
    this._currentName.textContent = newName;
    this._currentAbout.textContent = newAbout;
  }
}
