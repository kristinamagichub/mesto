//класс для работы с сервером
export default
  class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  //универсальный метод для каждой отправки на сервер, проверяющий запрос
  _checkResponse(res) { return res.ok ? res.json() : Promise.reject }

  //отправка запроса на сервер для получения информации пользователя
  getInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }

  //отправка запроса на сервер для получения картинок
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }

  setUserInfo(inputsValue) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputsValue.username,
        about: inputsValue.job,
      })
    })
      .then(this._checkResponse)
  }

  setNewAvatar(inputsValue) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputsValue.avatar,

      })
    })
      .then(this._checkResponse)
  }

  addCard(inputsValue) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: inputsValue.title,
        link: inputsValue.link
      })
    })
      .then(this._checkResponse)
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }
}
