import {addCardButton, cardPopup, cardTitleInput, cardLinkInput} from './components/modal.js'
import {showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation} from './components/validate.js'
import {createCard, addCard, openPopup, closePopup} from './components/utils.js'

// добавляем закрытие попапов по escape и клику на оверлей

(function closeOnOverlay () {
  
  // const popups = document.querySelectorAll('.popup')
  // Array.from(popups).forEach(popupItem => {
  //   addEventListener('keydown', evt => {
  //     if (evt.key === 'Escape') { 
  //       closePopup(popupItem)
  //     }
  //   })
  // })
  


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

// Включаем валидацию инпутов

enableValidation();

