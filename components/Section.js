class Section {
  constructor({ items, renderer }, containerSelector) {
    // According to the task description, items and renderer should be passed to the constructor.
    // But students may pass items array not to the constructor but to the renderItems method.
    // Both solutions are acceptable
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
