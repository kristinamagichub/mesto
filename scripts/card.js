export default
  class Card {
  constructor(object, selectorTemplate, openImagePopup) {
    this._object = object;
    this._link = object.link;
    this._name = object.name;
    this._selectorTemplate = selectorTemplate;
    this._openImagePopup = openImagePopup;
    this._cloneElement = document.querySelector(this._selectorTemplate).content.querySelector('.group__item').cloneNode(true);
    this._imageElement = this._cloneElement.querySelector('.group__mask');
    this._likeElement = this._cloneElement.querySelector('.group__like');
    this._trashElement = this._cloneElement.querySelector('.group__trash');
    this._picTitle = this._cloneElement.querySelector('.group__picture-name');
  }

  _pushedLike = () => {
    this._likeElement.classList.toggle('group__like_active');
  }
  _pushedDelete = () => {
    this._cloneElement.remove();
    this._cloneElement = null;
  }
  _pushedImage = () => {
    this._openImagePopup(this._object)
  }

  _setEventListener() {
    this._likeElement.addEventListener('click', this._pushedLike);
    this._trashElement.addEventListener('click', this._pushedDelete);
    this._imageElement.addEventListener('click', this._pushedImage);
  }
  createCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._picTitle.textContent = this._name;
    this._setEventListener();
    return this._cloneElement;
  }
}


