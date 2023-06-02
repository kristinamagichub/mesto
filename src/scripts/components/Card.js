//класс создаёт карточку с текстом и ссылкой на изображение
export default
  class Card {
  constructor(imageData, selectorTemplate, openImagePopup, openDeletePopup, changeLike) {
    this._link = imageData.link;
    this._name = imageData.name;

    this._myId = imageData.myid;
    this._ownerId = imageData.owner._id;
    this._cardId = imageData._id;

    this._likes = imageData.likes;
    this._likesLength = imageData.likes.length;

    this._selectorTemplate = selectorTemplate;
    this._openImagePopup = openImagePopup;
    this._openDeletePopup = openDeletePopup;
    this._changeLike = changeLike;

    this._cloneElement = document.querySelector(this._selectorTemplate).content.querySelector('.group__item').cloneNode(true);
    this._imageElement = this._cloneElement.querySelector('.group__mask');
    this._likeElement = this._cloneElement.querySelector('.group__like');
    this._trashElement = this._cloneElement.querySelector('.group__trash');
    this._picTitle = this._cloneElement.querySelector('.group__picture-name');
    this._counter = this._cloneElement.querySelector('.group__likes-counter');
  }

  _toggleLike = () => {
    this._changeLike(this._likeElement, this._cardId);
  }

  _handleTrashSignClick = () => {
    this._openDeletePopup({ card: this, cardId: this._cardId }); //this - передача экземпляра
  }

  //ф открываeт попап с картинкой при клике на нее
  _handleImageClick = () => {
    this._openImagePopup({ title: this._name, link: this._link });
  }


  _setEventListener() {
    this._likeElement.addEventListener('click', this._toggleLike);
    this._trashElement.addEventListener('click', this._handleTrashSignClick);
    this._imageElement.addEventListener('click', this._handleImageClick);
  }


  // служебный приватный метод отображающий только 'cвои мусорки' и возможность удаления только своих картинок
  _toggleVisibilityForTrashSign() {
    this._myId === this._ownerId ? this._trashElement.style.display = 'block' : this._trashElement.style.display = 'none';
  }


  //метод проверяющий массив поставленных лайков
  _handleLikeClickStatus() {
    this._likes.forEach(item => {
      if (item._id === this._myId) {
        this._likeElement.classList.add('group__like_active')
        return
      }
    })
    this._counter.textContent = this._likesLength;
  }


  //метод считающий и отображающий суммарное количество лайков
  //метод получает массив лайков чтобы менять счетчик
  toggleLikesNumberCounter(likes) {
    this._likeElement.classList.toggle('group__like_active');
    this._counter.textContent = likes.length;
  }


  //метод который отвечает за удаление карточки и зануление
  removeCard() {
    this._cloneElement.remove();
    this._cloneElement = null;
  }


  createCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = `Фотография ${this._name}`;
    this._picTitle.textContent = this._name;
    this._toggleVisibilityForTrashSign();
    this._handleLikeClickStatus();
    this._setEventListener();
    return this._cloneElement;
  }
}


