// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEL, inputEl, { inputErrorClass, errorClass }) {
const errorMessageEl = formEl.querySelector(`#${inputEL.id}-error`);
inputEl.classList.add(inputErrorClass);
errorMessageEl.textContent = inputEl.validationMessage;
errorMessageEl.classList.add(errorClass);
};

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEL.id}-error`);
    inputEl.classList.remove(inputErrorClass);
errorMessageEl.textContent = "";
errorMessageEl.classList.remove(errorClass);
};

function checkInputValidity(formEL, inputEl, options) {
if (!inputEl.validity.valid) {
     return showInputError(formEl, inputEL, options);
}
        hideInputError(formEl, inputEL, options);
};  
    
    function hasInvalidInput(inputList) {
return !inputList.every((inputEl) => inputEl.validity.valid);
    }

    function checkform(inputEls, submitBtn, { inactiveButtonClass }) {
        if (hasInvalidInput(inputEls)) {
    formEl.querySelector('.modal__button').disabled = !cansubmit;
    return;
        }
    formEl.querySelector('.modal__button').enabled = cansubmit;
    };

    function toggleButtonState(inputEls, submitBtn, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    submitBtn.classList.add(inactiveButtonClass);
    submitBtn.disabled = true;
    return;
  } 
        submitBtn.classList.remove(inactiveButtonClass);
        submitBtn.disabled = false;
};

function setEventListeners(formEl, options) {
    const {inputSelector} = options;
    const inputEls = [...formEl.querySelectorAll(options.formSelector)];
    const submitBtn = formEl.querySelector('.modal__button'); 

    inputEls.forEach(inputEl => {
        inputEl.addEventListener('input', (e) => {
            checkInputValidity(formEl, inputEl, options);
            toggleButtonState(inputEls, submitBtn, options);
        });
    });
};

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit" (e) => {
        e.preventDefault();
    });
setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
