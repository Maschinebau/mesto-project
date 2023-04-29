
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, ) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы")
  } else {
    inputElement.setCustomValidity("")
  }
};

const hasInvalidInput = inputList => {
return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
}

const toggleButtonState = (inputList, buttonElement, submitInactiveClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(submitInactiveClass); 
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(submitInactiveClass);
  }
}

const setEventListeners = (formElement, inputClass, activeButtonClass, submitInactiveClass, inputErrorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputClass));
  const buttonElement = formElement.querySelector(activeButtonClass)
  toggleButtonState(inputList, buttonElement, submitInactiveClass)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, submitInactiveClass);
      toggleButtonState(inputList, buttonElement, submitInactiveClass)
    });
  });
};

const enableValidation = args => {
  const {formClass, inputClass, activeButtonClass, submitInactiveClass, inputErrorClass} = args

  const formList = Array.from(document.querySelectorAll(formClass));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      const formSubmit = formElement.querySelector('.popup__form-submit')
      formSubmit.classList.add(submitInactiveClass)
      formSubmit.disabled = true
    });
    setEventListeners(formElement, inputClass, activeButtonClass, submitInactiveClass, inputErrorClass)
  });
};

export {showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation}