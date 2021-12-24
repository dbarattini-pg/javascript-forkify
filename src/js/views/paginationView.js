import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  constructor() {
    super(document.querySelector('.pagination'));
  }

  addClickEventListener(listener) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      listener(+btn.dataset.goto);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (currPage === 1 && numPages > 1) {
      return this._generateNextPageMarkup(2);
    }

    if (currPage === numPages && numPages > 1) {
      return this._generatePrevPageMarkup(currPage - 1);
    }

    if (currPage < numPages) {
      return [
        this._generatePrevPageMarkup(currPage - 1),
        this._generateNextPageMarkup(currPage + 1),
      ].join('');
    }
    return '';
  }

  _generatePrevPageMarkup(page) {
    return `
        <button data-goto=${page} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page}</span>
        </button>`;
  }

  _generateNextPageMarkup(page) {
    return `
        <button data-goto=${page} class="btn--inline pagination__btn--next">
            <span>Page ${page}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
  }
}

export default new PaginationView();
