//массив начальных значений картинок 'из коробки'
const initialCards = [
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];


//переменные кнопок редактирования профиля и добавления картинки
const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');


//selectors
const selectorTemplate = '#theCard';
const popupProfileSelector = '.popup_type_profile';
const popupAddCardSelector = '.popup_type_cards';
const popupImageSelector = '.popup_type_image';
const groupListsElementSelector = '.group';

const popupAvatarSelector = ".popup_type_editAvatar"
const popupDeleteSelector = ".popup_type_delete"


//переменные для класса UserInfo
const configInfo = {
  nameProfileSelector: '.profile__name',
  jobProfileSelector: '.profile__job',
  profileAvatar: '.profile__image'
}


//пустой объект для валидации форм
const formsValidator = {};

//для валидации
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disable',
  inputErrorClass: 'popup__input_invalid',
  errorSelector: '.popup__error_type_',
  errorClass: 'popup__error_active',
};


export {
  initialCards,
  popupEditOpenButtonElement,
  popupAddOpenButtonElement,
  selectorTemplate,
  popupProfileSelector,
  popupAddCardSelector,
  popupImageSelector,
  groupListsElementSelector,
  popupAvatarSelector,
  popupDeleteSelector,
  configInfo,
  formsValidator,
  validationConfig
};
