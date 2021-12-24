import View from './View';

class SearchView extends View {
  _searchField = this._parentElement.querySelector('.search__field');

  constructor() {
    super(document.querySelector('.search'));
  }

  getQuery() {
    const query = this._searchField.value;
    this._clearInput();
    return query;
  }

  addSearchEventListener(listener) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      listener(e);
    });
  }

  _clearInput() {
    this._searchField.value = '';
  }
}

export default new SearchView();
