import initialCards from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupElements = document.querySelectorAll('.popup');
const popupCloseButtonElements = document.querySelectorAll('.popup__close');
const profilePopupElement = document.querySelector('.popup_type_profile');
const cardsPopupElement = document.querySelector('.popup_type_cards');
const imagePopupElement = document.querySelector('.popup_type_image');

const selectorTemplate = '#theCard';
const profileForm = document.forms['Profile-edit-form'];
const cardForm = document.forms['Card-add-form'];

const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const titleInput = cardForm.querySelector('.popup__input_type_title');
const linkInput = cardForm.querySelector('.popup__input_type_link');

const imagePopupContainerElement = imagePopupElement.querySelector('.popup__figure');
const popupImageElement = imagePopupElement.querySelector('.popup__picture');
const imagePopupCaption = imagePopupElement.querySelector('.popup__caption');

const groupListsElement = document.querySelector('.group');

//для валидации
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disable',
  inputErrorClass: 'popup__input_invalid',
  errorSelector: '.popup__error_type_',
  errorClass: 'popup__error_active',
};


//ф открытия popup
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
};

//ф закрытия popup
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
};


//закрытие popup при нажатии на х
popupCloseButtonElements.forEach((element) => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => {
    closePopup(popup);
  })
});

////закрытие popup при нажатии на escape
const closePopupByEscape = function (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

//закрытие popup при нажатии на overlay фон
const closePopupByClickOnOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(event.currentTarget);
};
popupElements.forEach(element => element.addEventListener('click', closePopupByClickOnOverlay));


//ф открытия попап для картинки
function openImagePopup(object) {
  popupImageElement.alt = object.name;
  popupImageElement.src = object.link;
  imagePopupCaption.textContent = object.name;
  openPopup(imagePopupElement);
}

//добавление разметки для картинок, имени, лайки, удаление
function createNewCard(item) {
  const card = new Card(item, selectorTemplate, openImagePopup);
  const cardElement = card.createCard();
  return cardElement;
}

//ф добавления карточки в нужный контейнер
function addCard(container, card) {
  container.prepend(card);
}

//загрузка картинок из массива initialCards при открытии страницы
initialCards.forEach((item) => {
  addCard(groupListsElement, createNewCard(item))
});


//создание для каждой проверяемой формы экземпляр класса FormValidator и запуск валидации
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, cardForm);
cardFormValidator.enableValidation();


//открытие popup редактирования профиля
popupEditOpenButtonElement.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(profilePopupElement)
});

//открытие popup для добавления и редактирования картинок
popupAddOpenButtonElement.addEventListener('click', () => {
  cardForm.reset();
  cardFormValidator.resetValidation();
  openPopup(cardsPopupElement);
});


//обработка формы submit для редактирования профиля
const handleProfileFormSubmit = function (evt) {
  evt.preventDefault(); //prevent отправки формы на сервер
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopupElement);
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

//обработка формы submit для добавление новой картинки вручную
cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objectNameLink = { name: titleInput.value, link: linkInput.value };
  addCard(groupListsElement, createNewCard(objectNameLink));
  closePopup(cardsPopupElement);
  evt.target.reset(); //очистка строки ввода
});
