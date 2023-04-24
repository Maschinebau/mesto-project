import { openPopup, closePopup } from "./utils.js"

// попап профиля
  const profilePopup = document.querySelector('.popup_type_profile');
  const profileSubmitButton = profilePopup.querySelector('.popup__form-submit');
  const profileName = document.querySelector('.profile__title');
  const profileSignature = document.querySelector('.profile__signature');
  const nameButton = document.querySelector('.profile__name-button');
  
  //Находим инпуты профиля
  
  const profileNameInput = profilePopup.querySelector('input[name = "name"]');
  const profileSignatureInput = profilePopup.querySelector('input[name = "profession"]');
  
  // Добавляем слушателя для кнопки открытия профиля
  
  nameButton.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent;
    profileSignatureInput.value = profileSignature.textContent;
    openPopup(profilePopup);
  });
  
  //  Добавление данных в профиль по сабмиту

  profilePopup.addEventListener('submit', evt => {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileSignature.textContent = profileSignatureInput.value;
    closePopup(profilePopup);
  });
  

// Попап карточек

const addCardButton = document.querySelector('.profile__img-button');
const cardPopup = document.querySelector('.popup_type_card');
const cardTitleInput = cardPopup.querySelector('input[name = "card-title"]');
const cardLinkInput = cardPopup.querySelector('input[name="link"]');

addCardButton.addEventListener('click', () => openPopup(cardPopup));

export {addCardButton, cardPopup, cardTitleInput, cardLinkInput}