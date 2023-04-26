import {addCardButton, cardPopup, cardTitleInput, cardLinkInput} from './components/modal.js'
import {showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners} from './components/validate.js'
import {createCard, addCard, openPopup, closePopup} from './components/utils.js'

// добавляем закрытие попапов по escape и клику на оверлей

(function closeOnOverlay () {
  
  const popup = document.querySelectorAll('.popup')
  Array.from(popup).forEach(popupItem => {
    addEventListener('keydown', evt => {
      if (evt.key === 'Escape') { 
        closePopup(popupItem)
      }
    })
  })
  
    const overlay = document.querySelectorAll('.popup__overlay')
    Array.from(overlay).forEach(item => {
      item.addEventListener('click', () => item.parentNode.classList.remove('popup_opened'))
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

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      formElement.querySelector('.popup__form-submit').classListAdd('popup__form-submit_type_inactive')
    });
    setEventListeners(formElement)
  });
};
enableValidation();

