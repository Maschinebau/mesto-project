import Popup from "./Popup"

export default class PopupWithForm extends Popup{
  constructor({titleInputSelector, linkInputSelector }) {
    this._titleInputSelector = titleInputSelector
    this._linkInputSelector = linkInputSelector
  }
}