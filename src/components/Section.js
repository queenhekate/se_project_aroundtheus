export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
