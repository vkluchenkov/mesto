export class Section {
  constructor({ items, renderer, userId }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._userId = userId;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item, this._userId);
      this.addItem(element);
    });
  }
}
