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

  // попап аватара

  const avatarImg = document.querySelector('.profile__img')
  const avatarContainer = document.querySelector('.profile__img-container')
  const avatarPopup = document.querySelector('.popup_type_avatar')
  const avatarPopupSubmit = avatarPopup.querySelector('.popup__form-submit')
  const avatarLinkInput = avatarPopup.querySelector('input[name = "avatar-link"]')

  avatarContainer.addEventListener('click', () => openPopup(avatarPopup))

 // Попап карточек

const openCardPopupButton = document.querySelector('.profile__img-button');
const cardPopup = document.querySelector('.popup_type_card');
const cardTitleInput = cardPopup.querySelector('input[name = "card-title"]');
const cardLinkInput = cardPopup.querySelector('input[name="link"]');
const cardPopupSubmit = cardPopup.querySelector('.popup__form-submit')


openCardPopupButton.addEventListener('click', () => openPopup(cardPopup));

export {
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
  cardPopupSubmit}