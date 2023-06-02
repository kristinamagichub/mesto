import Popup from "./Popup.js";

//класс форм, который наследуется от Popup
export default
  class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__button-save');
    this._defaultButtonText = this._submitButton.textContent;
  }

  //метод, который собирает данные всех полей формы
  getInputsValue() {
    //создается пустой объект в который потом попадут все инпуты
    this._values = {};
    // по всем инпутам и для каждого из них добавляется он же в массив
    this._inputList.forEach(input => {
      this._values[input.name] = input.value //имена импутов -это ключи, value импутов -это значения этих ключей
    })
    return this._values  //возвращает объект с данными формы
  }

  //метод для установки данных ввода со страницы
  setInputsValue(userData) {
    this._inputList.forEach(input => {
      input.value = userData[input.name];
    })
  }

  //nерезаписывает родительский метод setEventListeners
  //добавляeт обработчик клика иконке закрытия и обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`;
      //При вызове колбэка отправки формы в него передается результат вызова getInputValue
      this._submitFormCallback(this.getInputsValue());

    });
  }

  setDefaultText() {
    this._submitButton.textContent = this._defaultButtonText;
  }

  //nерезаписывает родительский метод close, т.к. при закрытии попапа форма должна сбрасываться
  close() {
    super.close();
    this._form.reset();
  }
}
