//класс отвечает за открытие и закрытие попапа
export default
  class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close');
  }

  //закрытие popup при нажатии на escape
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  //закрытие popup при нажатии на х
  _handleCloseButton = () => {
    this.close();
  }
  //закрытие popup при нажатии на overlay фон
  _closePopupByClickOnOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this._handleCloseButton);
    this._popup.addEventListener('click', this._closePopupByClickOnOverlay);
  }

  //метод отвечает за открытие popup, /добавляет сл для закрытия по esc
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  //метод отвечает за закрытие popup, /по esc
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);  //обработчик удаляется при закрытии попапа
  }
}
