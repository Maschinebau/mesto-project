// попап профиля
const profilePopup = document.querySelector('.popup_type_profile');
const profileSubmitButton = profilePopup.querySelector('.popup__form-submit');
const profileName = document.querySelector('.profile__title');
const profileSignature = document.querySelector('.profile__signature');
const nameButton = document.querySelector('.profile__name-button');

// инпуты профиля
  
const profileNameInput = profilePopup.querySelector('input[name = "name"]');
const profileSignatureInput = profilePopup.querySelector('input[name = "profession"]');

// попап аватара

const avatarImg = document.querySelector('.profile__img')
const avatarContainer = document.querySelector('.profile__img-container')
const avatarPopup = document.querySelector('.popup_type_avatar')
const avatarPopupSubmit = avatarPopup.querySelector('.popup__form-submit')
const avatarLinkInput = avatarPopup.querySelector('input[name = "avatar-link"]')

// попап карточек

const openCardPopupButton = document.querySelector('.profile__img-button');
const cardPopup = document.querySelector('.popup_type_card');
const cardTitleInput = cardPopup.querySelector('input[name = "card-title"]');
const cardLinkInput = cardPopup.querySelector('input[name="link"]');
const cardPopupSubmit = cardPopup.querySelector('.popup__form-submit')

// контейнер с карточками

const cardsContainer = document.querySelector('.elements__list')

export {
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
}