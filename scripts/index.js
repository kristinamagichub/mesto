const popupElements = document.querySelectorAll('.popup');
const popupCloseButtonElements = document.querySelectorAll('.popup__close');
const profilePopupElement = document.querySelector('.profile-popup');
const cardsPopupElement = document.querySelector('.cards-popup');
const imagePopupElement = document.querySelector('.image-popup');
const cardsElement = document.querySelector('#theCard').content;

const formElement = profilePopupElement.querySelector('.popup__container');
const formElementAddCard = cardsPopupElement.querySelector('.popup__container');
const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const titleInput = formElementAddCard.querySelector('.form__input_type_title');
const linkInput = formElementAddCard.querySelector('.form__input_type_link');

const imagePopupContainerElement = imagePopupElement.querySelector('.image-popup__figure');
const popupImageElement = imagePopupElement.querySelector('.image-popup__picture');
const imagePopupCaption = imagePopupElement.querySelector('.image-popup__caption');

const groupListsElement = document.querySelector('.group__lists');

//массив начальных значений картинок 'из коробки'
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const openPopup = function (popup) {
  popup.classList.add('popup_opened');
};

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
};

//закрытие popup при нажатии на х
popupCloseButtonElements.forEach((element) => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => {
    closePopup(popup);
  })
});

//открытие popup редактирования профиля
popupEditOpenButtonElement.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(profilePopupElement)
});
//открытие popup для добавления картинок
popupAddOpenButtonElement.addEventListener('click', () => {
  openPopup(cardsPopupElement);
});

//prevent отправки формы на сервер для редактирования профиля
const handleFormSubmit = function (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopupElement);
}
formElement.addEventListener('submit', handleFormSubmit);

//добавление разметки для картинок, имени, лайки, удаление
function createCard(object) {
  const groupListElement = cardsElement.querySelector('.group__list').cloneNode(true);
  const trashElement = groupListElement.querySelector('.group__trash');
  const imageElement = groupListElement.querySelector('.group__mask');
  const likeElement = groupListElement.querySelector('.group__vector');

  groupListElement.querySelector('.group__picture-name').textContent = object.name;
  imageElement.alt = object.name;
  imageElement.src = object.link;

  likeElement.addEventListener('click', () => likeElement.classList.toggle('group__vector_active'));
  trashElement.addEventListener('click', (evt) => evt.target.closest('.group__list').remove());

  //открытие popup картинки по клику на нее
  imageElement.addEventListener('click', () => {
    popupImageElement.alt = object.name;
    popupImageElement.src = object.link;
    imagePopupCaption.textContent = object.name;
    openPopup(imagePopupElement);
  });
  return groupListElement;
}

//загрузка картинок из массива initialCards при открытии страницы
initialCards.forEach((item) => {
  const card = createCard(item);
  groupListsElement.append(card);
});

//добавление новой картинки вручную
formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objectNameLink = { name: titleInput.value, link: linkInput.value };
  groupListsElement.prepend(createCard(objectNameLink));
  closePopup(cardsPopupElement);
  //очистка строки ввода
  evt.target.reset();
});



