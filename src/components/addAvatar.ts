import { uploadAvatar } from "./api"
import { avatarImg, avatarLinkInput, avatarPopup, avatarPopupSubmit } from "./constants"
import { closePopup } from "./modal"

const imagePlaceholder = './src/images/kusto-image.jpg'

// добавляем новый аватар
export const addAvatar = (evt: SubmitEvent) => {
  evt.preventDefault()
  if (!avatarPopupSubmit || !avatarLinkInput || !avatarImg) {
    console.error("Some elements are null. Aborting addAvatar function.")
    return
  }
  avatarPopupSubmit.textContent = "Сохранение..."
  const data = { avatar: avatarLinkInput.value }

  uploadAvatar(data)
    .then((res) => {
      if (!avatarImg) return

      avatarImg.src = res.avatar
      closePopup(avatarPopup)

      if (evt.target instanceof HTMLFormElement) {
        evt.target.reset()
      }
    })
    .catch((err) => {
      console.log(err)
      if (!avatarImg) return
      avatarImg.src = imagePlaceholder
    })
    .finally(() => {
      if (!avatarPopupSubmit) {
        console.error("Avatar popup submit button is null. Cannot update text content.")
        return
      }
      avatarPopupSubmit.textContent = "Сохранить"
    })
}