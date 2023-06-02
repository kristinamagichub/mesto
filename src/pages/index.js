import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import Card from "../scripts/components/Card.js";
import PopupWithDeleteForm from "../scripts/components/PopupWithDeleteForm.js";
import Api from "../scripts/components/Api.js";



import {
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
} from "../scripts/utils/constants.js";

import "../pages/index.css"



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '0488cef1-b152-4328-9722-87384ad1db3f',
    'Content-Type': 'application/json'
  }
});



//создание экземпляра класса UserInfo
const userInfo = new UserInfo(configInfo);

//создание экземпляра класса PopupWithImage
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

//создание экземпляра класса PopupWithDeleteForm
const popupDeleteCard = new PopupWithDeleteForm(popupDeleteSelector, ({ card, cardId }) => {
  api.deleteCard(cardId)
    .then(() => {
      card.removeCard()
      popupDeleteCard.close();
    })
    .catch((error => console.error(`Ошибка при удалении карточки ${error}`)))
    .finally(() => popupDeleteCard.setDefaultText())
});
popupDeleteCard.setEventListeners();



//Код создания карточки вынесен в функцию. Функция создает экземпляр класса и возвращает создание карточки card.createCard()
//функция которая создает карточку (new Card) и возвращает ее разметку.
const createNewCard = (element) => {
  const card = new Card(element, selectorTemplate, popupImage.open, popupDeleteCard.open, (likeElement, cardId) => {
    if (likeElement.classList.contains('group__like_active')) {
      api.deleteLike(cardId)
        .then(res => {
          console.log(res)
          card.toggleLikesNumberCounter(res.likes)
        })
        .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
    } else {
      api.addLike(cardId)
        .then(res => {
          console.log(res)
          card.toggleLikesNumberCounter(res.likes)
        })
        .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`))
    }
  });
  return card.createCard();
};



//создание экземпляра класса Section с объектом начальных картинок и функцией которая отвечает за создание и отрисовку данных на странице (отрисовкy каждого отдельного элемента)
const section = new Section((element) => {
  section.addItemAppend(createNewCard(element))
}, groupListsElementSelector);



// экземпляр класса PopupWithForm для формы редактирования профиля, обработка формы submit
const popupProfile = new PopupWithForm(popupProfileSelector, inputsValue => {
  //Данные формы передаются в колбэк как параметр из класса PopupWithForm и можно сразу использовать передаваемые данные
  api.setUserInfo(inputsValue)
    .then(res => {
      userInfo.setUserInfo({ username: res.name, job: res.about, avatar: res.avatar });
      popupProfile.close();
    })
    .catch((error => console.error(`Ошибка при редактировании профиля ${error}`)))
    .finally(() => popupProfile.setDefaultText())
  //userInfo.setUserInfo(inputsValue);
})
popupProfile.setEventListeners();



//экземпляр класса PopupWithForm для формы добавления новой картинки вручную, обработка формы submit
const popupAddCard = new PopupWithForm(popupAddCardSelector, inputsValue => {
  //Данные формы передаются в колбэк как параметр из класса PopupWithForm и можно сразу использовать передаваемые данные
  Promise.all([api.getInfo(), api.addCard(inputsValue)])
    .then(([dataUser, dataCard]) => {
      dataCard.myid = dataUser._id;
      section.addItemPrepend(createNewCard(dataCard))
      popupAddCard.close();
    })
    .catch((error) => console.error(`Ошибка при создании новой карточки ${error}`))
    .finally(() => popupAddCard.setDefaultText())
});
popupAddCard.setEventListeners();



//экземпляр класса PopupWithForm для формы редактирования картинки профиля, обработка формы submit
const popupEditAvatar = new PopupWithForm(popupAvatarSelector, inputsValue => {
  api.setNewAvatar(inputsValue)
    .then(res => {
      userInfo.setUserInfo({ username: res.name, job: res.about, avatar: res.avatar });
      popupEditAvatar.close();
    })
    .catch((error) => console.error(`Ошибка при обновлении аватара ${error}`))
    .finally(() => popupEditAvatar.setDefaultText());
})
popupEditAvatar.setEventListeners();



//создание для каждой проверяемой формы экземпляр класса FormValidator и запуск валидации
Array.from(document.forms).forEach(item => {
  const form = new FormValidator(validationConfig, item)
  const name = item.getAttribute('name');
  formsValidator[name] = form;
  form.enableValidation();
})



//открытие popup редактирования профиля
popupEditOpenButtonElement.addEventListener('click', () => {
  formsValidator.profileData.resetValidation();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  popupProfile.open();
});



//открытие popup для добавления и редактирования картинок
popupAddOpenButtonElement.addEventListener('click', () => {
  formsValidator.addCard.resetValidation();
  popupAddCard.open();
});



//открытие popup редактирования картинки профиля
document.querySelector(".profile__avatar-overlay").addEventListener("click", () => {
  formsValidator.editAvatar.resetValidation();
  popupEditAvatar.open();
})



Promise.all([api.getInfo(), api.getCards()])//получает на вход масив из асихронных методов, он выполняет их параллельно
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(element => element.myid = dataUser._id)
    userInfo.setUserInfo({ username: dataUser.name, job: dataUser.about, avatar: dataUser.avatar })
    section.renderItems(dataCard);
  })
  .catch((error) => console.error(`Ошибка при создании начальных данных страницы ${error}`))
