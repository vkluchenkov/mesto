export class UserInfo {
  constructor({ currentName, currentJob }, user) {
    this._currentName = currentName;
    this._currentJob = currentJob;
    this.id = user._id;
  }

  getUserInfo() {
    return {
      name: this._currentName.textContent,
      job: this._currentJob.textContent,
      id: this.id,
    };
  }

  setUserInfo({ inputName, inputJob }) {
    this._currentName.textContent = inputName;
    this._currentJob.textContent = inputJob;
  }
}
