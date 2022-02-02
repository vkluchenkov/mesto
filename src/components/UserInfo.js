export class UserInfo {
  constructor({ currentName, currentAbout }) {
    this._userName = currentName;
    this._currentAbout = currentAbout;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._currentAbout.textContent,
    };
  }

  setUserInfo({ inputName, inputAbout }) {
    this._userName.textContent = inputName;
    this._currentAbout.textContent = inputAbout;
  }
}
