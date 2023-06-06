import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super.selector
    this._fullsizeImage = imgPopup.querySelector('.popup__fullsize-image')
    this._imgFigcaption = imgPopup.querySelector('.popup__figcaption')
  }

  openPopup(data) {
    super.openPopup()
    this._fullsizeImage.src = data.link
    this._fullsizeImage.alt = data.name
    this._imgFigcaption.textContent = data.name
  }
}