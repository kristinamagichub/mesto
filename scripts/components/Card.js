export default
  class Card {
  constructor(imageData, selectorTemplate, openImagePopup) {
    this._imageData = imageData;
    this._link = imageData.link;
    this._name = imageData.title;
    this._selectorTemplate = selectorTemplate;
    this._openImagePopup = openImagePopup;
    this._cloneElement = document.querySelector(this._selectorTemplate).content.querySelector('.group__item').cloneNode(true);
    this._imageElement = this._cloneElement.querySelector('.group__mask');
    this._likeElement = this._cloneElement.querySelector('.group__like');
    this._trashElement = this._cloneElement.querySelector('.group__trash');
    this._picTitle = this._cloneElement.querySelector('.group__picture-name');
  }

  _toggleLike = () => {
    this._likeElement.classList.toggle('group__like_active');
  }
  _handleTrashSignClick = () => {
    this._cloneElement.remove();
    this._cloneElement = null;
  }
  //ф открываeт попап с картинкой при клике на нее
  _handleImageClick = () => {
    this._openImagePopup(this._imageData)
  }

  _setEventListener() {
    this._likeElement.addEventListener('click', this._toggleLike);
    this._trashElement.addEventListener('click', this._handleTrashSignClick);
    this._imageElement.addEventListener('click', this._handleImageClick);
  }

  createCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = `Фотография ${this._name}`;
    this._picTitle.textContent = this._name;
    this._setEventListener();
    return this._cloneElement;
  }
}


