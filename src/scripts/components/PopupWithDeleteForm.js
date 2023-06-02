import Popup from "./Popup.js";

export default class PopupWithDeleteForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button-save');
    this._defaultButtonText = this._submitButton.textContent;
  }


  //nерезаписывает родительский метод setEventListeners
  //добавляeт обработчик клика иконке закрытия и обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`;
      //При вызове колбэка отправки формы в него передается результат вызова getInputValue
      this._submitFormCallback({ card: this._element, cardId: this._cardId });
    });
  }


  setDefaultText() {
    this._submitButton.textContent = this._defaultButtonText;
  }


  open = ({ card, cardId }) => {
    super.open();
    this._element = card;
    this._cardId = cardId;
  }
}
