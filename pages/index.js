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


//создание экземпляра класса UserInfo
const userInfo = new UserInfo(configInfo);


//создание экземпляра класса PopupWithImage
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();


//создание экземпляра класса Section с объектом начальных картинок
const section = new Section({
  items: initialCards,
  //Свойство items — массив картинок, которые нужно добавить на страницу при инициализации класса
  renderer: (element) => {
    const card = new Card(element, selectorTemplate, popupImage.open);
    return card.createCard();
    //Свойство renderer — функция, которая отвечает за создание и отрисовку данных на странице (отрисовкy каждого отдельного элемента)
  }
}, groupListsElementSelector);
//добавление картинок из массива при загрузке страницы
section.addCardFromArray();


// экземпляр класса PopupWithForm для формы редактирования профиля, обработка формы submit
const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputsValue());
  popupProfile.close();
})
popupProfile.setEventListeners();


//экземпляр класса PopupWithForm для формы добавления новой картинки вручную, обработка формы submit
const popupAddCard = new PopupWithForm(popupAddCardSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputsValue()));
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






//ф-колбэк, через которую класс section получает разметку и вставляет её в контейнер.

