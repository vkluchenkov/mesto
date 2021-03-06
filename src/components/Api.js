export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._resHandler = (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  // Returns array of cards
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._resHandler(res));
  }

  //Takes name & link. Returns card
  postCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then((res) => this._resHandler(res));
  }

  // Returns OK msg
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._resHandler(res));
  }

  // Returns user
  getMe() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._resHandler(res));
  }

  // Takes name and about. Returns user
  patchMe(me) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(me),
    }).then((res) => this._resHandler(res));
  }

  // Returns user
  patchAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarLink }),
    }).then((res) => this._resHandler(res));
  }

  // Returns card
  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._resHandler(res));
  }

  // Returns card
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._resHandler(res));
  }
}
