//класс отвечает за отрисовку элементов на странице
export default
  class Section {
  constructor(renderer, containerSelector) {  //2й параметр — селектор контейнера, в который добавляются созданные элементы
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;   // метод, который отвечает за отрисовку всех элементов. (приватное свойство для возможности использования его в колбеке формы для сабмита)
  }

  //содержит приватный метод, который отвечает за отрисовку всех элементов
  //отрисовка каждого отдельного элемента осуществляется функцией renderer
  //создание карточек из массива
  renderItems(dataCard) {
    dataCard.forEach(element => {
      this._renderer(element);
    })
  }

  //публичныe методы addItem, которые принимают DOM-элемент и добавляют его в контейнер (ф добавлении карточки в нужный контейнер)
  addItemPrepend(elementDom) {
    this._container.prepend(elementDom);
  }
  addItemAppend(elementDom) {
    this._container.append(elementDom);
  }
}

