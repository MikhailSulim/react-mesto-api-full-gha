class Api {
  constructor({ serverUrl, headers, credentials }) {
    this._serverUrl = serverUrl;
    this._headers = headers;
    this._credentials = credentials;
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
      credentials: this._credentials,
    });
  }

  getUserInfo() {
    // функция получения данных о залогиненном пользователе с сервера
    return this._request(`${this._serverUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
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
      credentials: this._credentials,
      body: JSON.stringify({
        name: place.name,
        link: place.link,
      }),
    });
  }

  setUserInfo({name, about}) {
    // функция замены данных о пользователе на сервере
    return this._request(`${this._serverUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }
  // setUserInfo(userData) {
  //   // функция замены данных о пользователе на сервере
  //   return this._request(`${this._serverUrl}/users/me`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     credentials: this._credentials,
  //     body: JSON.stringify({
  //       name: userData.name,
  //       about: userData.about,
  //     }),
  //   });
  // }

  setUserAvatar(newAvatar) {
    // функция замены данных об аватаре пользователя
    return this._request(`${this._serverUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
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
      credentials: this._credentials,
    });
  }

  /* -------------- удаление данных на сервере -------------*/
  deleteCard(cardId) {
    // функция удаления данных выбранной карточки с сервера
    return this._request(`${this._serverUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    });
  }
}

const api = new Api({
  // serverUrl: "https://mesto.nomoreparties.co/v1/cohort-59", // класс API
  serverUrl: "https://api.mesto2023.mihailsulim.nomoredomains.monster",
  headers: {
    // authorization: "015f9389-f767-4004-b14e-b18f050be44c",
    "Content-Type": "application/json",
  },
  credentials: 'include', // куки посылаются вместе с запросом
});

export default api;
