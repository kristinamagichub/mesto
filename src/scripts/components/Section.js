//класс отвечает за отрисовку элементов на странице
export default
  class Section {
  constructor({ items, renderer }, containerSelector) {
    //2й параметр — селектор контейнера, в который добавляются созданные элементы
    this._container = document.querySelector(containerSelector);
    this._initialCard = items;
    this._renderer = renderer;   // метод, который отвечает за отрисовку всех элементов. (приватное свойство для возможности использования его в колбеке формы для сабмита)
  }

  //содержит приватный метод, который отвечает за отрисовку всех элементов
  //отрисовка каждого отдельного элемента осуществляется функцией renderer
  //создание карточек из массива
  renderItems() {
    this._initialCard.forEach(element => {
      //
      this._renderer(element);
    })
  }

  //публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер (ф добавления карточки в нужный контейнер)
  addItem(elementDom) {
    this._container.prepend(elementDom);
  }
}

