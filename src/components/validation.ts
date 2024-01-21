type ValidationArgs = {
  formClass: string
  inputClass: string
  activeButtonClass: string
  submitInactiveClass: string
  inputErrorClass: string
}

type InputElement = HTMLInputElement & {
  name: string
  validationMessage: string
}

const showInputError = (
  formElement: HTMLFormElement,
  inputElement: InputElement,
  errorMessage: string,
  inputErrorClass: string
): void => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`) as HTMLElement
  inputElement.classList.add(inputErrorClass)
  errorElement.textContent = errorMessage
}

const hideInputError = (
  formElement: HTMLFormElement,
  inputElement: InputElement,
  inputErrorClass: string
): void => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`) as HTMLElement
  inputElement.classList.remove(inputErrorClass)
  errorElement.textContent = ""
}

const checkInputValidity = (
  formElement: HTMLFormElement,
  inputElement: InputElement,
  inputErrorClass: string
): void => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass)
  } else {
    hideInputError(formElement, inputElement, inputErrorClass)
  }
  
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы")
  } else {
    inputElement.setCustomValidity("")
  }
}

const hasInvalidInput = (inputList: InputElement[]): boolean => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (
  inputList: InputElement[],
  buttonElement: HTMLButtonElement,
  submitInactiveClass: string
): void => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(submitInactiveClass)
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(submitInactiveClass)
  }
}

const setEventListeners = (
  formElement: HTMLFormElement,
  inputClass: string,
  activeButtonClass: string,
  submitInactiveClass: string,
  inputErrorClass: string
): void => {
  const inputList = Array.from(formElement.querySelectorAll(inputClass)) as InputElement[]
  const buttonElement = formElement.querySelector(activeButtonClass) as HTMLButtonElement
  toggleButtonState(inputList, buttonElement, submitInactiveClass)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, inputErrorClass)
      toggleButtonState(inputList, buttonElement, submitInactiveClass)
    })
  })
}

const enableValidation = (args: ValidationArgs): void => {
  const { formClass, inputClass, activeButtonClass, submitInactiveClass, inputErrorClass } = args

  const formList = Array.from(document.querySelectorAll(formClass)) as HTMLFormElement[]
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault()
      const formSubmit = formElement.querySelector(".popup__form-submit") as HTMLButtonElement
      formSubmit.classList.add(submitInactiveClass)
      formSubmit.disabled = true
    })
    setEventListeners(formElement, inputClass, activeButtonClass, submitInactiveClass, inputErrorClass)
  })
}

export {
  showInputError,
  hideInputError,
  checkInputValidity,
  hasInvalidInput,
  toggleButtonState,
  setEventListeners,
  enableValidation
}
