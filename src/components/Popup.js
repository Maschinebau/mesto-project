
export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  openPopup() {
    this._popup.classList.add('popup_opened')
    this._setEventListeners()
  }

  closePopup() {
    this._popup.classList.remove('popup_opened')
    this._removeEventListeners()
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup()
    } 
  }
  
  _closeOnClick(evt) {
    if(evt.target.contains('popup__close-button') || evt.target.contains('popup__overlay')) {
      this.closePopup()
    }
  }
  
  _setEventListeners(evt) {
    this.popup.addEventListener('click', this._closeOnClick)
    document.addEventListener('click', this._handleEscClose)
  }

  _removeEventListeners() {
    this.popup.removeEventListener('click', this._closeOnClick)
    document.removeEventListener('click', this._handleEscClose)
  }
}