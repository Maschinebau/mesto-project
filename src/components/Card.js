import {api} from '../pages/index.js'
import {openImgPopup} from './modal.js'

//создаем карточку

export function createCard(data, userId) {
  const cardTemplate = document.querySelector('.add-card-template').content
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true)
  const likeButton = cardElement.querySelector('.element__like-button')
  const likeCount = cardElement.querySelector('.element__like-count')
  const trashButton = cardElement.querySelector('.element__trash-btn')
  const cardImg = cardElement.querySelector('.element__img')
  const cardTitle = cardElement.querySelector('.element__title')
  
  cardTitle.textContent = data.name
  cardImg.src = data.link
  cardImg.alt = data.name

  // добавляем открытие попапа с изображением
  
  cardImg.addEventListener('click', () => openImgPopup(data.name, data.link))

  // добавляем лайки в карточку

  likeCount.textContent = data.likes.length
  data.likes.length <= 0 ? likeCount.classList.add('element__like-count_disabled') : likeCount.classList.remove('element__like-count_disabled')
  likeButton.addEventListener('click', (evt) => {
    if(likeButton.classList.contains('element__like-button_active')) {
      api.deleteLike(data._id)
        .then(res => {
          likeCount.textContent = res.likes.length
          likeButton.classList.remove('element__like-button_active')
          res.likes.length <= 0 ? likeCount.classList.add('element__like-count_disabled') 
            : likeCount.classList.remove('element__like-count_disabled')
        })
        .catch(err=> {
          console.log(err)
        })
    } else {
      api.addLike(data._id)
        .then(res => {
          likeCount.textContent = res.likes.length
          likeButton.classList.add('element__like-button_active')
          res.likes.length <= 0 ? likeCount.classList.add('element__like-count_disabled') 
            : likeCount.classList.remove('element__like-count_disabled')
        })
        .catch(err => {
          console.log(err)
        })
    }
  })

  // ищем наши лайки 

  data.likes.forEach(like => {
    if(like._id === userId) {
      likeButton.classList.add('element__like-button_active')
    }
  })

  // убираем кнопку удаления для дефолтных карточек

  if(data.owner._id !== userId) {
    trashButton.classList.add('element__trash-btn-hidden')
  } else {
    trashButton.addEventListener('click', () => {
      api.deleteCard(data._id)
        .then(() => {
          trashButton.closest('.element').remove()
        })
        .catch((err)=> {
          console.log(err)
        })
    })
  }

  return cardElement;
}

export default class Card {
  constructor(data, userId, templateSelector) {
    this._data = data
    this._userId = userId
    this._templateSelector = templateSelector
  }
  _getElement() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true)

    return cardElement
  }

  generateCard() {
    this.card = this._getElement()
    this._likeButton = this._card.querySelector('.element__like-button')
    this._likeCount = this._card.querySelector('.element__like-count')
    this._trashButton = this._card.querySelector('.element__trash-btn')
    this._cardImg = this._card.querySelector('.element__img')
    this._cardTitle = this._card.querySelector('.element__title')
    this._cardTitle.textContent = this._data.name
    this._cardImg.src = this._data.link
    this._cardImg.alt = this._data.name
    this._likeCount.textContent = this._data.likes.length
    this._data.likes.length <= 0 ? this._likeCount.classList.add('element__like-count_disabled') : this._likeCount.classList.remove('element__like-count_disabled')
    this._setTrashButton()
    this._setLikeButton()
    this._setImgPopup()

    return this._card
  }

  _setImgPopup() {
    this._cardImg.addEventListener('click', () => openImgPopup(this._data.name, this._data.link))
  }

  _setTrashButton() {
    if(data.owner._id !== userId) {
      trashButton.classList.add('element__trash-btn-hidden')
    } else {
      trashButton.addEventListener('click', () => {
        api.deleteCard(data._id)
          .then(() => {
            trashButton.closest('.element').remove()
          })
          .catch((err)=> {
            console.log(err)
          })
      })
    }
  }

  _setLikeButton() {
    this._likeButton.addEventListener('click', (evt) => {
      if(this._likeButton.classList.contains('element__like-button_active')) {
        api.deleteLike(data._id)
          .then(res => {
            this._likeCount.textContent = res.likes.length
            this._likeButton.classList.remove('element__like-button_active')
            res.likes.length <= 0 
              ? this._likeCount.classList.add('element__like-count_disabled') 
              : this._likeCount.classList.remove('element__like-count_disabled')
          })
          .catch(err=> {
            console.log(err)
          })
      } else {
        api.addLike(data._id)
          .then(res => {
            this._likeCount.textContent = res.likes.length
            this._likeButton.classList.add('element__like-button_active')
            res.likes.length <= 0 
              ? this._likeCount.classList.add('element__like-count_disabled') 
              : this._likeCount.classList.remove('element__like-count_disabled')
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  }
}