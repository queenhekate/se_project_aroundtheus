import { initialCards } from "../utils/constants.js";

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._data = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._data.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
