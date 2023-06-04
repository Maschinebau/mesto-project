export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderer = renderer
    this._container = container
    this._items = items
    this._container = document.querySelector(containerSelector)
  }

  addItem(item) {
    this._container.append(item)
  }

  renderItems(items) {
    this._items.forEach(this._renderer)
  }
}