import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import Card from "../scripts/components/Card.js";
import {
  initialCards,
  popupEditOpenButtonElement,
  popupAddOpenButtonElement,
  selectorTemplate,
  popupProfileSelector,
  popupAddCardSelector,
  popupImageSelector,
  groupListsElementSelector,
  configInfo,
  validationConfig,
  profileForm,
  cardForm
} from "../scripts/utils/constants.js";

import "../pages/index.css"

//создание экземпляра класса UserInfo
const userInfo = new UserInfo(configInfo);


//создание экземпляра класса PopupWithImage
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();


//создание экземпляра класса Section с объектом начальных картинок
const section = new Section({
  //Свойство items — массив картинок, которые нужно добавить на страницу при инициализации класса
  items: initialCards,
  //Свойство renderer — функция, которая отвечает за создание и отрисовку данных на странице (отрисовкy каждого отдельного элемента)
  renderer: (element) => {
    section.addItem(createNewCard(element));
  },
}, groupListsElementSelector);


//Код создания карточки вынесен в функцию. Функция создает экземпляр класса и возвращает создание карточки card.createCard()
const createNewCard = (element) => {
  const card = new Card(element, selectorTemplate, popupImage.open);
  return card.createCard();
};
//добавление метода и вызов его после создания экземпляра класса
section.renderItems();


// экземпляр класса PopupWithForm для формы редактирования профиля, обработка формы submit
const popupProfile = new PopupWithForm(popupProfileSelector, inputsValue => {
  evt.preventDefault();
  //Данные формы передаются в колбэк как параметр из класса PopupWithForm и можно сразу использовать передаваемые данные
  userInfo.setUserInfo(inputsValue());
  popupProfile.close();
})
popupProfile.setEventListeners();


//экземпляр класса PopupWithForm для формы добавления новой картинки вручную, обработка формы submit
const popupAddCard = new PopupWithForm(popupAddCardSelector, inputsValue => {
  evt.preventDefault();
  //Данные формы передаются в колбэк как параметр из класса PopupWithForm и можно сразу использовать передаваемые данные
  section.addItem(section.renderer(inputsValue()));
  popupAddCard.close();
})
popupAddCard.setEventListeners();


//создание для каждой проверяемой формы экземпляр класса FormValidator и запуск валидации
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, cardForm);
cardFormValidator.enableValidation();


//открытие popup редактирования профиля
popupEditOpenButtonElement.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  popupProfile.open();
});

//открытие popup для добавления и редактирования картинок
popupAddOpenButtonElement.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupAddCard.open();
});
