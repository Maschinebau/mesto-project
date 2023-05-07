import {
  closeByEscape,
  openPopup,
  closePopup
} from './components/modal.js'
import {enableValidation} from './components/validate.js'
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
} from './components/utils.js'
import {
  checkResponse, 
  changeBio, 
  uploadCard, 
  uploadAvatar, 
  getProfile, 
  loadCards, 
  deleteLike, 
  addLike, 
  deleteCard} from './components/api.js'
import {createCard} from './components/card.js'
import './pages/index.css'

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

// const initialCards = [
// {
//   name: 'Алтай',
//   link: new URL('./images/altai-full.jpg', import.meta.url)
// },
// {
//   name: 'Калмыкия',
//   link: new URL('./images/kal-mykia.jpg', import.meta.url)
// },
// {
//   name: 'Камчатка',
//   link: new URL('./images/cum-chatka.jpg', import.meta.url)
// },
// {
//   name: 'Карелия',
//   link: new URL('./images/kareliya.jpg', import.meta.url)
// },
// {
//   name: 'Байкал',
//   link: new URL('./images/buy-kal.jpg', import.meta.url)
// },
// {
//   name: 'Карачаево-Черкессия',
//   link: new URL('./images/cherkes.jpg', import.meta.url)
// },
// ];

// // добавляем дефолтные карточки на страницу

// initialCards.forEach( ({name, link}) => {
//   addCard(name, link);
// });

// Включаем валидацию инпутов

// функция добавления карточки

function addCard(evt) {
  evt.preventDefault()
  cardPopupSubmit.textContent = 'Сохранение...'
  const data = {name: cardTitleInput.value, link: cardLinkInput.value}
  uploadCard(data)
    .then(res => {
      cardsContainer.prepend(createCard(res))
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
  uploadAvatar(data)
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
  changeBio(data)
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

Promise.all([getProfile(), loadCards()])
  .then(([myData, cards]) => {
    avatarImg.src = myData.avatar
    profileName.textContent = myData.name
    profileSignature.textContent = myData.about
    userId = myData._id;
    cards.forEach((card) => cardsContainer.append(createCard(card)))
  })
  .catch(err => {
    console.log(err)
  });
