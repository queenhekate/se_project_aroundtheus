import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__form-input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}

// Form Event Listeners

// cardAddNewBtn.addEventListener("click", () => open(cardAddModal));

// profileForm.addEventListener("submit", handleProfileEditSubmit);
// const editFormValidator = new FormValidator(settings, profileForm);
// editFormValidator.enableValidation();

// cardAddForm.addEventListener("submit", handleAddCardSubmit);
// const addFormValidator = new FormValidator(settings, cardAddForm);
// addFormValidator.enableValidation();
// initialCards.forEach((cardData) => {
//   renderCard(cardData);
// });

// // Handle Form Submit

// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = profileInputTitle.value;
//   profileDescription.textContent = profileInputDescription.value;
//   profileEditModal.close();
// }

// function handleAddCardSubmit(e) {
//   e.preventDefault();
//   const newCard = {
//     name: addCardTitleInput.value,
//     link: addCardImageInput.value,
//   };
//   renderCard(newCard);
//   e.target.reset();
//   addFormValidator.disableButton();
//   close(cardAddModal);
// }
