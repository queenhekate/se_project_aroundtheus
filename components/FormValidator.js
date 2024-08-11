export default class FormValidator {
  constructor(config, formEl) {
    this._form = formEl;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._buttonElement = formEl.querySelector(this._submitButtonSelector);
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
    return !this._inputEls.every((input) => input.validity.valid);
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputEls.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputEls)) {
      function disableButton() {
        this._submitBtn.classList.add(this._inactiveButtonClass);
        this._submitBtn.disabled = true;
      }
    }
    this._submitBtn.classList.remove(this._inactiveButtonClass);
    this._submitBtn.disabled = false;
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl, this._inputSelector);
    }
    this._hideInputError(inputEl, this._inputSelector);
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitBtn = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
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
