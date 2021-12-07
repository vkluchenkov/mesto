// ok
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
// ok
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const setEventListeners = (
  formElement,
  submitButtonSelector,
  inactiveButtonClass,
  inputSelector,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({ ...options }) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(
      formElement,
      options.submitButtonSelector,
      options.inactiveButtonClass,
      options.inputSelector,
      options.inputErrorClass,
      options.errorClass
    );
  });
};

// ok
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// ok
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

enableValidation({
  formSelector: ".popup__form", //ok
  inputSelector: ".popup__input", //ok
  submitButtonSelector: ".popup__submit-button", //ok
  inactiveButtonClass: "popup__submit-button_disabled", //ok
  inputErrorClass: "popup__input_type_error", //ok
  errorClass: "popup__error_type_visible", //ok
});
