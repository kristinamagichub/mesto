//для валидации
const validationConfig = {
  allforms: document.forms,
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disable',
  inputErrorClass: 'popup__input_invalid',
  errorSelector: '.popup__error_type_',
  errorClass: 'popup__error_active',
};

enableValidation(validationConfig);

function enableValidation(config) {
  const forms = Array.from(config.allforms);
  forms.forEach((form) => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const button = form.querySelector(config.submitButtonSelector);
    hangEventListener(inputList, button, config.errorSelector, config.inactiveButtonClass, config.inputErrorClass, config.errorClass);
  })
};

function hangEventListener(inputList, button, errorSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, errorSelector, inputErrorClass, errorClass);
      toggleButtonState(inputList, button, inactiveButtonClass);
    })
  })
};

//ф скрывающая или показывающая ошибку в зависимости от валидности ввода данных
function checkInputValidity(input, errorSelector, inputErrorClass, errorClass) {
  const errorTextElement = document.querySelector(`${errorSelector}${input.name}`)
  input.validity.valid ? hideInputError(input, errorTextElement, inputErrorClass, errorClass) : showInputError(input, errorTextElement, inputErrorClass, errorClass);
};

//ф скрывающая ошибку
function hideInputError(input, errorTextElement, inputErrorClass, errorClass) {
  input.classList.remove(inputErrorClass);
  errorTextElement.textContent = '';
  errorTextElement.classList.remove(errorClass);
};

//ф показывающая ошибку
function showInputError(input, errorTextElement, inputErrorClass, errorClass) {
  input.classList.add(inputErrorClass);
  errorTextElement.textContent = input.validationMessage;
  errorTextElement.classList.add(errorClass);
};

//ф проверяющая валидность ввода данных и переключающая цвет кнопки
function toggleButtonState(inputList, button, inactiveButtonClass) {
  hasValidInput(inputList) ? enableButton(button, inactiveButtonClass) : disableButton(button, inactiveButtonClass);
};

//ф возвращающая валидные вводы данных
function hasValidInput(inputList) {
  return Array.from(inputList).every((input) => input.validity.valid)
};

//ф делающая кнопку не кликабельной
function disableButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
};

//ф делающая кнопку кликабельной
function enableButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
};

//ф убирающая ошибку при открытии формы
function resetErrorForOpenedForm(form, validationConfig) {
  const button = form.querySelector(validationConfig.submitButtonSelector)
  form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
    const errorTextElement = document.querySelector(`${validationConfig.errorSelector}${input.name}`)
    if (!input.validity.valid) {
      hideInputError(input, errorTextElement, validationConfig.inputErrorClass, validationConfig.errorClass)
    }
  })
  disableButton(button, validationConfig.inactiveButtonClass)
};
