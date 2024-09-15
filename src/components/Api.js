export default class API {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
      .then((data) => {
        console.log("Response data:", data); // Debug line
        return data;
      })
      .catch((error) => {
        console.error("Error in fetch:", error); // Debug line
        throw error; // Optional: re-throw to propagate error
      });
  }

  //   updateProfileInfo({ title, description }) {
  //     return fetch(`${this._baseUrl}/users/me`, {
  //       method: "PATCH",
  //       headers: this._headers,
  //       body: JSON.stringify({
  //         name: title,
  //         about: description,
  //       }),
  //     }).then(this._handleResponse);
  //   }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  updateProfileAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._handleResponse);
  }

  getAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

//    User Routes

//   GET /users/me – Get the current user’s info
//   PATCH /users/me – Update your profile information
//   PATCH /users/me/avatar – Update avatar

//   Card routes

//   GET /cards – Get all cards
//   POST /cards – Create a card
//   DELETE /cards/:cardId – Delete a card
//   PUT /cards/:cardId/likes – Like a card
//   DELETE /cards/:cardId/likes – Dislike a card
