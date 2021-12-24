import icons from 'url:../../img/icons.svg';
import View from './View';

class PreviewView extends View {
  _generateMarkup() {
    return this._data
      .map(result => this._generatePreviewMarkup(result))
      .join('');
  }

  _generatePreviewMarkup(result) {
    const currentRecipeId = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          result.id === currentRecipeId ? 'preview__link--active' : ''
        }" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.imageUrl}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">
              ${result.title}
            </h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated ${result.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          </div>
        </a>
      </li>
    `;
  }
}

export default PreviewView;
