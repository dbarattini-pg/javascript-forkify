import initializer from './utils/initializer'; // Transpile + Polyfill
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

const MODAL_CLOSE_MS = process.env.MODAL_CLOSE_MS;

async function controlRecipes() {
  const recipeId = window.location.hash.slice(1);
  if (!recipeId) return;

  recipeView.renderSpinner();
  try {
    await model.loadRecipe(recipeId);
    if (model.state.search.results) {
      resultsView.update(model.getSearchResultsPage());
    }
    bookmarksView.render(model.state.bookmarks);
    recipeView.render(model.state.recipe);
  } catch (e) {
    recipeView.renderError(e);
  }
}

async function controlSearchResults() {
  const query = searchView.getQuery();
  if (!query) return;

  resultsView.renderSpinner();

  try {
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
  } catch (e) {
    resultsView.renderError(e);
  }
}

function controlPagination(goto) {
  resultsView.render(model.getSearchResultsPage(goto));
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}

function controlBookmarkToogle() {
  model.toggleBookmark(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
}

async function controlAddRecipe(recipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(recipe);
    recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    addRecipeView.renderMessage('Recipe was succesfully uploaded :)');

    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_MS);
  } catch (e) {
    addRecipeView.renderError(e);
  }
}

function init() {
  // pub-sub pattern
  recipeView.addRenderEventListener(controlRecipes);
  searchView.addSearchEventListener(controlSearchResults);
  paginationView.addClickEventListener(controlPagination);
  recipeView.addServingsEventListener(controlServings);
  recipeView.addBookmarkToogleListener(controlBookmarkToogle);
  addRecipeView.addUploadListener(controlAddRecipe);
}

init();
