import {
  openCardPopupButton,
  cardPopup,
  profileName,
  profileSignature,
  profileSubmitButton,
  profileNameInput,
  profileSignatureInput,
  profilePopup,
  avatarImg,
  avatarContainer,
  avatarPopup,
  avatarPopupSubmit,
  avatarLinkInput,
  cardTitleInput,
  cardLinkInput,
  cardPopupSubmit} from './components/modal.js'
import {showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation} from './components/validate.js'
import {createCard, addCard, openPopup, closePopup, addAvatar, updateBio, cardsContainer} from './components/utils.js'
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
import './pages/index.css'

// добавляем закрытие попапов по клику на оверлей

(function closeOnOverlay () {
    const overlays = document.querySelectorAll('.popup__overlay')
    Array.from(overlays).forEach(item => {
      item.addEventListener('click', () => closePopup(item.closest('.popup')))
    })
  })()

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

// массив дефолтных карточек

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
