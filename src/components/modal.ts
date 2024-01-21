type Popup = HTMLDivElement | null

interface FullsizeImage extends HTMLImageElement {
  src: string
  alt: string
}

// отрытие попапа с изображением
export function openImgPopup(dataName: string, dataLink: string) {
  const imgPopup: Popup = document.querySelector(".popup_type_image")

  if (!imgPopup) {
    throw new Error("Image popup does not exist")
  }

  const fullsizeImage: FullsizeImage | null = imgPopup.querySelector(".popup__fullsize-image")
  const imgFigcaption: HTMLElement | null = imgPopup.querySelector(".popup__figcaption")

  if (fullsizeImage && imgFigcaption) {
    fullsizeImage.src = dataLink
    fullsizeImage.alt = dataName
    imgFigcaption.textContent = dataName
  }

  openPopup(imgPopup)
}

// закрытие и открытие попапов
export function closeByEscape(evt: KeyboardEvent) {
  if (evt.key === "Escape") {
    const openedPopup: Popup | null = document.querySelector(".popup_opened") as Popup
    if (openedPopup) {
      closePopup(openedPopup)
    }
  }
}

// добавляем закрытие попапов по клику на оверлей
;(function closeOnOverlay() {
  const overlays: NodeListOf<HTMLElement> = document.querySelectorAll(".popup__overlay")
  Array.from(overlays).forEach((item: HTMLElement) => {
    item.addEventListener("click", () => closePopup(item.closest(".popup") as Popup))
  })
})()

export const openPopup = (popup: Popup) => {
  popup?.classList.add("popup_opened")
  document.addEventListener("keydown", closeByEscape)
}

export const closePopup = (popup: Popup | Element) => {
  popup?.classList.remove("popup_opened")
  document.removeEventListener("keydown", closeByEscape)
}
