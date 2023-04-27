import {addCardButton, cardPopup, cardTitleInput, cardLinkInput} from './components/modal.js'
import {showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation} from './components/validate.js'
import {createCard, addCard, openPopup, closePopup} from './components/utils.js'
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

cardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(cardTitleInput.value, cardLinkInput.value);
  closePopup(cardPopup);
  evt.target.reset();
});

// добавляем дефолтные карточки

const altay = new URL('./images/altai-full.jpg', import.meta.url);
const kalmykia = new URL('./images/kal-mykia.jpg', import.meta.url);
const cumchatka = new URL('./images/cum-chatka.jpg', import.meta.url);
const karelia = new URL('./images/kareliya.jpg', import.meta.url);
const buykal = new URL('./images/buy-kal.jpg', import.meta.url);
const cherkash = new URL('./images/cherkes.jpg', import.meta.url);

const initialCards = [
{
  name: 'Алтай',
  link: altay
},
{
  name: 'Калмыкия',
  link: kalmykia
},
{
  name: 'Камчатка',
  link: cumchatka
},
{
  name: 'Карелия',
  link: karelia
},
{
  name: 'Байкал',
  link: buykal
},
{
  name: 'Карачаево-Черкессия',
  link: cherkash
},
];

initialCards.forEach( ({name, link}) => {
  addCard(name, link);
});

// Включаем валидацию инпутов

enableValidation();


