//класс отвечает за отрисовку элементов на странице
export default
  class Section {
  constructor({ items, renderer }, containerSelector) {
    //2й параметр — селектор контейнера, в который добавляются созданные элементы
    this._container = document.querySelector(containerSelector);
    this._initialCard = items;
    this.renderer = renderer;
    //публичный метод, который отвечает за отрисовку всех элементов. (публичное свойство для возможности использования его в колбеке формы для сабмита)
  }

  //создание карточек из массива
  addCardFromArray() {
    this._initialCard.forEach(element => {
      this.addItem(this.renderer(element))
    })
  }
  //публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер (ф добавления карточки в нужный контейнер)
  addItem(elementDom) {
    this._container.prepend(elementDom);
  }
}

