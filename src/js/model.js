import fetchClient from './clients/fetchClient';

const RESULTS_PER_PAGE = process.env.RESULTS_PER_PAGE;

// export live linked to import
export const state = {
  recipe: undefined,
  search: {
    query: undefined,
    results: undefined,
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export async function loadRecipe(id) {
  state.recipe = await fetchClient.getRecipe(id);

  state.recipe.bookmarked = state.bookmarks.some(
    bookmarked => bookmarked.id === id
  );
}

export async function loadSearchResults(query) {
  state.search.query = query;
  state.search.results = await fetchClient.searchRecipes(query);
}

export function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;
  const startIndex = (page - 1) * state.search.resultsPerPage;
  const endIndex = page * state.search.resultsPerPage;
  return state.search.results.slice(startIndex, endIndex);
}

export function updateServings(newServings) {
  state.recipe.ingredients = state.recipe.ingredients.map(ingredient => ({
    ...ingredient,
    quantity: (ingredient.quantity * newServings) / state.recipe.servings,
  }));
  state.recipe.servings = newServings;
}

export function toggleBookmark(recipe) {
  if (recipe.bookmarked) {
    removeBookmark(recipe);
  } else {
    addBookmark(recipe);
  }
}

export function addBookmark(recipe) {
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  const index = state.bookmarks.findIndex(
    bookmarked => bookmarked.id === recipe.id
  );
  if (index === -1) {
    state.bookmarks.push(state.recipe);
  }

  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export function removeBookmark(recipe) {
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  const index = state.bookmarks.findIndex(
    bookmarked => bookmarked.id === recipe.id
  );
  if (index >= 0) {
    state.bookmarks.splice(index, 1);
  }

  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export async function uploadRecipe(recipe) {
  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => key.startsWith('ingredient') && value !== '')
    .map(([_, value]) => {
      const ingredient = value.split(',').map(el => el.trim());

      if (ingredient.length !== 3) {
        throw new Error(
          'Wrong ingredient format! Please use the correct format :)'
        );
      }
      const [quantity, unit, description] = ingredient;
      return { quantity: quantity ? +quantity : null, unit, description };
    });

  const newRecipe = {
    title: recipe.title,
    source_url: recipe.sourceUrl,
    image_url: recipe.image,
    publisher: recipe.publisher,
    cooking_time: +recipe.cookingTime,
    servings: +recipe.servings,
    ingredients: ingredients,
  };

  state.recipe = await fetchClient.uploadRecipe(newRecipe);
  addBookmark(state.recipe);
}

function init() {
  const storedBookmarks = localStorage.getItem('bookmarks');
  if (storedBookmarks) {
    state.bookmarks = JSON.parse(storedBookmarks);
  }
}

init();
