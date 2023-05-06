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
    openCardPopupButton,
    cardPopup,
    profileName,
    profileSignature,
    profileSubmitButton,
    profileNameInput,
    profileSignatureInput,
    avatarImg,
    avatarContainer,
    avatarPopup,
    avatarPopupSubmit,
    avatarLinkInput,
    cardTitleInput,
    cardLinkInput,
    cardPopupSubmit,
    profilePopup} from './modal.js'
import {userId} from '../index.js'

export const cardsContainer = document.querySelector('.elements__list')

//создаем карточку

export function createCard(data) {
  const cardTemplate = document.querySelector('.add-card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const imgPopup = document.querySelector('.popup_type_image');
  const fullsizeImage = imgPopup.querySelector('.popup__fullsize-image');
  const likeButton = cardElement.querySelector('.element__like-button')
  const likeCount = cardElement.querySelector('.element__like-count')
  const trashButton = cardElement.querySelector('.element__trash-btn')
  
  cardElement.querySelector('.element__title').textContent = data.name;
  cardElement.querySelector('.element__img').src = data.link;
  cardElement.querySelector('.element__img').alt = data.name;

  const imgFigcaption = imgPopup.querySelector('.popup__figcaption');
  cardElement.querySelector('.element__img').addEventListener('click', () => {
    fullsizeImage.src = data.link;
    fullsizeImage.alt = data.name;
    imgFigcaption.textContent = data.name;
    openPopup(imgPopup);
  });

  // добавляем лайки в карточку

  likeCount.textContent = data.likes.length
  likeButton.addEventListener('click', () => {
    if(likeButton.classList.contains('element__like-button_active')) {
      deleteLike(data._id)
        .then(res => {
          likeCount.textContent = res.likes.length
          likeButton.classList.remove('element__like-button_active')
        })
        .catch(err=> {
          console.log(err)
        })
    } else {
      addLike(data._id)
        .then(res => {
          likeCount.textContent = res.likes.length
          likeButton.classList.add('element__like-button_active')
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

// Функция добавления карточки

export function addCard(evt) {
  evt.preventDefault()
  cardPopupSubmit.textContent = 'Сохранение...'
  const data = {name: cardTitleInput.value, link: cardLinkInput.value}
  uploadCard(data)
    .then(res => {
      cardsContainer.prepend(createCard(res))
      closePopup(cardPopup)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      cardPopupSubmit.textContent = 'Сохранить'
    })
  evt.target.reset()
}

// добавляем новый аватар

export function addAvatar(evt) {
  evt.preventDefault()
  avatarPopupSubmit.textContent = 'Сохранение...'
  const data = {avatar: avatarLinkInput.value}
  uploadAvatar(data)
    .then(res => {
      avatarImg.src = res.avatar
      closePopup(avatarPopup)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      avatarPopupSubmit.textContent = 'Сохранить'
    })
  evt.target.reset()
}

// обновляем данные профиля

export function updateBio(evt) {
  evt.preventDefault()
  profileSubmitButton.textContent = 'Сохранение...'
  const data = {name: profileNameInput.value, about: profileSignatureInput.value}
  changeBio(data)
    .then(res => {
      profileName.textContent = res.name
      profileSignature.textContent = res.about
      closePopup(profilePopup)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      profileSubmitButton.textContent = 'Сохранить'
    })
  evt.target.reset()
}

// функции закрытия и открытия попапов

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

export const openPopup = popup => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape)
}

export const closePopup = popup => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape)
} 


