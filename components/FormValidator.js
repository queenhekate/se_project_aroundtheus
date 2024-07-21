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
};

_showInputError(this._inputSelector, errorMessageEl) {
    const errorMessageEl = this._form.querySelector(`#${this._inputSelector.id}-error`);
    this._inputSelector.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = this._inputSelector.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  };
  
_hideInputError(this._form, this._inputSelector, { this._inputErrorClass, this._errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  };

_hasInvalidInput(inputList) {
    return !inputList.every((this._inputEl) => this._inputEl.validity.valid);
  };

_toggleButtonState(this._inputEls, this._submitBtn, this._inactiveButtonClass) {
    if (hasInvalidInput(inputEls)) {
      this._submitBtn.classList.add(this._inactiveButtonClass);
      this._submitBtn.disabled = true;
      return;
    }
    this._submitBtn.classList.remove(this._inactiveButtonClass);
    this._submitBtn.disabled = false;
  };

  _checkInputValidity(this._formEl, this._inputSelector, config) {
    if (!inputEl.validity.valid) {
        return showInputError(this._formEl, this._inputSelector, config);
      }
      hideInputError(this._formEl, this._inputSelector, config);
    };

_setEventListeners() {
this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
 this._submitBtn = this._form.querySelector(this._submitButtonSelector);
  _toggleButtonState( this._inputEls, this._submitBtn, config);
  this._inputEls.forEach((this._inputSelector) => {
    this._inputSelector.addEventListener("input", (e) => {
      _checkInputValidity(this._formEl, this._inputSelector, config);
      _toggleButtonState( this._inputEls, this._submitBtn, config);
    });
  });
};

enableValidation() {
    this._form.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      setEventListeners(this._inputSelector, config);
};

//resetFormValidation
reset(){

    document.getElementById("this._form").reset()
};

const editFormValidator = new FormValidator(config, editForm);
editFormValidator.enableValidation()

const addFormValidator = new FormValidator(config, addForm);
addFormValidator.enableValidation()