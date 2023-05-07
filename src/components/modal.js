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

// функции закрытия и открытия попапов

export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

// добавляем закрытие попапов по клику на оверлей

(function closeOnOverlay () {
  const overlays = document.querySelectorAll('.popup__overlay')
  Array.from(overlays).forEach(item => {
    item.addEventListener('click', () => closePopup(item.closest('.popup')))
  })
})()

export const openPopup = popup => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape)
}

export const closePopup = popup => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape)
} 

