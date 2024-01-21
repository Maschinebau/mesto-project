import { userId } from ".."
import { uploadCard } from "./api"
import { createCard } from "./card"
import { cardLinkInput, cardPopup, cardPopupSubmit, cardTitleInput, cardsContainer } from "./constants"
import { closePopup } from "./modal"


// добавляем карточку
export const addCard = (evt: SubmitEvent) => {
  evt.preventDefault()
  if (!cardPopupSubmit || !cardTitleInput || !cardLinkInput || !cardsContainer) {
    console.error("Some elements are null. Aborting addCard function.")
    return
  }
  cardPopupSubmit.textContent = "Сохранение..."

  const data = { name: cardTitleInput.value, link: cardLinkInput.value }
  uploadCard(data)
    .then((res) => {
      if (!cardsContainer) {
        console.error("Cards container is null. Cannot prepend card.")
        return
      }
      cardsContainer.prepend(createCard(res, userId))
      closePopup(cardPopup)

      if (evt.target instanceof HTMLFormElement) {
        evt.target.reset()
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      if (!cardPopupSubmit) {
        console.error("Card popup submit button is null. Cannot update text content.")
        return
      }

      cardPopupSubmit.textContent = "Сохранить"
    })
}