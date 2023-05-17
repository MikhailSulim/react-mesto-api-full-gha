class Api {
  constructor({ serverUrl, headers }) {
    this._serverUrl = serverUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    // функция проверки статуса запроса с сервера
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status} ${res.statusText}`);
  }

  _request(url, options) {
    // функция отправки запроса с проверкой ответа
    return fetch(url, options).then(this._checkResponse);
    // второй then нужен потому что res.json тоже асинхронный и его надо дождаться
  }

  /* ----------- получение данных с сервера --------------- */
  getCards() {
    // функция получения массива данных карточек с сервера
    return this._request(`${this._serverUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getUserInfo() {
    // функция получения данных о залогиненном пользователе с сервера
    return this._request(`${this._serverUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getAllData() {
    // функция получения всех данных вместе
    return Promise.all([this.getCards(), this.getUserInfo()]);
  }

  /* -------------- отправка данных на сервер --------------------*/
  createCard(place) {
    // функция отправки на сервер данных о новой карточке
    return this._request(`${this._serverUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: place.name,
        link: place.link,
      }),
    });
  }

  setUserInfo(userData) {
    // функция замены данных о пользователе на сервере
    return this._request(`${this._serverUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    });
  }

  setUserAvatar(newAvatar) {
    // функция замены данных об аватаре пользователя
    return this._request(`${this._serverUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar.avatar,
      }),
    });
  }

  /* -------------- функционал лайков ----------------*/
  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
    });
  }

  /* -------------- удаление данных на сервере -------------*/
  deleteCard(cardId) {
    // функция удаления данных выбранной карточки с сервера
    return this._request(`${this._serverUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

const api = new Api({
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-59", // класс API
  headers: {
    authorization: "015f9389-f767-4004-b14e-b18f050be44c",
    "Content-Type": "application/json",
  },
});

export default api;
