import PreviewView from './PreviewView';

class BookmarksView extends PreviewView {
  _errorMessages = {
    noBookmarks: 'No bookmarks yet. Find a nice recipe and bookmark it ;)',
  };

  constructor() {
    super(document.querySelector('.bookmarks__list'));
  }

  render(data) {
    if (data.length === 0) {
      this.renderErrorMessage(this._errorMessages.noBookmarks);
      return;
    }

    super.render(data);
  }
}

export default new BookmarksView();
