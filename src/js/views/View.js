import icons from 'url:../../img/icons.svg';

export default class View {
  _parentElement;
  _data;
  _genericErrorMessage = 'An error occurred';

  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // ! Not Real World (Use Frameworks like React instead)
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();
    const virtualDOM = document
      .createRange()
      .createContextualFragment(newMarkup);
    const newElements = Array.from(virtualDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];
      this._updateChangedText(newElement, currentElement);
      this._updateChangedAttributes(newElement, currentElement);
    });
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(error) {
    this.renderErrorMessage(error.message);
  }

  renderErrorMessage(errorMessage = this._genericErrorMessage) {
    const markup = this._generateErrorMarkup(errorMessage);
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message) {
    const markup = this._generateMessageMarkup(message);
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _updateChangedText(newElement, currentElement) {
    if (
      !newElement.isEqualNode(currentElement) &&
      newElement.firstChild?.nodeValue.trim() !== ''
    ) {
      currentElement.textContent = newElement.textContent;
    }
  }

  _updateChangedAttributes(newElement, currentElement) {
    if (!newElement.isEqualNode(currentElement)) {
      Array.from(newElement.attributes).forEach(attribute =>
        currentElement.setAttribute(attribute.name, attribute.value)
      );
    }
  }

  _generateMarkup() {
    return `
      <div>
        ${this._data}
      </div>`;
  }

  _generateErrorMarkup(errorMsg) {
    return `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMsg}</p>
      </div>`;
  }

  _generateMessageMarkup(msg) {
    return `
      <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>`;
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
