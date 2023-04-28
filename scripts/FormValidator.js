export default
  class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorSelector = config.errorSelector;
    this._errorClass = config.errorClass;
    this._form = form;
    this._button = form.querySelector(this._submitButtonSelector);
    this._inputList = form.querySelectorAll(this._inputSelector);
  }

  //ф показывающая ошибку
  _showInputError(errorTextElement, input) {
    input.classList.add(this._inputErrorClass);
    errorTextElement.textContent = input.validationMessage;
    //errorTextElement.classList.add(errorClass);
  }
  //ф скрывающая ошибку
  _hideInputError(errorTextElement, input) {
    input.classList.remove(this._inputErrorClass);
    errorTextElement.textContent = '';
    //errorTextElement.classList.remove(errorClass);
  }

  _checkInputValidity(input) {
    const errorTextElement = this._form.querySelector(`${this._errorSelector}${input.name}`);
    input.validity.valid ? this._hideInputError(errorTextElement, input) : this._showInputError(errorTextElement, input);
  }

  //ф делающая кнопку не кликабельной
  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  };

  //ф делающая кнопку кликабельной
  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disabled = false;
  };


  //ф возвращающая валидные вводы данных
  _hasValidInput() {
    return Array.from(this._inputList).every((input) => input.validity.valid)
  };

  //ф проверяющая валидность ввода данных и переключающая цвет кнопки
  _toggleButtonState() {
    this._hasValidInput() ? this._enableButton() : this._disableButton(this._button);
  };
  _setEventListener() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState()
      })
    })
  }

  enableValidation() {
    this._setEventListener();
  }

  //ф убирающая ошибку при открытии формы
  resetErrorForOpenedForm() {
    this._inputList.forEach(input => {
      const errorTextElement = this._form.querySelector(`${this._errorSelector}${input.name}`)
      if (!input.validity.valid) {
        this._hideInputError(errorTextElement, input);
      }
    })
    this._disableButton();
  }
}
