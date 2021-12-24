import { replaceSnakeCaseToCamelCaseKeys } from '../utils/dataParser';
import { fetchJson, sendJson } from '../utils/fetchUtils';

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

async function getRecipe(id) {
  const data = await fetchJson(`${API_URL}recipes/${id}?key=${API_KEY}`);
  const { recipe } = data.data;
  return replaceSnakeCaseToCamelCaseKeys(recipe);
}

async function searchRecipes(query) {
  const data = await fetchJson(`${API_URL}recipes?search=${query}&key=${API_KEY}`);
  const { recipes } = data.data;
  return recipes.map(recipe => replaceSnakeCaseToCamelCaseKeys(recipe));
}

async function uploadRecipe(newRecipe) {
  const data = await sendJson(`${API_URL}recipes/?key=${API_KEY}`, newRecipe);
  const { recipe } = data.data;
  return replaceSnakeCaseToCamelCaseKeys(recipe);
}

export default {
  getRecipe,
  searchRecipes,
  uploadRecipe,
};
