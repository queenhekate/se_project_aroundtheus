import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  handleDeleteConfirm(callback) {
    this._handleDeleteConfirm = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDeleteConfirm();
    });
  }
  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
