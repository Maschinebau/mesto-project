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
    closePopup
} from './modal.js'
    import {
      profilePopup,
      profileSubmitButton,
      profileName,
      profileSignature,
      nameButton,
      profileNameInput,
      profileSignatureInput,
      avatarImg,
      avatarContainer,
      avatarPopup,
      avatarPopupSubmit,
      avatarLinkInput,
      openCardPopupButton,
      cardPopup,
      cardTitleInput,
      cardLinkInput,
      cardPopupSubmit,
      cardsContainer
    } from './utils.js'
    import {userId} from '../index.js'

//создаем карточку

export function createCard(data) {
  const cardTemplate = document.querySelector('.add-card-template').content
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true)
  const imgPopup = document.querySelector('.popup_type_image')
  const likeButton = cardElement.querySelector('.element__like-button')
  const likeCount = cardElement.querySelector('.element__like-count')
  const trashButton = cardElement.querySelector('.element__trash-btn')
  
  cardElement.querySelector('.element__title').textContent = data.name
  cardElement.querySelector('.element__img').src = data.link
  cardElement.querySelector('.element__img').alt = data.name

  const fullsizeImage = imgPopup.querySelector('.popup__fullsize-image')
  const imgFigcaption = imgPopup.querySelector('.popup__figcaption')
  cardElement.querySelector('.element__img').addEventListener('click', () => {
    fullsizeImage.src = data.link
    fullsizeImage.alt = data.name
    imgFigcaption.textContent = data.name
    openPopup(imgPopup)
  })

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