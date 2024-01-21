type Popup = HTMLDivElement | null

// попапы
const profilePopup: Popup = document.querySelector(".popup_type_profile")
const avatarPopup: Popup = document.querySelector(".popup_type_avatar")
const cardPopup: Popup = document.querySelector(".popup_type_card")

// профиль
const profileName: HTMLElement | null = document.querySelector(".profile__title")
const profileSignature: HTMLElement | null = document.querySelector(".profile__signature")
const nameButton: HTMLElement | null = document.querySelector(".profile__name-button")

if (!profilePopup || !avatarPopup || !cardPopup) {
 throw new Error('Profile popup does not exist')
}

// контролы попапа профиля
const profileNameInput: HTMLInputElement | null = profilePopup.querySelector<HTMLInputElement>('input[name="name"]')
const profileSignatureInput: HTMLInputElement | null = profilePopup.querySelector('input[name="profession"]')
const profileSubmitButton: HTMLButtonElement | null = profilePopup.querySelector(".popup__form-submit")

// попап аватара
const avatarImg: HTMLImageElement | null = document.querySelector(".profile__img")
const avatarContainer: HTMLElement | null = document.querySelector(".profile__img-container")

// контролы попапа аватара
const avatarPopupSubmit: HTMLButtonElement | null = avatarPopup.querySelector(".popup__form-submit")
const avatarLinkInput: HTMLInputElement | null = avatarPopup.querySelector('input[name="avatar-link"]')

// попап карточек
const openCardPopupButton: HTMLElement | null = document.querySelector(".profile__img-button")

// контролы попапа с картинками
const cardTitleInput: HTMLInputElement | null = cardPopup.querySelector('input[name="card-title"]')
const cardLinkInput: HTMLInputElement | null = cardPopup.querySelector('input[name="link"]')
const cardPopupSubmit: HTMLButtonElement | null = cardPopup.querySelector(".popup__form-submit")

// контейнер с карточками
const cardsContainer: HTMLElement | null = document.querySelector(".elements__list")


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
