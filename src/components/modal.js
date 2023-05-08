

// отрытие попапа с изображением

export function openImgPopup(dataName, dataLink) {
  const imgPopup = document.querySelector('.popup_type_image')
  const fullsizeImage = imgPopup.querySelector('.popup__fullsize-image')
  const imgFigcaption = imgPopup.querySelector('.popup__figcaption')
  fullsizeImage.src = dataLink
  fullsizeImage.alt = dataName
  imgFigcaption.textContent = dataName
  openPopup(imgPopup)
}

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

