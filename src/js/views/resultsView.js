import icons from 'url:../../img/icons.svg';
import PreviewView from './PreviewView';

class ResultsView extends PreviewView {
  _errorMessages = {
    notFound: 'No recipes found for your query! Please try again ;)',
  };

  constructor() {
    super(document.querySelector('.results'));
  }

  render(data) {
    if (data.length === 0) {
      this.renderErrorMessage(this._errorMessages.notFound);
      return;
    }

    super.render(data);
  }
}

export default new ResultsView();
