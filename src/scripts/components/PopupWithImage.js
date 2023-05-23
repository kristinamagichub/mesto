import Popup from "./Popup.js";

//класс наследуется от Popup
//перезаписываeт родительский метод open
export default
  class PopupWithImage extends Popup {
  constructor(popupSelector) {
    //Элементы попапа находите в конструкторе
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__picture');
    this._imagePopupCaption = this._popup.querySelector('.popup__caption')
  }
  //открытиe попап для картинки
  //метод класса вставляeт в попап картинку с src изображения и подписью
  open = (imageData) => {
    console.log(imageData)
    this._popupImage.src = imageData.link;
    this._popupImage.alt = `Фотография ${imageData.title}`;
    this._imagePopupCaption.textContent = imageData.title;
    super.open()
  }
}

