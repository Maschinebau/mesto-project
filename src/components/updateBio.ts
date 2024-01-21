import { changeBio } from "./api"
import { profileName, profileNameInput, profilePopup, profileSignature, profileSignatureInput, profileSubmitButton } from "./constants"
import { closePopup } from "./modal"

export const updateBio = (evt: SubmitEvent) => {
  evt.preventDefault()
  if (!profileSubmitButton || !profileNameInput || !profileSignatureInput) {
    console.error("Aborting updateBio function.")
    return
  }

  profileSubmitButton.textContent = "Сохранение..."
  const data = { name: profileNameInput.value, about: profileSignatureInput.value }
  changeBio(data)
    .then((res) => {
      if(!profileName || !profileSignature) {
        console.error("Aborting changeBio function.")
        return
      }

      profileName.textContent = res.name
      profileSignature.textContent = res.about
      closePopup(profilePopup)

      if (evt.target instanceof HTMLFormElement) {
        evt.target.reset()
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      if (!profileSubmitButton) {
        console.error("Profile popup submit button is null. Cannot update text content.")
        return
      }
      profileSubmitButton.textContent = "Сохранить"
    })
}