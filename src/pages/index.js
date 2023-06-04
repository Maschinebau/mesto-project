import {
  closeByEscape,
  openPopup,
  closePopup,
  openImgPopup
} from '../components/modal.js'
import {enableValidation} from '../components/Validate.js'
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
} from '../utils/utils.js'
import Api from '../components/api.js'
import {createCard} from '../components/Card.js'
import Sectiom from '../components/Section.js'
import './index.css'

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23/',
  headers: {
      authorization: '181415f7-ca80-4d4d-a37f-42db628425bb',
      'Content-Type': 'application/json'
  }
})

// открытие попапа профиля
  
nameButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileSignatureInput.value = profileSignature.textContent;
  openPopup(profilePopup);
});

// открытие попапа аватара

avatarContainer.addEventListener('click', () => openPopup(avatarPopup))

// открытие попапа карточек

openCardPopupButton.addEventListener('click', () => openPopup(cardPopup))

//находим все закрывающие кнопки

const closeButtons = document.querySelectorAll('.popup__close-button'); 
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

// добавляем карточки по submit

cardPopup.addEventListener('submit', addCard)

// добавляем аватар по сабмит

avatarPopup.addEventListener('submit', addAvatar)

// меняем профиль по сабмит

profilePopup.addEventListener('submit', updateBio)

// функция добавления карточки

function addCard(evt) {
  evt.preventDefault()
  cardPopupSubmit.textContent = 'Сохранение...'
  const data = {name: cardTitleInput.value, link: cardLinkInput.value}
  api.uploadCard(data)
    .then(res => {
      cardsContainer.prepend(createCard(res, userId))
      closePopup(cardPopup)
      evt.target.reset()
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      cardPopupSubmit.textContent = 'Сохранить'
    })
}

// добавляем новый аватар

function addAvatar(evt) {
  evt.preventDefault()
  avatarPopupSubmit.textContent = 'Сохранение...'
  const data = {avatar: avatarLinkInput.value}
  api.uploadAvatar(data)
    .then(res => {
      avatarImg.src = res.avatar
      closePopup(avatarPopup)
      evt.target.reset()
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      avatarPopupSubmit.textContent = 'Сохранить'
    })
}

// обновляем данные профиля

function updateBio(evt) {
  evt.preventDefault()
  profileSubmitButton.textContent = 'Сохранение...'
  const data = {name: profileNameInput.value, about: profileSignatureInput.value}
  api.changeBio(data)
    .then(res => {
      profileName.textContent = res.name
      profileSignature.textContent = res.about
      closePopup(profilePopup)
      evt.target.reset()
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      profileSubmitButton.textContent = 'Сохранить'
    })
}

enableValidation({
  formClass: '.popup__form', 
  inputClass: '.popup__form-input', 
  activeButtonClass: '.popup__form-submit',
  submitInactiveClass: 'popup__form-submit_type_inactive', 
  inputErrorClass: 'popup__form-input_type_error'})

export let userId

Promise.all([api.getProfile(), api.loadCards()])
  .then(([myData, cards]) => {
    avatarImg.src = myData.avatar
    profileName.textContent = myData.name
    profileSignature.textContent = myData.about
    userId = myData._id;
    cards.forEach((card) => cardsContainer.append(createCard(card, userId)))
  })
  .catch(err => {
    console.log(err)
  });
