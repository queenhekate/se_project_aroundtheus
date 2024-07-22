export default class FormValidator {
  constructor(config, formEl) {
    this._form = formEl;

    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(errorMessageEl) {
    const errorMessageEl = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = input.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return !this._inputEls.every((input) => input.validity.valid);
  }

  _toggleButtonState() {
    if (hasInvalidInput(this._inputEls)) {
      this._submitBtn.classList.add(this._inactiveButtonClass);
      this._submitBtn.disabled = true;
      return;
    }
    this._submitBtn.classList.remove(this._inactiveButtonClass);
    this._submitBtn.disabled = false;
  }

  _checkInputValidity(inputEl, config) {
    if (!inputEl.validity.valid) {
      return showInputError(inputEl, this._inputSelector, config);
    }
    hideInputError(inputEl, this._inputSelector, config);
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitBtn = this._form.querySelector(this._submitButtonSelector);
    _toggleButtonState(this._inputEls, this._submitBtn, config);
    this._inputEls.forEach((input) => {
      input.addEventListener("input", (e) => {
        checkInputValidity(inputEl, config);
        toggleButtonState();
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

// const editFormValidator = new FormValidator(config, editForm);
// editFormValidator.enableValidation()

// const addFormValidator = new FormValidator(config, addForm);
// addFormValidator.enableValidation()
