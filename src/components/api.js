export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl
    this._headers = config.headers
  }

  _checkResponse(result) {
    return result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`)
  }
  
  uploadCard(values) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(values)
    })
    .then(this._checkResponse);
  }
  
  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
  
  loadCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
  
  addLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
  
  deleteLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
  
  changeBio(values) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(values)
    })
    .then(this._checkResponse);
  }
  
  uploadAvatar(values) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(values)
    })
    .then(this._checkResponse);
  }
  
  getProfile() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
}