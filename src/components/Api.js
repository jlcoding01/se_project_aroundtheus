export default class Api {
  constructor(baseUrl, header) {
    this._baseUrl = baseUrl;
    this._header = header;
  }

  _checkPromise(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error:${res.status}`);
  }

  _getFetch(url, options) {
    return fetch(url, options).then(this._checkPromise);
  }

  getInitialCards() {
    return this._getFetch(`${this._baseUrl}/cards`, {
      headers: this._header,
    });
  }

  getUserInfo() {
    return this._getFetch(`${this._baseUrl}/users/me`, {
      headers: this._header,
    }).then((userInfo) => {
      return userInfo;
    });
  }

  editProfile(name, about) {
    return this._getFetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  addNewCard(name, link) {
    return this._getFetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._getFetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._header,
    });
  }

  renderCard(renderer) {
    return Promise.all(renderer);
  }
}
