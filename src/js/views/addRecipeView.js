import View from './View';

class AddRecipeView extends View {
  _windowElement = document.querySelector('.add-recipe-window');
  _overlayElement = document.querySelector('.overlay');
  _openBtn = document.querySelector('.nav__btn--add-recipe');
  _closeBtn = document.querySelector('.btn--close-modal');

  constructor() {
    super(document.querySelector('.upload'));
    this._addShowWindowListener();
    this._addHideWindowListener();
  }

  _addShowWindowListener() {
    this._openBtn.addEventListener('click', e => {
      this._overlayElement.classList.remove('hidden');
      this._windowElement.classList.remove('hidden');
    });
  }

  _addHideWindowListener() {
    this._closeBtn.addEventListener('click', e => {
      this._overlayElement.classList.add('hidden');
      this._windowElement.classList.add('hidden');
    });
  }

  toggleWindow() {
    this._overlayElement.classList.toggle('hidden');
    this._windowElement.classList.toggle('hidden');
  }

  addUploadListener(listener) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      listener(Object.fromEntries(data));
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
