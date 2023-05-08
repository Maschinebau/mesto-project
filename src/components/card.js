import {
  checkResponse, 
  changeBio, 
  uploadCard, 
  uploadAvatar, 
  getProfile, 
  loadCards, 
  deleteLike, 
  addLike, 
  deleteCard} from './api.js'
  import {
    closeByEscape,
    openPopup,
    closePopup,
    openImgPopup
} from './modal.js'

//создаем карточку

export function createCard(data, userId) {
  const cardTemplate = document.querySelector('.add-card-template').content
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true)
  // const imgPopup = document.querySelector('.popup_type_image')
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
      deleteLike(data._id)
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
      addLike(data._id)
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
      deleteCard(data._id)
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