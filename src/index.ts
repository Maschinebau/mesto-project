import "./scss/index"
import { openPopup, closePopup } from "./components/modal"
import { enableValidation } from "./components/validation"
import {
  profilePopup,
  profileName,
  profileSignature,
  nameButton,
  profileNameInput,
  profileSignatureInput,
  avatarImg,
  avatarContainer,
  avatarPopup,
  openCardPopupButton,
  cardPopup,
  cardsContainer
} from "./components/constants"
import { getProfile, loadCards } from "./components/api"
import { createCard } from "./components/card"
import { addAvatar } from "./components/addAvatar"
import { addCard } from "./components/addCard"
import { updateBio } from "./components/updateBio"

if (!nameButton || !avatarPopup || !cardPopup || !profilePopup || !openCardPopupButton || !avatarContainer) {
  throw new Error("One of the popups does not exist")
}

// открытие попапа профиля
nameButton.addEventListener("click", () => {
  if (!profilePopup || !profileNameInput || !profileSignatureInput) {
    console.error("Aborting addEventListener on nameButton")
    return
  }
  profileNameInput.value = profileName?.textContent || ""
  profileSignatureInput.value = profileSignature?.textContent || ""
  openPopup(profilePopup)
})

// открытие попапа аватара
avatarContainer.addEventListener("click", () => {
  if (!avatarPopup) return
  openPopup(avatarPopup)
})

// открытие попапа карточек
openCardPopupButton.addEventListener("click", () => {
  if (!cardPopup) return
  openPopup(cardPopup)
})

//добавляем слушатель на все закрывающие кнопки
const closeButtons = document.querySelectorAll(".popup__close-button")
closeButtons.forEach((button) => {
  const popup = button.closest(".popup")
  if (!popup) return
  button.addEventListener("click", () => closePopup(popup))
})

// добавляем карточки по submit
cardPopup.addEventListener("submit", addCard)

// добавляем аватар по сабмит
avatarPopup.addEventListener("submit", addAvatar)

// меняем профиль по сабмит
profilePopup.addEventListener("submit", updateBio)

// обновляем данные профиля

enableValidation({
  formClass: ".popup__form",
  inputClass: ".popup__form-input",
  activeButtonClass: ".popup__form-submit",
  submitInactiveClass: "popup__form-submit_type_inactive",
  inputErrorClass: "popup__form-input_type_error"
})

export let userId: string

Promise.all([getProfile(), loadCards()])
  .then(([myData, cards]) => {
    if (!avatarImg || !profileName || !profileSignature) {
      console.error("Aborting Promise.all function")
      return
    }

    avatarImg.src = myData.avatar
    profileName.textContent = myData.name
    profileSignature.textContent = myData.about
    userId = myData._id
    cards.forEach((card) => cardsContainer?.append(createCard(card, userId)))
  })
  .catch((err) => {
    console.log(err)
  })
