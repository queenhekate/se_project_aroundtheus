import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });

    this._previewImage = document.querySelector(".modal__image");
    this._previewDescription = document.querySelector(".modal__description");
  }

  openModal(link, name) {
    this._previewImage.setAttribute("src", link);
    this._previewImage.setAttribute("alt", name);
    this._previewDescription.textContent = name;
    super.openModal();
  }
}
