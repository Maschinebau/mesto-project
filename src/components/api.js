const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23/',
  headers: {
      authorization: '181415f7-ca80-4d4d-a37f-42db628425bb',
      'Content-Type': 'application/json'
  }
}

// проверяем ответ от сервера

function checkResponse(result) {
  return result.ok ? result.json() : Promise.reject(`Ошибка: ${result.status}`)
}

function uploadCard(values) {
  return fetch(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(values)
  })
  .then(checkResponse);
}

function deleteCard(id) {
  return fetch(`${config.baseUrl}cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse);
}

function loadCards() {
  return fetch(`${config.baseUrl}cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(checkResponse);
}

function addLike(id) {
  return fetch(`${config.baseUrl}cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(checkResponse);
}

function deleteLike(id) {
  return fetch(`${config.baseUrl}cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
}

function changeBio(values) {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(values)
  })
  .then(checkResponse);
}

function uploadAvatar(values) {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(values)
  })
  .then(checkResponse);
}

function getProfile() {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(checkResponse);
}

export {
  checkResponse, 
  changeBio, 
  uploadCard, 
  uploadAvatar, 
  getProfile, 
  loadCards, 
  deleteLike, 
  addLike, 
  deleteCard}