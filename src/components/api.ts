import { CardData, Profile } from "./types"

type Config = {
  baseUrl: string
  headers: {
    authorization: string
    "Content-Type": string
  }
}

type ApiResponse = {
  ok: boolean
  status: number
  json(): Promise<any>
}

type CardArray = CardData[]

const config: Config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-23/",
  headers: {
    authorization: "181415f7-ca80-4d4d-a37f-42db628425bb",
    "Content-Type": "application/json"
  }
}

// проверяем ответ от сервера

async function checkResponse(res: ApiResponse) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

async function uploadCard(values: { name: string; link: string }): Promise<CardData> {
  return await fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(values)
  }).then(checkResponse)
}

async function deleteCard(id: string): Promise<any> {
  return await fetch(`${config.baseUrl}cards/${id}`, {
    method: "DELETE",
    headers: config.headers
  }).then(checkResponse)
}

async function loadCards(): Promise<CardArray> {
  return await fetch(`${config.baseUrl}cards`, {
    method: "GET",
    headers: config.headers
  }).then(checkResponse)
}

async function addLike(id: string): Promise<any> {
  return await fetch(`${config.baseUrl}cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers
  }).then(checkResponse)
}

async function deleteLike(id: string): Promise<any> {
  return await fetch(`${config.baseUrl}cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers
  }).then(checkResponse)
}

type ChangeBioData = {
  name: string
  about: string
}

async function changeBio(values: ChangeBioData): Promise<Profile> {
  return await fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(values)
  }).then(checkResponse)
}

type UploadAvatarData = {
  avatar: string
}

async function uploadAvatar(values: UploadAvatarData): Promise<Profile> {
  return await fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(values)
  }).then(checkResponse)
}

async function getProfile(): Promise<Profile> {
  return await fetch(`${config.baseUrl}users/me`, {
    method: "GET",
    headers: config.headers
  }).then(checkResponse)
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
  deleteCard
}
