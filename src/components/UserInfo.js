export class UserInfo {
  constructor({ currentName, currentJob }) {
    this._currentName = currentName;
    this._currentJob = currentJob;
  }

  getUserInfo() {
    return {
      name: this._currentName.textContent,
      job: this._currentJob.textContent,
    };
  }

  setUserInfo({ inputName, inputJob }) {
    this._currentName.textContent = inputName;
    this._currentJob.textContent = inputJob;
  }
}
