import { cardsListEl } from "../utils/constants";

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

  addItem(cardsListEl) {
    this._container.prepend(cardsListEl);
  }
}
