export default class FormValidator {
  constructor(settings, formEl) {
    this._form = formEl;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._buttonElement = formEl.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(formEl.querySelectorAll(this._inputSelector));
  }

  disableButton() {
    this._buttonElement.setAttribute("disabled", "disabled");
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  _showInputError(input) {
    const errorMessageEl = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = input.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return !this._inputList.every((input) => input.validity.valid);
  }

  resetValidation() {
    this.toggleButtonState();
    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      {
        this.disableButton();
      }
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl, this._inputSelector);
    }
    this._hideInputError(inputEl, this._inputSelector);
  }

  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  //resetFormValidation
  reset() {
    this._form.reset();
  }
}
